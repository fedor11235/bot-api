"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OptService = class OptService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOpt(idUser, chanel) {
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
        if (opt_bd) {
            await this.prisma.opt.delete({
                where: { chanel: chanel },
            });
        }
        const opt = await this.prisma.opt.create({
            data: {
                idUser: user.id,
                title: chanel_bd.title,
                chanel: chanel,
                category: chanel_bd.category
            },
        });
        return 'ok';
    }
    async getOpt(idUser) {
        const user = await this.prisma.user.findUnique({
            where: { id: idUser },
            include: {
                opts: true,
            },
        });
        return user.opts[0];
    }
    async getOptCategories(idUser, category, filter) {
        let opts;
        if (filter && filter !== 'none') {
            const filterPrepar = this.parseFilter(filter);
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
            const filterData = { [filterPrepar]: 'desc' };
            if (category === 'all') {
                opts = await this.prisma.opt.findMany({
                    orderBy: [filterData],
                });
                return opts;
            }
            else {
                opts = await this.prisma.opt.findMany({
                    where: {
                        category: category,
                    },
                    orderBy: [filterData],
                });
                return opts;
            }
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        if (user.filter_opt === "none") {
            if (category === 'all') {
                opts = await this.prisma.opt.findMany();
                return opts;
            }
            else {
                opts = await this.prisma.opt.findMany({
                    where: {
                        category: category,
                    },
                });
                return opts;
            }
        }
        if (category === 'all') {
            opts = await this.prisma.catalog.findMany({
                orderBy: [{ [user.filter]: 'desc' }]
            });
        }
        else {
            opts = await this.prisma.catalog.findMany({
                where: {
                    category: category,
                },
                orderBy: [{ [user.filter]: 'desc' }]
            });
        }
        return opts;
    }
    async setOpt(idUser, data) {
        const user = await this.prisma.user.findUnique({
            where: { id: idUser },
        });
        let opt = await this.prisma.opt.update({
            where: { chanel: user.opt_chanel_create },
            data: data,
        });
        if ("requisites" in data) {
            opt = await this.prisma.opt.update({
                where: { chanel: user.opt_chanel_create },
                data: {
                    allowed_dates: opt.booking_date
                },
            });
        }
        return opt;
    }
    async getStatOpt(chanel) {
        const opt = await this.prisma.opt.findFirst({
            where: { chanel: chanel }
        });
        const user = await this.prisma.user.findFirst({
            where: { id: opt.idUser }
        });
        const result = { ...opt, user_id: user.id };
        return result;
    }
    async setOptInto(idUser, idOpt, isDel, body) {
        let optParent = await this.prisma.opt.findUnique({
            where: {
                chanel: idOpt,
            }
        });
        let optOld = await this.prisma.optInto.findFirst({
            where: {
                chanel: idOpt,
                idUser: idUser
            },
        });
        if (optOld) {
            let allowed_dates = '';
            if ("allowed_dates" in body) {
                allowed_dates = body.allowed_dates;
            }
            delete body.allowed_dates;
            const optInto = await this.prisma.optInto.update({
                where: {
                    id: optOld.id,
                },
                data: body
            });
            let dataListFilterJoin = optParent.allowed_dates;
            if ("booking_date" in body) {
                const dataList = optParent.allowed_dates.split('_');
                const bookingDate = optInto.booking_date.split('_');
                const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem));
                dataListFilterJoin = dataListFilter.join('_');
                if (allowed_dates) {
                    if (dataListFilterJoin) {
                        dataListFilterJoin += '_' + allowed_dates;
                    }
                    else {
                        dataListFilterJoin = allowed_dates;
                    }
                }
            }
            const opt = await this.prisma.opt.update({
                where: {
                    chanel: optParent.chanel,
                },
                data: {
                    allowed_dates: dataListFilterJoin
                }
            });
            return { ...optInto, allowed_dates: opt.allowed_dates };
        }
        else {
            const optInto = await this.prisma.optInto.create({
                data: {
                    ...body,
                    chanel: idOpt,
                    idUser: idUser,
                }
            });
            const opt = await this.prisma.opt.findUnique({
                where: {
                    chanel: optParent.chanel,
                }
            });
            return { ...optInto, allowed_dates: opt.allowed_dates };
        }
    }
    async setRecommendationInto(idUser, idOpt, isDelete, body) {
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
        if (optOld) {
            let allowed_dates = '';
            if ("allowed_dates" in body) {
                allowed_dates = body.allowed_dates;
            }
            delete body.allowed_dates;
            const recommendationInto = await this.prisma.recommendationInto.update({
                where: {
                    id: optOld.id,
                },
                data: body
            });
            let dataListFilterJoin = optParent.allowed_dates;
            if ("booking_date" in body) {
                const dataList = optParent.allowed_dates.split('_');
                const bookingDate = recommendationInto.booking_date.split('_');
                const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem));
                dataListFilterJoin = dataListFilter.join('_');
                if (allowed_dates) {
                    if (dataListFilterJoin) {
                        dataListFilterJoin += '_' + allowed_dates;
                    }
                    else {
                        dataListFilterJoin = allowed_dates;
                    }
                }
                console.log('пришло повторение ', allowed_dates);
                console.log('разрешенные даты для записи ', dataListFilterJoin);
            }
            const recommendation = await this.prisma.recommendation.update({
                where: {
                    id: optParent.id,
                },
                data: {
                    allowed_dates: dataListFilterJoin
                }
            });
            return { ...recommendationInto, allowed_dates: recommendation.allowed_dates };
        }
        else {
            const recommendationInto = await this.prisma.recommendationInto.create({
                data: {
                    ...body,
                    chanel: idOpt,
                    idUser: idUser,
                }
            });
            const recommendation = await this.prisma.recommendation.findUnique({
                where: {
                    id: optParent.id,
                }
            });
            return { ...recommendationInto, allowed_dates: recommendation.allowed_dates };
        }
    }
    async optDelete(chanel) {
        const opt = await this.prisma.opt.delete({
            where: {
                chanel: chanel,
            },
        });
        return opt;
    }
    async getOptInto(idOpt) {
        const opt = await this.prisma.optInto.findFirst({
            where: {
                chanel: idOpt,
            },
        });
        return opt;
    }
    async getAllOpts() {
        const opts = await this.prisma.opt.findMany();
        return opts;
    }
    async optGetRequisites(channel) {
        const opt = await this.prisma.opt.findUnique({
            where: {
                chanel: channel
            }
        });
        return opt.requisites;
    }
    async optSetCheck(idUser, chennel, check, checkPath) {
        const opt = await this.prisma.optInto.findFirst({
            where: {
                idUser: idUser,
                chanel: chennel
            }
        });
        await this.prisma.optInto.update({
            where: {
                id: opt.id,
            },
            data: {
                check: check,
                path_check: checkPath
            }
        });
        return 'ok';
    }
    async optPostDelete(idUser, chennel, type, postNumber) {
        if (type === 'recommendation') {
            const recommendationInto = await this.prisma.recommendationInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: chennel
                }
            });
            const creatives = recommendationInto.creatives;
            const creativesArray = creatives.split('///');
            creativesArray.shift();
            creativesArray.splice(Number(postNumber) - 1, 1);
            let creativesNew = '';
            if (creativesArray.length > 0) {
                creativesNew = '///' + creativesArray.join("///");
            }
            await this.prisma.recommendationInto.update({
                where: {
                    id: recommendationInto.id
                },
                data: {
                    creatives: creativesNew
                }
            });
        }
        if (type === 'opt') {
            const optInto = await this.prisma.optInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: chennel
                }
            });
            const creatives = optInto.creatives;
            const creativesArray = creatives.split('///');
            creativesArray.shift();
            creativesArray.splice(Number(postNumber) - 1, 1);
            let creativesNew = '';
            if (creativesArray.length > 0) {
                creativesNew = '///' + creativesArray.join("///");
            }
            await this.prisma.optInto.update({
                where: {
                    id: optInto.id
                },
                data: {
                    creatives: creativesNew
                }
            });
        }
        return 'ok';
    }
    async saveEditOptTemp(idUser, chanelEdit, postId, optType) {
        await this.prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                chanel_edit_temp: chanelEdit,
                post_id_temp: postId,
                opt_type_temp: optType,
            }
        });
        return 'ok';
    }
    async saveEditOptTempCheck(idUser, chanelEdit, optType) {
        await this.prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                chanel_edit_temp: chanelEdit,
                opt_type_temp: optType
            }
        });
        return 'ok';
    }
    async postEditOptTemp(idUser, post) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        if (user.opt_type_temp === 'recommendation') {
            const recommendation = await this.prisma.recommendationInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: user.chanel_edit_temp
                }
            });
            const postArray = recommendation.creatives.split('///');
            postArray[Number(user.post_id_temp)] = post.post;
            const creatives = postArray.join('///');
            await this.prisma.recommendationInto.update({
                where: {
                    id: recommendation.id
                },
                data: {
                    creatives: creatives
                }
            });
        }
        else if (user.opt_type_temp === 'opt') {
            const opt = await this.prisma.optInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: user.chanel_edit_temp
                }
            });
            const postArray = opt.creatives.split('///');
            postArray[Number(user.post_id_temp)] = post.post;
            const creatives = postArray.join('///');
            await this.prisma.optInto.update({
                where: {
                    id: opt.id
                },
                data: {
                    creatives: creatives
                }
            });
        }
        return 'ok';
    }
    async checkEditOptTemp(idUser, check, checkPath) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        if (user.opt_type_temp === 'recommendation') {
            const recommendation = await this.prisma.recommendationInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: user.chanel_edit_temp,
                }
            });
            await this.prisma.recommendationInto.update({
                where: {
                    id: recommendation.id
                },
                data: {
                    check: check,
                    path_check: checkPath
                }
            });
        }
        else if (user.opt_type_temp === 'opt') {
            const opt = await this.prisma.optInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: user.chanel_edit_temp
                }
            });
            await this.prisma.recommendationInto.update({
                where: {
                    id: opt.id
                },
                data: {
                    check: check,
                    path_check: checkPath
                }
            });
        }
        return 'ok';
    }
    async addNewPost(idUser, data) {
        let result = null;
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        if (user.opt_type_temp === 'recommendation') {
            const recommendation = await this.prisma.recommendationInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: user.chanel_edit_temp
                }
            });
            console.log(recommendation);
            result = await this.prisma.recommendationInto.update({
                where: {
                    id: recommendation.id
                },
                data: {
                    creatives: recommendation.creatives + '///' + data.creatives
                }
            });
        }
        else if (user.opt_type_temp === 'opt') {
            const opt = await this.prisma.optInto.findFirst({
                where: {
                    idUser: idUser,
                    chanel: user.chanel_edit_temp
                }
            });
            result = await this.prisma.optInto.update({
                where: {
                    id: opt.id
                },
                data: {
                    creatives: opt.creatives + '///' + data.creatives
                }
            });
        }
        return result;
    }
    parseFilter(name) {
        if (name === 'repost') {
            return 'forwards_count';
        }
        else if (name === 'numberSubscribers') {
            return 'participants_count';
        }
        else if (name === 'coveragePub') {
            return 'avg_post_reach';
        }
        else if (name === 'coverageDay') {
            return 'daily_reach';
        }
        else if (name === 'indexSay') {
            return 'ci_index';
        }
    }
};
exports.OptService = OptService;
exports.OptService = OptService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OptService);
//# sourceMappingURL=opt.service.js.map