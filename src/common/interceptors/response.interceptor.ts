import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { handleHttpError } from '../utils/error-handler.util';
import { ApiResponse } from '../dtos/api-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) =>
        ApiResponse.success(
          data,
          'Request successfully processed',
          request.method,
          request.url,
        ),
      ),
      catchError((error) => throwError(() => handleHttpError(error))),
    );
  }
}
