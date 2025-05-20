import * as dotenv from 'dotenv';
import { Logger } from 'nestjs-pino';
dotenv.config();

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger : ["error", "verbose", "log", "fatal", "warn"],
    bufferLogs : true
  }, );
  /*
     Here it's assumed that public and views are in the root directory,
     alongside with src. You can put them wherever you want, 
     just use the correct path if you use another folder.
  */
     const config = new DocumentBuilder()
     .setTitle('BiteMe Burger app')
     .setDescription('API leírás')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.1.7:3000'],
    credentials : true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useLogger(app.get(Logger));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
