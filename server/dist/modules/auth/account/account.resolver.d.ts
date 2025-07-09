import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
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
    create(input: CreateUserInput): Promise<Boolean>;
}
