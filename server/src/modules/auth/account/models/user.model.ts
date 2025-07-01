import { Field, ID, ObjectType } from '@nestjs/graphql'
import type { User } from '@prisma/generated'

@ObjectType() 
export class UserModel implements User {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public email: string

    @Field(() => String)
    public password: 
}