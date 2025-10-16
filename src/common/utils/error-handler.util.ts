// common/utils/error-handler.util.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export function handleHttpError(error: any) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'An unexpected error occurred';
  let errorData;

  if (error instanceof HttpException) {
    statusCode = error.getStatus();
    message = error.message;
    errorData = error.getResponse();
  }

  return {
    status: 'error',
    message,
    statusCode,
    error: errorData || null,
  };
}
