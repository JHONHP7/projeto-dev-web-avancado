import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoansTable from "../../components/LoansTable";
import Swal from 'sweetalert2';
import { getLoans, renewLoan, returnLoan, getUserProfile} from '../../service/api/index';

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

const LoanScene = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState({
    devolvido: true,
    emprestado: true
  });
  const [searchTerm, setSearchTerm] = useState({
    userName: '',
    bookName: ''
  });

  const loansPerPage = 10;

  const fetchLoans = async () => {
    try {
      const data = await getLoans();
      setLoans(data);
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      setError('Erro ao carregar empréstimos. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUser();
    fetchLoans();
  }, []);

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
      Swal.fire({
        title: 'Sucesso!',
        text: 'Empréstimo renovado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      fetchLoans();
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

  const handleReturn = async (loanId: number) => {
    const result = await Swal.fire({
      title: 'Confirmar devolução',
      text: 'Tem certeza que deseja devolver este empréstimo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, devolver',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    });
    
    if (!result.isConfirmed) {
      return;
    }

    try {
      await returnLoan(loanId);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Empréstimo devolvido com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      fetchLoans();
    } catch (error) {
      console.error('Erro ao devolver empréstimo:', error);
      Swal.fire({
        title: 'Erro!',
        text: error instanceof Error ? error.message : 'Erro ao devolver empréstimo',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  const filteredLoans = loans.filter(loan => {
    if (loan.status === "Devolvido" && !statusFilter.devolvido) return false;
    if (loan.status !== "Devolvido" && !statusFilter.emprestado) return false;
    
    const matchesUserName = loan.userName.toLowerCase().includes(searchTerm.userName.toLowerCase());
    const matchesBookName = loan.bookName.toLowerCase().includes(searchTerm.bookName.toLowerCase());
    
    return matchesUserName && matchesBookName;
  });

  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstLoan, indexOfLastLoan);
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Empréstimos</h2>
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => navigate('/loans/create')}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Novo Empréstimo
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="w-20 whitespace-nowrap">Usuário:</label>
              <input
                type="text"
                placeholder="Pesquisar por usuário..."
                value={searchTerm.userName}
                onChange={e => setSearchTerm(prev => ({...prev, userName: e.target.value}))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="w-20 whitespace-nowrap">Livro:</label>
              <input
                type="text"
                placeholder="Pesquisar por livro..."
                value={searchTerm.bookName}
                onChange={e => setSearchTerm(prev => ({...prev, bookName: e.target.value}))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={statusFilter.devolvido}
                onChange={e => setStatusFilter(prev => ({...prev, devolvido: e.target.checked}))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Devolvidos</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={statusFilter.emprestado}
                onChange={e => setStatusFilter(prev => ({...prev, emprestado: e.target.checked}))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Emprestados</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="text-red-500 mb-4 text-center">
            {error}
          </div>
        )}

        {filteredLoans.length > 0 ? (
          <div className="overflow-x-auto">
            <LoansTable loans={currentLoans} user={user} handleRenew={handleRenew} handleReturn={handleReturn} />
            <div className="flex justify-center mt-6 overflow-x-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded min-w-[2.5rem] ${
                      currentPage === number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center py-8">Carregando ou nenhum empréstimo disponível...</p>
        )}
      </div>
    </div>
  );
};

export default LoanScene;
