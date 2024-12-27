import { Book, User } from "../interfaces";

export interface BookTableProps {
    books: Book[];
    user: User | null;
}