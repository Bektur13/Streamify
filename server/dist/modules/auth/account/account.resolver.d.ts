import { AccountService } from './account.service';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
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
