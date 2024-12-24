import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoansTable from "../../components/LoansTable";
import Swal from 'sweetalert2';

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

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/loans', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      setError('Erro ao carregar empréstimos. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/auth/usuario/logado', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }

        const userData = await response.json();
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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/loans/renew/${loanId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro ao renovar empréstimo');
      }

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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/loans/return/${loanId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro ao devolver empréstimo');
      }

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

  return (
    <div className="w-screen h-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Empréstimos</h2>
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => navigate('/loans/create')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Novo Empréstimo
            </button>
          )}
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {loans.length > 0 ? (
          <LoansTable loans={loans} user={user} handleRenew={handleRenew} handleReturn={handleReturn} />
        ) : (
          <p className="text-gray-700">Carregando ou nenhum empréstimo disponível...</p>
        )}
      </div>
    </div>
  );
};

export default LoanScene;
