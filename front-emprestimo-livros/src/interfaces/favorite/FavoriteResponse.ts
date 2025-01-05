export interface FavoriteResponse {
    userId: number;
    userName: string;
    suspendedUntil: string;
    active: boolean;
    books: {
        bookId: number;
        bookTitle: string;
        bookAuthor: string;
        bookAvailable: boolean;
        bookQuantity: number;
    }[];
}