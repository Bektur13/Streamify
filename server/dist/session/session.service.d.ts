import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/core/prisma/prisma.service';
import type { User } from "../../generated/prisma";
import { LoginInput } from './inputs/login.input';
import { RedisService } from '@/core/redis/redis.service';
export declare class SessionService {
    private readonly prismaService;
    private readonly configService;
    private readonly redisService;
    constructor(prismaService: PrismaService, configService: ConfigService, redisService: RedisService);
    login(req: Request, input: LoginInput): Promise<unknown>;
    logout(req: Request): Promise<unknown>;
    getSessionUser(req: Request): Promise<User | null>;
}
