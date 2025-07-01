import { AccountService } from './account.service';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(): Promise<any>;
}
