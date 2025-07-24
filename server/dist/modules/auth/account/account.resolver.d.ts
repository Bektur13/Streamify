import { AccountService } from './account.service';
import { CreateUserInput } from '../../../modules/auth/account/inputs/create-user.input';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(): Promise<any>;
    create(input: CreateUserInput): Promise<Boolean>;
}
