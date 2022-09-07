import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './common/utils';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? 'development.env' : '.env',
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
