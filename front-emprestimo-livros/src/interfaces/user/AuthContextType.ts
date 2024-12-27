import { User } from "../interfaces";

export interface AuthContextType {
    user: User | null;
    logout: () => void;
    getCurrentUser: () => Promise<void>;
}
