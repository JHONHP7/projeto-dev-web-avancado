export interface UserUpdateResponse {
  data: {
    id: number;
    nome: string;
    email: string;
    role: string;
  };
  message: string;
  success: boolean;
  httpCode: number;
}
