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
        const isUserChanel = await this.prisma.userChanel.findFirst({
            where: {
                idUser: idUser,
                idChanel: idChanel,
            },
        });
        if (isUserChanel) {
            return 'exist';
        }
        await this.prisma.userChanel.create({
            data: {
                idUser: idUser,
                idChanel: idChanel,
            },
        });
        await this.prisma.user.create({
            data: {
                idUser: idUser,
            },
        });
        return 'created';
    }
    async getChanelsUser(idUser) {
        const chanels = await this.prisma.userChanel.findMany({
            where: {
                idUser: idUser,
            },
        });
        return chanels;
    }
    async getChanelsCategories(categoryQuery) {
        let categoryFind;
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
};
exports.ChanelService = ChanelService;
exports.ChanelService = ChanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChanelService);
//# sourceMappingURL=chanel.service.js.map