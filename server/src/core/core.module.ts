import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { getGraphQLConfig } from './config/graphql.config';
import { RedisModule } from './redis/redis.module'; 
import { AccountModule } from 'src/modules/auth/account/account.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        GraphQLModule.forRootAsync({
            driver: ApolloDriver,
            imports: [ConfigModule],
            useFactory: getGraphQLConfig,
            inject: [ConfigService],
        }),
        PrismaModule,
        RedisModule, 
        AccountModule
    ],
})

export class CoreModule {}