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
exports.RecommendationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecommendationService = class RecommendationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recommendationCreate(payload) {
        payload['number_posts'] = Number(payload['number_posts']);
        const recommendation = await this.prisma.recommendation.create({
            data: payload,
        });
        return recommendation;
    }
    async recommendationGet() {
        const recommendations = await this.prisma.recommendation.findMany();
        return recommendations;
    }
    async recommendationGetIndividual(idRecommendation) {
        const recommendation = await this.prisma.recommendation.findUnique({
            where: {
                id: Number(idRecommendation)
            }
        });
        return recommendation;
    }
    async recommendationGetIntoChannel(channel) {
        const recommendations = await this.prisma.recommendationInto.findMany({
            where: {
                chanel: channel
            }
        });
        return recommendations;
    }
    async recommendationDelete(data) {
        const idArray = Object.values(data).map((id) => Number(id));
        await this.prisma.recommendation.deleteMany({
            where: {
                id: {
                    in: idArray
                }
            }
        });
        return 'ok';
    }
    async recommendationGetRequisites(username) {
        const recommendation = await this.prisma.recommendation.findFirst({
            where: {
                username: username
            }
        });
        return recommendation.requisites;
    }
    async recommendationSetChek(idUser, chennel, check) {
        const recommendation = await this.prisma.recommendationInto.findFirst({
            where: {
                idUser: idUser,
                chanel: chennel
            }
        });
        await this.prisma.recommendationInto.update({
            where: {
                id: recommendation.id,
            },
            data: {
                check: check
            }
        });
        return 'ok';
    }
};
exports.RecommendationService = RecommendationService;
exports.RecommendationService = RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecommendationService);
//# sourceMappingURL=recommendation.service.js.map