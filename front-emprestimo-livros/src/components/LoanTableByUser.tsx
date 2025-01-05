import { useState, useEffect } from 'react';
import { LoanByUser } from '../interfaces/interfaces';
import { renewLoan } from '../service/api/index';
import Swal from 'sweetalert2';

const ITEMS_PER_PAGE = 10;

interface LoansTableProps {
  loans: LoanByUser[];
  userId: number;
  onLoansUpdate: () => void;
  filter: 'all' | 'emprestado' | 'devolvido';
}

const LoanTableByUser: React.FC<LoansTableProps> = ({ 
  loans: initialLoans, 
  onLoansUpdate,
  filter 
}) => {
  const [filteredLoans, setFilteredLoans] = useState<LoanByUser[]>(initialLoans);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Apply filter whenever initialLoans or filter changes
    const filtered = initialLoans.filter(loan => {
      if (filter === 'all') return true;
      return filter === 'emprestado' 
        ? loan.bookStatus === 'Emprestado' 
        : loan.bookStatus === 'Devolvido';
    });

    // Sort loans to show emprestados first
    const sorted = filtered.sort((a, b) => {
      if (a.bookStatus === 'Emprestado' && b.bookStatus === 'Devolvido') return -1;
      if (a.bookStatus === 'Devolvido' && b.bookStatus === 'Emprestado') return 1;
      return 0;
    });

    setFilteredLoans(sorted);
  }, [initialLoans, filter]);

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const handleRenew = async (loanId: number, status: string) => {
    if (status === "Devolvido") {
      Swal.fire({
        title: 'Operação não permitida',
        text: 'Empréstimo já foi devolvido, não pode ser renovado!',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    try {
      await renewLoan(loanId);
      await Swal.fire({
        title: 'Sucesso!',
        text: 'Empréstimo renovado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      onLoansUpdate();
    } catch (error) {
      console.error('Erro ao renovar empréstimo:', error);
      Swal.fire({
        title: 'Erro!',
        text: error instanceof Error ? error.message : 'Erro ao renovar empréstimo',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredLoans.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLoans = filteredLoans.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Livro</th>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Data de Devolução</th>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Renovações</th>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Status</th>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentLoans.map((loan) => (
              <tr key={loan.loanId}>
                <td className="px-6 py-4 whitespace-nowrap">{loan.bookTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{parseDate(loan.dtDevolucao.toString()).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.nrRenovacoes}/2</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.bookStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleRenew(loan.loanId, loan.bookStatus)}
                    className={`px-4 py-2 rounded-lg transition-colors ${loan.nrRenovacoes >= 2 || loan.bookStatus !== 'Emprestado' ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    disabled={loan.nrRenovacoes >= 2 || loan.bookStatus !== 'Emprestado'}
                  >
                    Renovar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <span className="text-sm text-gray-700">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredLoans.length)} de {filteredLoans.length} empréstimos
        </span>
        
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Anterior
          </button>
          
          <span className="px-3 py-1">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanTableByUser;