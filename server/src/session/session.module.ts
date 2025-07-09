import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigService],
  providers: [SessionResolver, SessionService],
  exports: [SessionService]
})
export class SessionModule {}
