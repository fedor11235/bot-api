import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptService {
  constructor(private prisma: PrismaService) {}
  async createOpt(idUser: any, chanel: any): Promise<any> {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id: idUser
    //   }
    // });
    const user = await this.prisma.user.update({
      where: {
        id: idUser
      },
      data: {
        opt_chanel_create: chanel
      }
    });
    const chanel_bd = await this.prisma.userChanel.findFirst({
      where: { idChanel: chanel },
    });

    const opt_bd = await this.prisma.opt.findUnique({
      where: { chanel: chanel },
    });
    
    if(opt_bd) {
      await this.prisma.opt.delete({
        where: { chanel: chanel },
      });
    }

    const opt = await this.prisma.opt.create({
      data: {
        idUser: user.id,
        title:  chanel_bd.title,
        chanel: chanel,
        category: chanel_bd.category
      },
    });
    return 'ok';
  }
  async getOpt(idUser: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: idUser },
      include: {
        opts: true,
      },
    });
    return user.opts[0];
  }

  async getOptCategories(idUser:any, category: any, filter: any): Promise<any> {
    let opts
    
    if(filter && filter !== 'none') {
      const filterPrepar = this.parseFilter(filter)
      const user = await this.prisma.user.findUnique({
        where: {
          id: idUser
        }
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          filter_opt: filterPrepar,
        },
      });
      const filterData = {[filterPrepar]: 'desc'}

      if (category === 'all') {
        opts = await this.prisma.opt.findMany({
          orderBy: [ filterData ],
        });
        return opts
      } else {
        opts = await this.prisma.opt.findMany({
          where: {
            category: category,
          },
          orderBy: [ filterData ],
        });
        return opts
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    });

    if(user.filter_opt === "none") {
      if (category === 'all') {
        opts = await this.prisma.opt.findMany();
        return opts
      } else {
        opts = await this.prisma.opt.findMany({
          where: {
            category: category,
          },
        });
        return opts
      }
    }

    if (category === 'all') {
      opts = await this.prisma.catalog.findMany({
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    } else {
      opts = await this.prisma.catalog.findMany({
        where: {
          category: category,
        },
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    }
    return opts;
  }

  async setOpt(idUser: any, data: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: idUser },
      // include: {
      //   opts: true,
      // },
    });

    const opt = await this.prisma.opt.update({
      where: { chanel: user.opt_chanel_create},
      data: data,
    });

    return opt;
  }

  async getStatOpt(chanel: any): Promise<any> {
    const opt = await this.prisma.opt.findFirst({
      where: { chanel: chanel }
    });

    const user = await this.prisma.user.findFirst({
      where: { id: opt.idUser }
    });

    const result = {...opt , user_id: user.id}
    return result;
  }

  async setOptInto(idUser: any, idOpt: any, isDel: any, body: any): Promise<any> {
 
    let optParent = await this.prisma.opt.findUnique({
      where: {
        chanel: idOpt,
      }
    });
    let optOld = await this.prisma.optInto.findFirst({
      where: {
        chanel: idOpt,
        idUser: idUser
      }
    });
    
    // if(optOld && isDel === 'enabled') {

    //   if(optParent?.booking_date && optOld?.booking_date) {
    //     const dateAllowed = optParent.booking_date + '_' + optOld.booking_date
    //     optParent = await this.prisma.opt.update({
    //       where: {
    //         chanel: optParent.chanel,
    //       },
    //       data: {
    //         booking_date: dateAllowed
    //       }
    //     });
    //   }
    //   // await this.prisma.optInto.delete({
    //   //   where: {
    //   //     id: optOld.id,
    //   //   }
    //   // });
    //   // optOld = null
    // }
    if(optOld) {
      const opt = await this.prisma.optInto.update({
        where: {
          id: optOld.id,
        },
        data : body
      });

      const dataList = opt.allowed_dates.split('_')
      const bookingDate = opt.booking_date.split('_')

      const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem))

      const dataListFilterJoin = dataListFilter.join('_')


      await this.prisma.opt.update({
        where: {
          chanel: optParent.chanel,
        },
        data: {
          booking_date: dataListFilterJoin
        }
      });
      return opt
    } else {
      const opt = await this.prisma.optInto.create({
        data : {
          ...body,
          chanel: idOpt,
          idUser: idUser,
          allowed_dates: optParent.booking_date
        }
      });

      const dataList = opt.allowed_dates.split('_')
      const bookingDate = opt.booking_date.split('_')

      const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem))

      const dataListFilterJoin = dataListFilter.join('_')


      await this.prisma.opt.update({
        where: {
          chanel: optParent.chanel,
        },
        data: {
          booking_date: dataListFilterJoin
        }
      });
      return opt
    }
  }

  async setRecommendationInto(idUser: any, idOpt: any, isDelete: any, body: any): Promise<any> {
    console.log("Вхождение в рекомендацию")
    console.log(idOpt)

    let optParent = await this.prisma.recommendation.findUnique({
      where: {
        username: idOpt,
      }
    });

    let optOld = await this.prisma.recommendationInto.findFirst({
      where: {
        chanel: idOpt,
        idUser: idUser
      },
    });

    // if(optOld && isDelete === 'enabled') {

    //   if(optParent?.data_list && optOld?.booking_date) {
    //     const dateAllowed = optParent.data_list + '_' + optOld.booking_date
    //     optParent = await this.prisma.recommendation.update({
    //       where: {
    //         id: optParent.id,
    //       },
    //       data: {
    //         data_list: dateAllowed
    //       }
    //     });
    //   }
    //   // await this.prisma.recommendationInto.delete({
    //   //   where: {
    //   //     id: optOld.id,
    //   //   }
    //   // });
    //   // optOld = null
    // }
    if(optOld) {
      
      const opt = await this.prisma.recommendationInto.update({
        where: {
          id: optOld.id,
        },
        data : body
      });



      const dataList = opt.allowed_dates.split('_')
      const bookingDate = opt.booking_date.split('_')

      const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem))

      const dataListFilterJoin = dataListFilter.join('_')


      await this.prisma.recommendation.update({
        where: {
          id: optParent.id,
        },
        data: {
          data_list: dataListFilterJoin
        }
      });

      return opt
    } else {
      const opt = await this.prisma.recommendationInto.create({
        data : {
          ...body,
          chanel: idOpt,
          idUser: idUser,
          allowed_dates: optParent?.data_list,
        }
      });
      const dataList = opt.allowed_dates.split('_')
      const bookingDate = opt.booking_date.split('_')

      const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem))

      const dataListFilterJoin = dataListFilter.join('_')


      await this.prisma.recommendation.update({
        where: {
          id: optParent.id,
        },
        data: {
          data_list: dataListFilterJoin
        }
      });
      return opt
    }
  }


  async getOptInto(idOpt: any): Promise<any> {
    const opt = await this.prisma.optInto.findFirst({
      where: {
        chanel: idOpt,
      },
    });

    return opt;
  }

  //Получить все опты
  async getAllOpts(): Promise<any> {
    const opts = await this.prisma.opt.findMany();
    return opts;
  }

  async optGetRequisites(channel: any): Promise<any> {
    const opt = await this.prisma.opt.findUnique({
      where: {
        chanel: channel
      }
    });
    return opt.requisites;
  }

  async optSetCheck(idUser: any, chennel: any, check: any, checkPath: any): Promise<any> {
    const opt = await this.prisma.optInto.findFirst({
      where: {
        idUser: idUser,
        chanel: chennel
      }
    })
    await this.prisma.optInto.update({
      where: {
        id: opt.id,
      },
      data: {
        check: check, 
        path_check: checkPath
      }
    })
    return 'ok'
  }

  async optPostDelete(idUser: any, chennel: any, type: any, postNumber: any): Promise<any> {
    if(type === 'recommendation') {
      const recommendationInto = await this.prisma.recommendationInto.findFirst({
        where: {
          idUser: idUser,
          chanel: chennel
        }
      })
      const creatives = recommendationInto.creatives
      const creativesArray =  creatives.split('///')
      const creativesNewArray = creativesArray.splice(postNumber, 1)
      let creativesNew
      if(creativesNewArray.length > 1) {
        creativesNew = '///' + creativesNewArray.join("///")
      } else {
        creativesNew = ''
      }
      await this.prisma.optInto.update({
        where: {
          id: recommendationInto.id
        },
        data: {
          creatives: creativesNew
        }
      })
    }

    if(type === 'opt') {
      const optInto = await this.prisma.optInto.findFirst({
        where: {
          idUser: idUser,
          chanel: chennel
        }
      })
      const creatives = optInto.creatives
      const creativesArray =  creatives.split('///')
      const creativesNewArray = creativesArray.splice(postNumber, 1)
      let creativesNew
      if(creativesNewArray.length > 1) {
        creativesNew = '///' + creativesNewArray.join("///")
      } else {
        creativesNew = ''
      }
      await this.prisma.optInto.update({
        where: {
          id: optInto.id
        },
        data: {
          creatives: creativesNew
        }
      })
    }

    return 'ok'
  }

  async saveEditOptTemp(idUser:any, chanelEdit: any, postId: any, optType: any): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: idUser
      },
      data: {
        chanel_edit_temp: chanelEdit,
        post_id_temp: postId,
        opt_type_temp: optType,
      }
    })
    return 'ok'
  }

  async saveEditOptTempCheck(idUser:any, chanelEdit: any, optType: any): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: idUser
      },
      data: {
        chanel_edit_temp: chanelEdit, 
        opt_type_temp: optType
      }
    })
    return 'ok'
  }

  async postEditOptTemp(idUser:any, post: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    })
    if (user.opt_type_temp === 'recommendation') {
      const recommendation = await this.prisma.recommendationInto.findFirst({
        where: {
          idUser: idUser,
          chanel: user.chanel_edit_temp
        }
      })
      const postArray = recommendation.creatives.split('///')
      postArray[Number(user.post_id_temp)] = post.post
      const creatives = postArray.join('///');
      await this.prisma.recommendationInto.update({
        where: {
          id: recommendation.id
        },
        data: {
          creatives: creatives
        }
      })
    } else if (user.opt_type_temp === 'opt') {
      const opt = await this.prisma.optInto.findFirst({
        where: {
          idUser: idUser,
          chanel: user.chanel_edit_temp
        }
      })
      const postArray = opt.creatives.split('///')
      postArray[Number(user.post_id_temp)] = post.post
      const creatives = postArray.join('///');
      await this.prisma.optInto.update({
        where: {
          id: opt.id
        },
        data: {
          creatives: creatives
        }
      })
    }

    return 'ok'
  }

  async checkEditOptTemp(idUser:any, check: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    })
    if (user.opt_type_temp === 'recommendation') {
      const recommendation = await this.prisma.recommendationInto.findFirst({
        where: {
          idUser: idUser,
          chanel: user.chanel_edit_temp
        }
      })
      await this.prisma.recommendationInto.update({
        where: {
          id: recommendation.id
        },
        data: {
          check: check
        }
      })
    } else if (user.opt_type_temp === 'opt') {
      const opt = await this.prisma.optInto.findFirst({
        where: {
          idUser: idUser,
          chanel: user.chanel_edit_temp
        }
      })
      await this.prisma.recommendationInto.update({
        where: {
          id: opt.id
        },
        data: {
          check: check
        }
      })
    }
    return 'ok'
  }

  async addNewPost(idUser:any, data: any): Promise<any> {
    let result = null
    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    })
    if (user.opt_type_temp === 'recommendation') {
      const recommendation = await this.prisma.recommendationInto.findFirst({
        where: {
          idUser: idUser,
          chanel: user.chanel_edit_temp
        }
      })
      result = await this.prisma.recommendationInto.update({
        where: {
          id: recommendation.id
        },
        data: {
          creatives: recommendation.creatives + '///' + data.creatives
        }
      })
    } else if (user.opt_type_temp === 'opt') {
      const opt = await this.prisma.optInto.findFirst({
        where: {
          idUser: idUser,
          chanel: user.chanel_edit_temp
        }
      })
      result = await this.prisma.recommendationInto.update({
        where: {
          id: opt.id
        },
        data: {
          creatives: opt.creatives + '///' + data.creatives
        }
      })
    }
    return result
  }

  parseFilter(name: any) {
    if(name === 'repost') {
      return 'forwards_count'
    } else if(name === 'numberSubscribers') {
      return 'participants_count'
    } else if(name === 'coveragePub') {
      return 'avg_post_reach'
    } else if(name === 'coverageDay') {
      return 'daily_reach'
    } else if(name === 'indexSay') {
      return 'ci_index'
    }
  }
}
