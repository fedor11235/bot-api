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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPromocode(idUser) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        if (user.promocode == 'LOL') {
            return 'no';
        }
        let promocode = '';
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let index = 0; index < 5; index += 1) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            promocode += alphabet[randomIndex];
        }
        for (let index = 0; index < 2; index += 1) {
            const randomIndex = Math.floor(Math.random() * 9);
            promocode += String(randomIndex);
        }
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                promocode: promocode,
            },
        });
        return promocode;
    }
    async getProfile(idUser) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            },
            include: {
                channels: true,
                opts: true,
            }
        });
        const resp = { ...user, userNumber: user.channels.length, optNumber: user.opts.length };
        return resp;
    }
    async setProfile(idUser, tariffPlan, time) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + Number(time));
        const dateEnd = currentDate.getDate() + '.' + currentDate.getMonth() + 1 + '.' + currentDate.getFullYear();
        await this.prisma.user.update({
            where: {
                id: idUser,
            },
            data: {
                tariffPlan: tariffPlan,
                subscriptionEndDate: dateEnd
            },
        });
        return "ok";
    }
    async setAllDateProfile(idUser, data) {
        await this.prisma.user.update({
            where: {
                id: idUser,
            },
            data: data,
        });
        return "ok";
    }
    async setTariffTemp(idUser, tariffPlan) {
        await this.prisma.user.update({
            where: {
                id: idUser,
            },
            data: {
                tariffPlan_temp: tariffPlan,
            },
        });
        return "ok";
    }
    async uploadPromocode(idUser, promocode) {
        if (promocode === 'LOL') {
            return 'expired';
        }
        const user = await this.prisma.user.findFirst({
            where: {
                promocode: promocode,
            },
        });
        if (user) {
            await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    promocode: 'LOL'
                }
            });
            await this.prisma.user.update({
                where: {
                    id: idUser,
                },
                data: {
                    discount: 20,
                },
            });
            return 'ok';
        }
        return "not-exist";
    }
    async getCheckUser(idUser) {
        const isUser = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        if (isUser) {
            return 'exist';
        }
        return 'empty';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map