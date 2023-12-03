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
exports.RecommendationController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const recommendation_service_1 = require("./recommendation.service");
let RecommendationController = class RecommendationController {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;
    }
    async recommendationCreate(res, body) {
        const result = await this.recommendationService.recommendationCreate(body);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationSet(res, body) {
        const result = await this.recommendationService.recommendationSet(body);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationIntoEdit(res, body) {
        const result = await this.recommendationService.recommendationIntoEdit(body);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationGet(res, isBot) {
        const result = await this.recommendationService.recommendationGet(isBot);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationCheckMark(res, idRecommendation, mark) {
        const result = await this.recommendationService.recommendationCheckMark(idRecommendation, mark);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationDeleteBot(res, id) {
        const result = await this.recommendationService.recommendationDeleteBot(id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationGetIndividual(res, idRecommendation) {
        const result = await this.recommendationService.recommendationGetIndividual(idRecommendation);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationGetIntoChannel(res, channel) {
        const result = await this.recommendationService.recommendationGetIntoChannel(channel);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationDelete(res, body) {
        const result = await this.recommendationService.recommendationDelete(body);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationGetRequisites(res, username) {
        const result = await this.recommendationService.recommendationGetRequisites(username);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationSetChek(res, idUser, chennel, check, checkPath) {
        const result = await this.recommendationService.recommendationSetChek(idUser, chennel, check, checkPath);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
exports.RecommendationController = RecommendationController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('formdata')),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationCreate", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('formdata')),
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationSet", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('formdata')),
    (0, common_1.Post)('edit-date'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationIntoEdit", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('isBot')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationGet", null);
__decorate([
    (0, common_1.Get)('mark'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idRecommendation')),
    __param(2, (0, common_1.Query)('mark')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationCheckMark", null);
__decorate([
    (0, common_1.Get)('delete-bot'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationDeleteBot", null);
__decorate([
    (0, common_1.Get)('individual'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("idRecommendation")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationGetIndividual", null);
__decorate([
    (0, common_1.Get)('into-channel'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("channel")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationGetIntoChannel", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('formdata')),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationDelete", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('formdata')),
    (0, common_1.Get)('requisites'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationGetRequisites", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('formdata')),
    (0, common_1.Get)('set-check'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('idUser')),
    __param(2, (0, common_1.Query)('chennel')),
    __param(3, (0, common_1.Query)('check')),
    __param(4, (0, common_1.Query)('checkPath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationSetChek", null);
exports.RecommendationController = RecommendationController = __decorate([
    (0, common_1.Controller)('recommendations'),
    __metadata("design:paramtypes", [recommendation_service_1.RecommendationService])
], RecommendationController);
//# sourceMappingURL=recommendation.controller.js.map