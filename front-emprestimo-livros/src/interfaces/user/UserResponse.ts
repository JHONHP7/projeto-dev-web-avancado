export interface UserResponse {
    id: number;
    nome: string;
    email: string;
    role: 'ADMIN' | 'USER';
}