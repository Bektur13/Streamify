import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
export declare function getGraphQLConfig(configService: ConfigService): ApolloDriverConfig;
