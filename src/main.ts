/* import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BadRequestException } from './common/exceptions/bad-Request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        // Log des erreurs complètes pour débogage
        console.error('Validation errors:', errors);

        // Formatage des erreurs
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          message: err.constraints
            ? Object.values(err.constraints)[0] // Premier message d'erreur
            : 'Invalid value',
          value: err.value,
        }));
        console.log('error details stringify', JSON.stringify(formattedErrors));

        // Retourne une exception personnalisée
        return new BadRequestException(formattedErrors);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('News API')
    .setDescription('API de gestion des actualités')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'api-security', in: 'header' },
      'api-security',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  try {
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    Logger.log(
      `🚀 Server is running on http://localhost:${port}/api/docs`,
      'Bootstrap',
    );
  } catch (error) {
    Logger.error('❌ Error starting the application', error, 'Bootstrap');
  }
}

bootstrap();
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BadRequestException } from './common/exceptions/bad-Request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Utilisation du filtre d'exception personnalisé
  app.useGlobalFilters(new HttpExceptionFilter());

  // Ajout d'un préfixe global pour les API (facultatif)
  // app.setGlobalPrefix('api/v1');

  // Configuration des pipes de validation avec exception personnalisée
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        Logger.error(
          'Validation errors:',
          JSON.stringify(errors),
          'ValidationPipe',
        );

        const formattedErrors = errors.map((err) => ({
          field: err.property,
          message: err.constraints
            ? Object.values(err.constraints)[0]
            : 'Invalid value',
          value: err.value,
        }));

        return new BadRequestException(formattedErrors);
      },
    }),
  );

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('News API')
    .setDescription('API de gestion des actualités')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'api-security', in: 'header' },
      'api-security',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Limiter Swagger à l'environnement de développement
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api/doc', app, document);
  } else {
    Logger.warn('Swagger is disabled in production mode', 'Swagger');
  }

  try {
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    Logger.log(
      `🚀 Server is running on http://localhost:${port}/api/doc`,
      'Bootstrap',
    );
  } catch (error) {
    Logger.error('❌ Error starting the application', error, 'Bootstrap');
  }
}

bootstrap();
