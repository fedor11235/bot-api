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
        const opt = await this.prisma.opt.update({
            where: { chanel: user.opt_chanel_create },
            data: data,
        });
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
            }
        });
        if (optOld) {
            const opt = await this.prisma.optInto.update({
                where: {
                    id: optOld.id,
                },
                data: body
            });
            const dataList = opt.allowed_dates.split('_');
            const bookingDate = opt.booking_date.split('_');
            const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem));
            const dataListFilterJoin = dataListFilter.join('_');
            await this.prisma.opt.update({
                where: {
                    chanel: optParent.chanel,
                },
                data: {
                    booking_date: dataListFilterJoin
                }
            });
            return opt;
        }
        else {
            const opt = await this.prisma.optInto.create({
                data: {
                    ...body,
                    chanel: idOpt,
                    idUser: idUser,
                    allowed_dates: optParent.booking_date
                }
            });
            const dataList = opt.allowed_dates.split('_');
            const bookingDate = opt.booking_date.split('_');
            const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem));
            const dataListFilterJoin = dataListFilter.join('_');
            await this.prisma.opt.update({
                where: {
                    chanel: optParent.chanel,
                },
                data: {
                    booking_date: dataListFilterJoin
                }
            });
            return opt;
        }
    }
    async setRecommendationInto(idUser, idOpt, isDelete, body) {
        console.log("Вхождение в рекомендацию");
        console.log(idOpt);
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
            const opt = await this.prisma.recommendationInto.update({
                where: {
                    id: optOld.id,
                },
                data: body
            });
            const dataList = opt.allowed_dates.split('_');
            const bookingDate = opt.booking_date.split('_');
            const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem));
            const dataListFilterJoin = dataListFilter.join('_');
            await this.prisma.recommendation.update({
                where: {
                    id: optParent.id,
                },
                data: {
                    data_list: dataListFilterJoin
                }
            });
            return opt;
        }
        else {
            const opt = await this.prisma.recommendationInto.create({
                data: {
                    ...body,
                    chanel: idOpt,
                    idUser: idUser,
                    allowed_dates: optParent?.data_list,
                }
            });
            const dataList = opt.allowed_dates.split('_');
            const bookingDate = opt.booking_date.split('_');
            const dataListFilter = dataList.filter(elem => !bookingDate.includes(elem));
            const dataListFilterJoin = dataListFilter.join('_');
            await this.prisma.recommendation.update({
                where: {
                    id: optParent.id,
                },
                data: {
                    data_list: dataListFilterJoin
                }
            });
            return opt;
        }
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
            const creativesNewArray = creativesArray.splice(postNumber, 1);
            let creativesNew;
            if (creativesNewArray.length > 1) {
                creativesNew = '///' + creativesNewArray.join("///");
            }
            else {
                creativesNew = '';
            }
            await this.prisma.optInto.update({
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
            const creativesNewArray = creativesArray.splice(postNumber, 1);
            let creativesNew;
            if (creativesNewArray.length > 1) {
                creativesNew = '///' + creativesNewArray.join("///");
            }
            else {
                creativesNew = '';
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