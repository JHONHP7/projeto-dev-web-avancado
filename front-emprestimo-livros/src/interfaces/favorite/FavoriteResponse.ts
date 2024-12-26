export interface FavoriteResponse {
    userId: number;
    userName: string;
    books: {
        bookId: number;
        bookTitle: string;
        bookAuthor: string;
        bookAvailable: boolean;
        bookQuantity: number;
    }[];
}