import { Module } from '@nestjs/common' 
import { GraphQLModule } from "@nestjs/graphql";
import { getGraphQLConfig } from "./config/graphql.config";
import { ConfigService } from "@nestjs/config";

@Module({GraphQLModule.forRootAsync({
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: getGraphQLConfig,
    inject: [ConfigService]
}),
PrismaModule,
)}