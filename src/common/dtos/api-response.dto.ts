// common/dtos/api-response.dto.ts
export class ApiResponse<T> {
  status: string;
  message: string;
  method?: string;
  path?: string;
  data?: T;
  statusCode?: number;
  error?: any;

  static success<T>(
    data: T,
    message: string,
    method: string,
    path: string,
  ): ApiResponse<T> {
    return {
      status: 'success',
      message,
      method,
      path,
      data,
    };
  }

  static error(
    message: string,
    statusCode: number,
    error?: any,
  ): ApiResponse<null> {
    return {
      status: 'error',
      message,
      statusCode,
      error,
    };
  }
}
