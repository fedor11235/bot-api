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
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
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
                channels: true
            }
        });
        const resp = { ...user, userNumber: user.channels.length };
        return resp;
    }
    async setProfile(idUser, tariffPlan, time) {
        console.log("idUser: ", idUser);
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + Number(time));
        console.log(currentDate);
        await this.prisma.user.update({
            where: {
                id: idUser,
            },
            data: {
                tariffPlan: tariffPlan,
                subscriptionEndDate: String(currentDate)
            },
        });
        return "ok";
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