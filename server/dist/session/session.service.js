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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const argon2 = require("argon2");
const prisma_service_1 = require("@/core/prisma/prisma.service");
const session_util_1 = require("@/shared/utils/session.util");
const redis_service_1 = require("@/core/redis/redis.service");
let SessionService = class SessionService {
    prismaService;
    configService;
    redisService;
    constructor(prismaService, configService, redisService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.redisService = redisService;
    }
    async login(req, input) {
        const { login, password } = input;
        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: { equals: login } }, { email: { equals: login } }],
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found with provided credentials.');
        }
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid password.');
        }
        return (0, session_util_1.saveSession)(req, user);
    }
    async logout(req) {
        return (0, session_util_1.destroySession)(req, this.configService);
    }
    async getSessionUser(req) {
        if (!req.session || !req.session.userId) {
            return null;
        }
        const user = await this.prismaService.user.findUnique({
            where: { id: req.session.userId },
        });
        return user;
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        redis_service_1.RedisService])
], SessionService);
//# sourceMappingURL=session.service.js.map