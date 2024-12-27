import { Loan, User } from "../interfaces";

export interface LoansTableProps {
    loans: Loan[];
    user: User | null;
    handleRenew: (loanId: number, status: string) => void;
    handleReturn: (loanId: number) => void;
}