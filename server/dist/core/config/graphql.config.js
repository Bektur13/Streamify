"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphQLConfig = getGraphQLConfig;
const path_1 = require("path");
const is_dev_util_1 = require("../../shared/utils/is-dev.util");
function getGraphQLConfig(configService) {
    return {
        playground: (0, is_dev_util_1.isDev)(configService),
        path: configService.getOrThrow('GRAPHQL_PREFIX'),
        autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/core/graphql/schema/gql'),
        sortSchema: true,
        context: ({ req, res }) => ({ res, req }),
        installSubscriptionHandlers: true,
        introspection: true
    };
}
//# sourceMappingURL=graphql.config.js.map