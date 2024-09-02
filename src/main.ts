/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors(); // Enable CORS for all routes
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('API documentation for the E-commerce system')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addGlobalParameters({
      name: 'country',
      in: 'query',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(
    `📚 Swagger documentation is available at: http://localhost:${port}/api-docs`,
  );
}
bootstrap();
