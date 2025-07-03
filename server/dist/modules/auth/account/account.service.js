"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
const bcrypt = require("bcryptjs");
let AccountService = class AccountService {
    prismaSevice;
    constructor(prismaSevice) {
        this.prismaSevice = prismaSevice;
    }
    async findAll() {
        return this.prismaSevice.user.findMany();
    }
    async create(input) {
        const saltRounds = 10;
        const { username, email, password } = input;
        const existingUser = await this.prismaSevice.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });
        if (existingUser) {
        }
        throw new common_1.ConflictException("Username or email alrady exist");
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await this.prismaSevice.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                displayName: username
            }
        });
        return true;
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountService);
//# sourceMappingURL=account.service.js.map