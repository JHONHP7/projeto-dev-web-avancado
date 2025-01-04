import { useEffect, useState } from 'react';
import FavoriteTable from '../../components/FavoriteTable';
import { useAuth } from '../../hooks/useAuth';
import { getFavoritesByUserId, getLoansByUser } from '../../service/api';
import { FavoriteResponse, LoanByUser } from '../../interfaces/interfaces';
import LoanTableByUser from '../../components/LoanTableByUser';

const UserProfile = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteResponse>({
    userId: 0,
    userName: '',
    books: []
  });
  const [loans, setLoans] = useState<LoanByUser[]>([]);
  const [view, setView] = useState<'favorites' | 'loans'>('favorites');
  const [filter, setFilter] = useState<'all' | 'emprestado' | 'devolvido'>('all');

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const favoritesData = await getFavoritesByUserId(user.id);
          setFavorites(favoritesData);
        } catch (error) {
          console.error('Erro ao buscar favoritos:', error);
        }
      }
    };

    const fetchLoans = async () => {
      if (user) {
        try {
          const loansData = await getLoansByUser(user.id);
          setLoans(loansData);
        } catch (error) {
          console.error('Erro ao buscar empréstimos:', error);
        }
      }
    };

    fetchFavorites();
    fetchLoans();
  }, [user]);

  const handleLoansUpdate = async (newFilter: 'all' | 'emprestado' | 'devolvido' = filter) => {
    if (user) {
      try {
        const loansData = await getLoansByUser(user.id);
        const filteredLoans = loansData.filter(loan => {
          if (newFilter === 'all') return true;
          return newFilter === 'emprestado' ? loan.bookStatus === 'Emprestado' : loan.bookStatus === 'Devolvido';
        });
        setLoans(filteredLoans);
      } catch (error) {
        console.error('Erro ao atualizar empréstimos:', error);
      }
    }
  };

  return (
    <div className="p-8">
      {user && (
        <div className="space-y-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Informações do Usuário</h2>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 hover:scale-105 transition-transform duration-300">
                <img 
                  src="/src/assets/user-profile.svg"
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="hover:bg-blue-100 p-2 rounded-lg transition-colors">
                  <span className="font-semibold text-blue-600">Nome:</span> {user.nome}
                </p>
                <p className="hover:bg-blue-100 p-2 rounded-lg transition-colors">
                  <span className="font-semibold text-blue-600">Email:</span> {user.email}
                </p>
                <p className="hover:bg-blue-100 p-2 rounded-lg transition-colors">
                  <span className="font-semibold text-blue-600">Tipo:</span> {user.role === 'USER' ? 'Aluno' : 'Funcionário da biblioteca'}
                </p>
              </div>
            </div>
          </div>
          
          {user.role === 'USER' && (
            <>
              <div className="flex space-x-4">
                <button
                  onClick={() => setView('favorites')}
                  className={`px-4 py-2 rounded-lg ${view === 'favorites' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Lista de Favoritos
                </button>
                <button
                  onClick={() => setView('loans')}
                  className={`px-4 py-2 rounded-lg ${view === 'loans' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Lista de Empréstimos
                </button>
              </div>
              {view === 'favorites' && (
                <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-600">Livros Favoritos</h2>
                  <FavoriteTable favoritesList={favorites} />
                </div>
              )}
              {view === 'loans' && (
                <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-600">Empréstimos</h2>
                  <div className="flex space-x-4 mb-4">
                    <label>
                      <input
                        type="checkbox"
                        checked={filter === 'emprestado'}
                        onChange={() => setFilter(filter === 'emprestado' ? 'all' : 'emprestado')}
                      />
                      <span className="ml-2">Livros emprestados</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={filter === 'devolvido'}
                        onChange={() => setFilter(filter === 'devolvido' ? 'all' : 'devolvido')}
                      />
                      <span className="ml-2">Livros devolvidos</span>
                    </label>
                  </div>
                  <LoanTableByUser 
                    loans={loans} 
                    userId={user.id} 
                    onLoansUpdate={handleLoansUpdate} 
                    filter={filter}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;