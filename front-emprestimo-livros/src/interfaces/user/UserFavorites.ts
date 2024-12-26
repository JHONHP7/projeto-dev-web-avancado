import { BookResponse } from "../interfaces";

export interface UserFavorites {
    userId: number;
    userName: string;
    books: BookResponse[];
}