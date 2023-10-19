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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getPromocode(res, idUser) {
        const promocode = await this.userService.getPromocode(idUser);
        return res.status(common_1.HttpStatus.OK).json(promocode);
    }
    async getProfile(res, idUser) {
        const profile = await this.userService.getProfile(idUser);
        return res.status(common_1.HttpStatus.OK).json(profile);
    }
    async setProfile(res, idUser, tariffPlan, time, isOne) {
        const status = await this.userService.setProfile(idUser, tariffPlan, time, isOne);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async setTariffTemp(res, idUser, tariffPlan) {
        const status = await this.userService.setTariffTemp(idUser, tariffPlan);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async uploadPromocode(res, idUser, promocode) {
        const status = await this.userService.uploadPromocode(idUser, promocode);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async setAllDateProfile(res, idUser, body) {
        const status = await this.userService.setAllDateProfile(idUser, body);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async getCheckUser(res, idUser) {
        const check = await this.userService.getCheckUser(idUser);
        return res.status(common_1.HttpStatus.OK).json(check);
    }
    async optProfile(res, idUser) {
        const status = await this.userService.optProfile(idUser);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async recommendationsProfile(res, idUser) {
        const status = await this.userService.recommendationsProfile(idUser);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
    async optUser(res, idUser) {
        const status = await this.userService.optUser(idUser);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('promocode'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPromocode", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('set'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('tariffPlan')),
    __param(3, (0, common_1.Query)('time')),
    __param(4, (0, common_1.Query)('isOne')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setProfile", null);
__decorate([
    (0, common_1.Get)('set/tariff-temp'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('tariffPlan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setTariffTemp", null);
__decorate([
    (0, common_1.Get)('upload/promocode'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('promocode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadPromocode", null);
__decorate([
    (0, common_1.Post)('set/profile'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setAllDateProfile", null);
__decorate([
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCheckUser", null);
__decorate([
    (0, common_1.Get)('opt-into-user'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "optProfile", null);
__decorate([
    (0, common_1.Get)('recommendation-into-user'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "recommendationsProfile", null);
__decorate([
    (0, common_1.Get)('opt-user'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "optUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('test/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map