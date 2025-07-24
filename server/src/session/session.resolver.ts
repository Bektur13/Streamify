import { UseFilters } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { Request, Response } from "@nestjs/common";
import { SessionService } from "./session.service";
import { LoginInput } from "./inputs/login.input";
import { UserModel } from "@/modules/auth/account/models/user.model";
import { GqlContextType } from "@nestjs/graphql";
import { GqlContext } from "@/shared/types/gql-context.types";

@Resolver(() => UserModel)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => UserModel)
  loginUser(
    @Args('data') input: LoginInput,
    @Context() { req }: GqlContext
  ) {
    return this.sessionService.login(req, input)
  }

  @Mutation(() => Boolean, { name: 'logoutUser' })
  public async logoutUser(
    @Context() context: GqlContext
  ): Promise<boolean> {
    await this.sessionService.logout(context.req);
    return true;
  }
}