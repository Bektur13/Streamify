import { RedisService } from './redis.service';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
export declare class RedisController {
    private readonly redisService;
    constructor(redisService: RedisService);
    create(createRediDto: CreateRediDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRediDto: UpdateRediDto): string;
    remove(id: string): string;
}
