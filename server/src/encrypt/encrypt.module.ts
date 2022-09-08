import { DynamicModule, Global, Module } from '@nestjs/common';
import { ENCRYPT_OPTIONS } from './constants';
import { EncryptService } from './encrypt.service';
import { EncryptModuleOptions } from './interface';

@Global()
@Module({})
export class EncryptModule {
  static forRoot(options: EncryptModuleOptions): DynamicModule {
    return {
      module: EncryptModule,
      providers: [
        {
          provide: ENCRYPT_OPTIONS,
          useValue: options,
        },
        EncryptService,
      ],
      exports: [EncryptService],
    };
  }
}
