import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { use } from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }),
    
  ) 
  app.use(cookieParser());
  app.setGlobalPrefix('api/')
  await app.listen(3000);
}
bootstrap();
