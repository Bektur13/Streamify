import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateUserInput } from '../../../modules/auth/account/inputs/create-user.input';
export declare class AccountService {
    private readonly prismaSevice;
    constructor(prismaSevice: PrismaService);
    findAll(): Promise<any>;
    create(input: CreateUserInput): Promise<boolean>;
}
