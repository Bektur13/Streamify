import '@/shared/types/express-session'; // <-- keep as side-effect only, no import assignment
import session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { RedisStore } from 'connect-redis';
import { RedisService } from './core/redis/redis.service';
import { ms, type StringValue } from './shared/utils/ms.util';
import { parseBoolean } from './shared/utils/parse-boolean.util';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true})

  const config = app.get(ConfigService);
  
  const redis = app.get(RedisService);

  app.enableShutdownHooks();
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
  app.use(config.getOrThrow<string>('GRAPHQL_PREFIX'), graphqlUploadExpress())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'), 
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        // domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax'
      },
      store: new RedisStore({
        client: redis as any,
        prefix: config.getOrThrow<string>('SESSION_FOLDER')
      })
    })
  )

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie']
  })

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'))
  console.log(`✅ Server is running at: ${config.getOrThrow<string>('APPLICATION_URL')}`)
}
bootstrap();