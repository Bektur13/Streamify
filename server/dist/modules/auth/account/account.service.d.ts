import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserInput } from './inputs/create-user.input';
export declare class AccountService {
    private readonly prismaSevice;
    constructor(prismaSevice: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        password: string;
        username: string;
        displayName: string;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(input: CreateUserInput): Promise<boolean>;
}
