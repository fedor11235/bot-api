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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptController = void 0;
const common_1 = require("@nestjs/common");
const opt_service_1 = require("./opt.service");
let OptController = class OptController {
    constructor(modeService) {
        this.modeService = modeService;
    }
    async createOpt(res, idUser, chanel) {
        const status = await this.modeService.createOpt(idUser, chanel);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async getOpt(res, idUser) {
        const opt = await this.modeService.getOpt(idUser);
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
    async getStatOpt(res, chanel) {
        const opt = await this.modeService.getStatOpt(chanel);
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
    async getOptCategories(res, idUser, category, filter) {
        const opt = await this.modeService.getOptCategories(idUser, category, filter);
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
    async setOptInto(res, idUser, idOpt, payload) {
        const opt = await this.modeService.setOptInto(idUser, idOpt, payload);
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
    async setRecommendationInto(res, idUser, idOpt, payload) {
        const opt = await this.modeService.setRecommendationInto(idUser, idOpt, payload);
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
    async getOptInto(res, idOpt) {
        const opt = await this.modeService.getOptInto(idOpt);
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
    async setOpt(res, idUser, data) {
        const opt = await this.modeService.setOpt(idUser, data);
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
    async getAllOpts(res) {
        const opt = await this.modeService.getAllOpts();
        return res.status(common_1.HttpStatus.OK).json(opt);
    }
};
exports.OptController = OptController;
__decorate([
    (0, common_1.Get)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('chanel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "createOpt", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "getOpt", null);
__decorate([
    (0, common_1.Get)('stat'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('chanel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "getStatOpt", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "getOptCategories", null);
__decorate([
    (0, common_1.Post)('into/set'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('idOpt')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "setOptInto", null);
__decorate([
    (0, common_1.Post)('into-recommendation/set'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('idOpt')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "setRecommendationInto", null);
__decorate([
    (0, common_1.Get)('into/get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idOpt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "getOptInto", null);
__decorate([
    (0, common_1.Post)('set'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "setOpt", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OptController.prototype, "getAllOpts", null);
exports.OptController = OptController = __decorate([
    (0, common_1.Controller)('opt'),
    __metadata("design:paramtypes", [opt_service_1.OptService])
], OptController);
//# sourceMappingURL=opt.controller.js.map