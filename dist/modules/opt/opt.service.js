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
        await this.prisma.opt.delete({
            where: { chanel: chanel },
        });
        const opt = await this.prisma.opt.create({
            data: {
                idUser: user.id,
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
    async setOptInto(idUser, idOpt, bookingDate) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        const opt = await this.prisma.optInto.findUnique({
            where: {
                chanel: idOpt
            }
        });
        if (!opt) {
            const opt = await this.prisma.optInto.create({
                data: {
                    chanel: idOpt,
                    booking_date: bookingDate,
                    user: {
                        connect: user
                    }
                },
            });
        }
        else {
            const opt = await this.prisma.optInto.update({
                where: {
                    chanel: idOpt
                },
                data: {
                    chanel: idOpt,
                    booking_date: bookingDate,
                    user: {
                        connect: user
                    }
                }
            });
        }
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