export interface APIError {
  status: number;
  data: {
    message?: string;
    [key: string]: any;
  };
}
