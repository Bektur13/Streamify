import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/auth/account/account.module';
import { SessionModule } from './session/session.module'
import { CoreModule } from './core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    CoreModule,
    AccountModule, 
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
