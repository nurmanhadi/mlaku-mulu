import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './configs/error.filter';
import * as cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as fs from 'fs';
import * as path from 'path';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new ErrorFilter())
  app.use(cookieParser('Yare Yareya :)'))
  const openApiDocumentPath = path.join(__dirname, '..', 'doc', 'api.json');
  const openApiDocument = JSON.parse(fs.readFileSync(openApiDocumentPath, 'utf-8'));
  SwaggerModule.setup('api', app, openApiDocument);
  await app.listen(3000);
}
bootstrap();
