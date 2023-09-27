import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  /** Swagger setup */
  const apiVersion = '1';
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Release management system API')
    .setDescription(`version1`)
    .setVersion(apiVersion)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      defaultModelRendering: 'model',
    },
  });

  await app.listen(3000);
}
bootstrap();
