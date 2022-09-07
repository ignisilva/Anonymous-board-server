import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const PREFIX = configService.get('APP_PREFIX');

  const PORT = configService.get('PORT') | 3000;

  app.setGlobalPrefix(PREFIX);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app, PREFIX);

  await app.listen(PORT, () => {
    Logger.log(`server run on http://localhost:${PORT}${PREFIX}`);
    Logger.log(`api docs run on http://localhost:${PORT}${PREFIX}/docs`);
  });
}
bootstrap();
