import { SessionService } from "./session.service";
import { LoginInput } from "./inputs/login.input";
import { GqlContext } from "@/shared/types/gql-context.types";
export declare class SessionResolver {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    loginUser(input: LoginInput, { req }: GqlContext): Promise<unknown>;
    logoutUser(context: GqlContext): Promise<boolean>;
}
