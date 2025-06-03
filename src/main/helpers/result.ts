import { ErrorApplication } from '@/main/errors/ErrorApplication';

export type Result<T> =
  | { success: true; response: T; error?: undefined }
  | { success: false; response?: undefined; error: ErrorApplication };

export const createSuccessResult = <T>(response: T): Result<T> => ({
  success: true,
  response,
});

export const createErrorResult = <T>(error: ErrorApplication): Result<T> => ({
  success: false,
  error,
});
