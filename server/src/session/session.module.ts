import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/core/redis/redis.module';

@Module({
  imports: [RedisModule, ConfigModule],
  providers: [SessionResolver, SessionService],
  exports: [SessionService]
})
export class SessionModule {}
