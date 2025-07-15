import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express-session';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/core/prisma/prisma.service';
import type { User } from "../../generated/prisma";
import { LoginInput } from './inputs/login.input';

import { saveSession, destroySession } from 'src/shared/utils/session.util';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class SessionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService, 
        private readonly redisService: RedisService
    ) {}
    
    public async login(req: Request, input: LoginInput) {
        const { login, password } = input;

        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: {equals: login} }, { email: {equals: login} }],
            }
        });

        if(!user) {
            throw new NotFoundException('User not found with provided credentials.')
        }

        const passwordValid = await argon2.verify(user.password, password);

        if(!passwordValid) {
            throw new UnauthorizedException('Invalid password.')
        }

        return saveSession(req, user);
    }

    public async logout(req: Request) {
        return destroySession(req, this.configService)
    }

    public async getSessionUser(req: Request): Promise<User | null> {
        if(!req.session ||!req.session.userId) {
            return null;
        }
        const user = await this.prismaService.user.findUnique({
            where: { id: req.session.userId },
        });
        return user;
    }
}
