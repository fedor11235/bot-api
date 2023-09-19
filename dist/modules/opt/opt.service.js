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
        const user = await this.prisma.user.findFirst({
            where: { idUser: idUser },
        });
        await this.prisma.opt.deleteMany({
            where: { idUser: user.id },
        });
        const opt = await this.prisma.opt.create({
            data: {
                idUser: user.id,
                chanel: chanel,
            },
        });
        return 'ok';
    }
    async getOpt(idUser) {
        const user = await this.prisma.user.findFirst({
            where: { idUser: idUser },
            include: {
                opts: true,
            },
        });
        return user.opts[0];
    }
    async setOpt(idUser, data) {
        const user = await this.prisma.user.findFirst({
            where: { idUser: idUser },
            include: {
                opts: true,
            },
        });
        const opt = await this.prisma.opt.update({
            where: { id: user.opts[0].id },
            data: data,
        });
        return opt;
    }
};
exports.OptService = OptService;
exports.OptService = OptService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OptService);
//# sourceMappingURL=opt.service.js.map