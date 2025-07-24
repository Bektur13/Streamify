import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateUserInput } from '../../../modules/auth/account/inputs/create-user.input';
import * as argon2 from 'argon2'
import { User } from '../../../../generated/prisma';
@Injectable()
export class AccountService {
    constructor(private readonly prismaSevice: PrismaService) {}

    async findAll() {
        return this.prismaSevice.user.findMany();
    }

    public async create(input: CreateUserInput) {

        const saltRounds = 10; 

        const { username, email, password } = input;

        const existingUser = await this.prismaSevice.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if(existingUser) {
            if(existingUser.username === username) {
                throw new ConflictException(`Username '${username}' already exists.`);
            }
            if(existingUser.email === email) {
                throw new ConflictException(`Email '${email}' is already exists.`)
            }
            throw new ConflictException("User with provided username or emailalready exists.")
        }

        const hashedPassword = await argon2.hash(password);

        await this.prismaSevice.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                displayName: username
            }
        })
        return true;
    }

}
