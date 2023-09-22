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
exports.ChanelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChanelService = class ChanelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getChanels(username) {
        const chanels = await this.prisma.catalog.findFirst({
            where: {
                username: username,
            },
        });
        return chanels;
    }
    async createChanelUser(idUser, idChanel) {
        let status;
        const isUserChanel = await this.prisma.userChanel.findFirst({
            where: {
                idUser: idUser,
                idChanel: idChanel,
            },
        });
        if (isUserChanel) {
            status = 'exist';
        }
        else {
            await this.prisma.userChanel.create({
                data: {
                    idUser: idUser,
                    idChanel: idChanel,
                },
            });
            const user = await this.prisma.user.findFirst({
                where: {
                    idUser: idUser,
                },
            });
            if (!user) {
                await this.prisma.user.create({
                    data: {
                        idUser: idUser,
                    },
                });
            }
            status = 'created';
        }
        return status;
    }
    async getChanelsUser(idUser) {
        const chanels = await this.prisma.userChanel.findMany({
            where: {
                idUser: idUser,
            },
        });
        return chanels;
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
    async getChanelsCategories(idUser, categoryQuery, filter) {
        let categoryFind;
        if (filter) {
            const filterPrepar = this.parseFilter(filter);
            const user = await this.prisma.user.findFirst({
                where: {
                    idUser: idUser
                },
            });
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    filter: filterPrepar,
                },
            });
            const filterData = { [filterPrepar]: 'desc' };
            if (categoryQuery === 'all') {
                categoryFind = await this.prisma.catalog.findMany({
                    orderBy: [filterData],
                });
            }
            else {
                categoryFind = await this.prisma.catalog.findMany({
                    where: {
                        category: categoryQuery,
                    },
                    orderBy: [filterData],
                });
            }
            return categoryFind;
        }
        const user = await this.prisma.user.findFirst({
            where: {
                idUser: idUser
            },
        });
        if (user.filter === "none") {
            if (categoryQuery === 'all') {
                categoryFind = await this.prisma.catalog.findMany();
            }
            else {
                categoryFind = await this.prisma.catalog.findMany({
                    where: {
                        category: categoryQuery,
                    },
                });
            }
            return categoryFind;
        }
        if (categoryQuery === 'all') {
            categoryFind = await this.prisma.catalog.findMany({
                orderBy: [{ [user.filter]: 'desc' }]
            });
        }
        else {
            categoryFind = await this.prisma.catalog.findMany({
                where: {
                    category: categoryQuery,
                },
                orderBy: [{ [user.filter]: 'desc' }]
            });
        }
        return categoryFind;
    }
};
exports.ChanelService = ChanelService;
exports.ChanelService = ChanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChanelService);
//# sourceMappingURL=chanel.service.js.map