import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EncryptModuleOptions } from './interface';
import * as bcrypt from 'bcrypt';
import { ENCRYPT_OPTIONS } from './constants';

@Injectable()
export class EncryptService {
  constructor(
    @Inject(ENCRYPT_OPTIONS) private readonly options: EncryptModuleOptions,
  ) {}

  async hash(plainText: string): Promise<string> {
    const { saltRound } = this.options;

    try {
      const hashedText = await bcrypt.hash(plainText, saltRound);

      return hashedText;
    } catch (error) {
      Logger.error(`error occur on EncrpytService.hash`, error.stack);

      throw new InternalServerErrorException();
    }
  }
}
