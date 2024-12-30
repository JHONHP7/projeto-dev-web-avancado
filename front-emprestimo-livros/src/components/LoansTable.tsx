import { LoansTableProps } from '../interfaces/interfaces';

const LoansTable: React.FC<LoansTableProps> = ({ loans, user, handleRenew, handleReturn }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="block lg:hidden">
              {loans.map((loan) => (
                <div key={loan.loanId} className="bg-white p-4 mb-4 border rounded-lg shadow-sm">
                  <div className="space-y-1 text-sm">
                    <h3 className="font-bold">Livro: {loan.bookName}</h3>
                    <p>Usuário: {loan.userName}</p>
                    <p>Data de Empréstimo: {loan.loanDate}</p>
                    <p>Data de Devolução: {loan.returnDate}</p>
                    <p>Status: {loan.status}</p>
                  </div>
                  {user?.role === 'ADMIN' && (
                    <div className="mt-4 space-x-2">
                      <button
                        onClick={() => handleRenew(loan.loanId, loan.status)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                      >
                        Renovar
                      </button>
                      <button
                        onClick={() => handleReturn(loan.loanId)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                      >
                        Devolver
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <table className="min-w-full hidden lg:table">
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
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.loanId}>
                    <td className="px-6 py-4 whitespace-nowrap">{loan.bookName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loan.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loan.loanDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loan.returnDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loan.status}</td>
                    {user?.role === 'ADMIN' && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleRenew(loan.loanId, loan.status)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
                        >
                          Renovar
                        </button>
                        <button
                          onClick={() => handleReturn(loan.loanId)}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
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
        </div>
      </div>
    </div>
  );
};

export default LoansTable;
