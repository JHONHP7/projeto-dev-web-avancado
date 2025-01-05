import { UserResponse } from "./UserResponse";

export interface UsersGetAllResponse {
    totalPages(totalPages: any): unknown;
    data: UserResponse[];
    message: string;
    success: boolean;
    httpCode: number;
}