import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { apiVersion } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(`api/v${apiVersion}`);

  /** Swagger setup */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Amazon Clone API')
    .setDescription(`v${apiVersion}`)
    .setVersion(`${apiVersion}`)
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
