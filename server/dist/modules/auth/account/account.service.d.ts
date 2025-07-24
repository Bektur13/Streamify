import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateUserInput } from '../../../modules/auth/account/inputs/create-user.input';
export declare class AccountService {
    private readonly prismaSevice;
    constructor(prismaSevice: PrismaService);
    findAll(): Promise<{
        username: string;
        email: string;
        password: string;
        id: string;
        displayName: string;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(input: CreateUserInput): Promise<boolean>;
}
