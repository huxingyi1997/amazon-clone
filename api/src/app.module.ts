import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from './stripe/stripe.module';

const IS_DEV = process.env.NODE_ENV !== 'production';

const url = IS_DEV
  ? 'mongodb://localhost:27017/amazon'
  : 'mongodb://mongo:g18Jdel37P62@infra.zeabur.com:30224';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(url),
    ProductModule,
    UserModule,
    AuthModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
