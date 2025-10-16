/* import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erreur interne du serveur';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let details;
    let statusCode = status;

    console.log('Exception instance: ', exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object') {
        message = (errorResponse as any).message || message;
        details = (errorResponse as any).details || null;
        statusCode = (errorResponse as any).statusCode || status;
      }
    } else if (exception?.statusCode && exception?.message) {
      statusCode = exception.statusCode;
      if (
        exception.message.trim() ==
        'Invalid `this.prismaService.category.create()` invocation in\nD:\\world_news_api\\src\\category\\infrastructure\\repositories\\category.repository.ts:29:63\n\n  26 \n  27 async create(createCategoryDto: CreateCategoryDto): Promise<Category> {\n  28   const categoryData = this.categoryMapper.toPersistence(createCategoryDto);\n→ 29   const createdCategory = await this.prismaService.category.create(\nUnique constraint failed on the fields: (`name`)'
      ) {
        details = 'Unique constraint failed on the fields: (`name`)';
      } else {
        details = exception.message.trim(); // Place la trace ici, mais réduit le message
      }
      message = exception.error.message;
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      error: { message, errorCode, details },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}


 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erreur interne du serveur';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let details;
    let statusCode = status;

    console.log('Exception instance: ', exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object') {
        message = (errorResponse as any).message || message;
        details = (errorResponse as any).details || null;
        statusCode = (errorResponse as any).statusCode || status;
      }
    } else if (exception?.statusCode && exception?.message) {
      statusCode = exception.statusCode;

      // Généralisation des erreurs de base de données Prisma
      if (
        exception.message &&
        exception.message.includes('Unique constraint failed')
      ) {
        // Gestion spécifique pour les contraintes uniques
        details = `Violation de contrainte unique sur les champs: (${exception.message.match(/fields: \(`(.*?)`\)/)[1]})`;
        message = 'Une erreur de contrainte unique est survenue.';
      } else if (
        exception.message &&
        exception.message.includes('Foreign key constraint violated')
      ) {
        // Gestion spécifique pour les contraintes de clé étrangère
        details = `Violation de contrainte de clé étrangère`;
        message = 'Une erreur de contrainte de clé étrangère est survenue.';
      } else {
        // Gestion générique des autres erreurs
        details = exception.message.trim();
      }

      message = exception.error?.message || exception.message;
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      error: { message, errorCode, details },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
