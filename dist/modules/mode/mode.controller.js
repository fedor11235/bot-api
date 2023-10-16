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
exports.ModeController = void 0;
const common_1 = require("@nestjs/common");
const mode_service_1 = require("./mode.service");
let ModeController = class ModeController {
    constructor(modeService) {
        this.modeService = modeService;
    }
    async getMode(res, idUser) {
        const mode = await this.modeService.getMode(idUser);
        return res.status(common_1.HttpStatus.OK).json(mode);
    }
    async setMode(res, idUser, mode) {
        const status = await this.modeService.setMode(idUser, mode);
        return res.status(common_1.HttpStatus.OK).json(status);
    }
};
exports.ModeController = ModeController;
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ModeController.prototype, "getMode", null);
__decorate([
    (0, common_1.Get)('set'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('mode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ModeController.prototype, "setMode", null);
exports.ModeController = ModeController = __decorate([
    (0, common_1.Controller)('test/mode'),
    __metadata("design:paramtypes", [mode_service_1.ModeService])
], ModeController);
//# sourceMappingURL=mode.controller.js.map