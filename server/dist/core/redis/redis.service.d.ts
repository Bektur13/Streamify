import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
export declare class RedisService extends Redis {
    private readonly configService;
    constructor(configService: ConfigService);
    create(createRediDto: CreateRediDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRediDto: UpdateRediDto): string;
    remove(id: number): string;
}
