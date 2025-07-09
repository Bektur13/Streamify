import { Request } from 'express-session';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/prisma/prisma.service';
import type { User } from "../../generated/prisma";
import { LoginInput } from 'src/modules/auth/account/inputs/login.input';
export declare class SessionService {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    login(req: Request, input: LoginInput): Promise<User>;
    logout(req: Request): Promise<boolean>;
    getSessionUser(req: Request): Promise<User | null>;
}
