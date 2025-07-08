import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express-session';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/core/prisma/prisma.service';
import type { User } from "../../generated/prisma";
import { LoginInput } from 'src/modules/auth/account/inputs/login.input';

import { saveSession, destroySession } from 'src/shared/utils/session.util';

@Injectable()
export class SessionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService
    ) {}
    
    public async login(req: Request, input: LoginInput): Promise<User> {
        const { login, password } = input;

        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: login }, { email: login }],
            },
        });

        if(!user) {
            throw new NotFoundException('User not found with provided credentials.')
        }

        const passwordValid = await argon2.verify(user.password, password);

        if(!passwordValid) {
            throw new UnauthorizedException('Invalid password.')
        }

        try {
            await saveSession(req, user);
            return user;
        } catch(error) {
            throw new InternalServerErrorException('Failed to save session after login.')
        }
    }

    public async logout(req: Request): Promise<boolean> {
        try {
            await destroySession(req, this.configService);
            return true;
        } catch(error) {
            throw new InternalServerErrorException("Failed to destroy session during logout.")
        }
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
