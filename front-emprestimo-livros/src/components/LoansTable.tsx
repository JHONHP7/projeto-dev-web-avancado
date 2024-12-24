interface Loan {
  loanId: number;
  bookId: number;
  userId: number;
  loanDate: string;
  returnDate: string;
  status: string;
  bookName: string;
  userName: string;
}

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

interface LoansTableProps {
  loans: Loan[];
  user: User | null;
  handleRenew: (loanId: number, status: string) => void;
  handleReturn: (loanId: number) => void;
}

const LoansTable: React.FC<LoansTableProps> = ({ loans, user, handleRenew, handleReturn }) => {
  const formatDate = (dateString: string): string => {
    const parts = dateString.split("-");
    if (parts.length !== 3) {
      return "";
    }

    const [day, month, year] = parts;
    if (isNaN(Number(day)) || isNaN(Number(month)) || isNaN(Number(year))) {
      return "";
    }

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Livro</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Empréstimo</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Devolução</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            {user?.role === 'ADMIN' && (
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loans.map((loan) => (
            <tr key={loan.loanId}>
              <td className="px-6 py-4 whitespace-nowrap">{loan.bookName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{loan.userName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(loan.loanDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(loan.returnDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{loan.status}</td>
              {user?.role === 'ADMIN' && (
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleRenew(loan.loanId, loan.status)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Renovar
                  </button>
                  <button
                    onClick={() => handleReturn(loan.loanId)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Devolver
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoansTable;
