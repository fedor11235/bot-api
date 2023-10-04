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
exports.ChanelController = void 0;
const common_1 = require("@nestjs/common");
const chanel_service_1 = require("./chanel.service");
let ChanelController = class ChanelController {
    constructor(chanelService) {
        this.chanelService = chanelService;
    }
    async getChanels(res, username) {
        const chanels = await this.chanelService.getChanels(username);
        return res.status(common_1.HttpStatus.OK).json(chanels);
    }
    async createChanelUser(res, idUser, idChanel, title, username) {
        const status = await this.chanelService.createChanelUser(idUser, idChanel, title, username);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async getChanelsUser(res, idUser) {
        const chanels = await this.chanelService.getChanelsUser(idUser);
        return res.status(common_1.HttpStatus.OK).json(chanels);
    }
    async getChanelsCategories(res, idUser, category, filter) {
        const chanels = await this.chanelService.getChanelsCategories(idUser, category, filter);
        return res.status(common_1.HttpStatus.OK).json(chanels);
    }
    async setCategoryChanel(res, idUser, category) {
        const chanels = await this.chanelService.setCategoryChanel(idUser, category);
        return res.status(common_1.HttpStatus.OK).json(chanels);
    }
};
exports.ChanelController = ChanelController;
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChanelController.prototype, "getChanels", null);
__decorate([
    (0, common_1.Get)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('idChanel')),
    __param(3, (0, common_1.Query)('title')),
    __param(4, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChanelController.prototype, "createChanelUser", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChanelController.prototype, "getChanelsUser", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChanelController.prototype, "getChanelsCategories", null);
__decorate([
    (0, common_1.Get)('user/set-channel'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChanelController.prototype, "setCategoryChanel", null);
exports.ChanelController = ChanelController = __decorate([
    (0, common_1.Controller)('chanel'),
    __metadata("design:paramtypes", [chanel_service_1.ChanelService])
], ChanelController);
//# sourceMappingURL=chanel.controller.js.map