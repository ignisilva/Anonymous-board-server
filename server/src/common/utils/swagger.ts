import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, prefix?: string): void {
  const options = new DocumentBuilder()
    .setTitle('Anonymous Board API Docs')
    .setDescription('Anonymous Board API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`${prefix}/docs`, app, document);
}
