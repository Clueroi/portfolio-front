export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: unknown;
}