import { BookResponse } from "../interfaces";

export interface UserFavorites {
    userId: number;
    userName: string;
    suspendedUntil: string;
    active: boolean;
    books: BookResponse[];
}