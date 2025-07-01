import { PrismaService } from 'src/core/prisma/prisma.service';
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
}
