import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { apiVersion } from './constants';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Retrieve cookie by req.cookies.
   */
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    // Space host and localhost for developing
    origin: ['http://127.0.0.1:5173'],
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: `${apiVersion}`,
  });
  app.setGlobalPrefix(`api`);

  /** Swagger setup */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Amazon Clone API')
    .setDescription(`v${apiVersion}`)
    .setVersion(`${apiVersion}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      defaultModelRendering: 'model',
    },
  });

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
