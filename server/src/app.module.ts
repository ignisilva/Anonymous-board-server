import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './common/utils';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';
import { EncryptModule } from './encrypt/encrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? 'development.env' : '.env',
      validationSchema,
    }),
    EncryptModule.forRoot({ saltRound: process.env.ENCRYPT_SALT_ROUND }),
    DatabaseModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
