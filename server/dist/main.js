"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const connect_redis_1 = require("connect-redis");
const redis_service_1 = require("./core/redis/redis.service");
const ms_util_1 = require("./shared/utils/ms.util");
const parse_boolean_util_1 = require("./shared/utils/parse-boolean.util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { rawBody: true });
    const config = app.get(config_1.ConfigService);
    const redis = app.get(redis_service_1.RedisService);
    app.enableShutdownHooks();
    app.use(cookieParser(config.getOrThrow('COOKIES_SECRET')));
    app.use(config.getOrThrow('GRAPHQL_PREFIX'), (0, graphql_upload_minimal_1.graphqlUploadExpress)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true
    }));
    app.use(session({
        secret: config.getOrThrow('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: (0, ms_util_1.ms)(config.getOrThrow('SESSION_MAX_AGE')),
            httpOnly: (0, parse_boolean_util_1.parseBoolean)(config.getOrThrow('SESSION_HTTP_ONLY')),
            secure: (0, parse_boolean_util_1.parseBoolean)(config.getOrThrow('SESSION_SECURE')),
            sameSite: 'lax'
        },
        store: new connect_redis_1.RedisStore({
            client: redis,
            prefix: config.getOrThrow('SESSION_FOLDER'),
            ttl: Number(config.getOrThrow('REDIS_TTL'))
        })
    }));
    app.enableCors({
        origin: config.getOrThrow('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie']
    });
    await app.listen(config.getOrThrow('APPLICATION_PORT'));
    console.log(`✅ Server is running at: ${config.getOrThrow('APPLICATION_URL')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map