import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import graphqlUploadExpress from 'graphql-upload';
import { CoreModule } from './core/core.module';


// import { CoreModule } from ''

import { RedisService } from "./core/redis/redis.service";

import { ms, type StringValue } from "./shared/utils/ms.util";
import { parseBoolean } from "./shared/utils/parse-boolean.util";

async function bootstrap() {
    const app = await NestFactory.create(CoreModule, { rawBody: true })
    const config = app.get(ConfigService);
    const redis = app.get(RedisService);

    app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

    app.use(config.getOrThrow<string>('GRAPHQL_PREFIX'), graphqlUploadExpress());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    )

    app.use(
        session({
            secret: config.getOrThrow<string>('SESSION_SECRET'), // Encrypt session data
            name: config.getOrThrow<string>('SESSION_NAME'), // Session cookie name
            resave: false, // Don't save session if nothing changed
            saveUninitialized: false, // Don't save empty sessions
            cookie: {
                domain: config.getOrThrow<string>('SESSION_DOMAIN'),
                maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')), // Lifetime of cookie
                httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')), // Prevent client-side access to cookie
                secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')), // Only send cookie over HTTPS
                sameSite: 'lax' // Helps prevent CSRF
            },
            store: new RedisStore({
                client: redis, // Redis client from our service
                prefix: config.getOrThrow<string>('SESSION_FOLDER'), // Prefix for Redis keys
                ttl: ms(config.getOrThrow<StringValue>('REDIS_TTL')) // Time to live for Redis keys
            })
        })
    )

      app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie']
  })

  /**
   * START THE SERVER
   * Uses port from .env and logs the running URL
   */
  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'))
  console.log(`✅ Server is running at: ${config.getOrThrow<string>('APPLICATION_URL')}`)
}
bootstrap()