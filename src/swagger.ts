import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): any {
  const logger: Logger = new Logger('Swagger');
  const options = new DocumentBuilder()
    .setTitle('Gnar Challenge')
    .setDescription('Gnar Challenge swagger')
    .setVersion('v0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
  logger.log(`Added swagger on endpoint /docs`);
}
