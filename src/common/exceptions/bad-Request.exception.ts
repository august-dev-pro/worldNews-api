import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(private readonly validationErrors: any[]) {
    console.log('the validationErrors: ', validationErrors);

    // Serialize the error correctly
    super(
      {
        status: 'error',
        message: 'Validation failed',
        errorCode: 'VALIDATION_ERROR',
        details: validationErrors.map((err) => ({
          field: err.field,
          message: err.message,
          value: err.value,
        })),
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  getValidationErrors() {
    return this.validationErrors;
  }
}

export interface ErrorResponse {
  status: string;
  message: string;
  errorCode: string;
  details: { field: string; message: string; value: any }[];
}
