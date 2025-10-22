import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BadRequestException } from './common/exceptions/bad-Request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 🌍 Global filters
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 🧩 Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        if (process.env.NODE_ENV !== 'production') {
          // logs complets seulement en dev
          Logger.error(
            'Validation errors:',
            JSON.stringify(errors),
            'ValidationPipe',
          );
        }

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

  // ⚙️ Swagger config (toujours actif, mais propre en prod)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('News API')
    .setDescription('API de gestion des actualités')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      { type: 'apiKey', name: 'api-security', in: 'header' },
      'api-security',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // garde le token entre les refresh
    },
  });

  // 🌐 Choix dynamique du domaine pour les logs
  const port = process.env.PORT ?? 3000;
  const domain =
    process.env.NODE_ENV === 'production'
      ? process.env.APP_URL || 'https://worldnews-api.onrender.com' // à définir dans .env
      : `http://localhost:${port}`;

  try {
    await app.listen(port);
    Logger.log(`🚀 Server is running on ${domain}/api/docs`, 'Bootstrap');
  } catch (error) {
    Logger.error('❌ Error starting the application', error, 'Bootstrap');
  }
}

bootstrap();
