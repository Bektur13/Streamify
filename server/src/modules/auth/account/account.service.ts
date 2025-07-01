import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class AccountService {
    constructor(private readonly prismaSevice: PrismaService) {}

    async findAll() {
        return this.prismaSevice.user.findMany();
    }

}
