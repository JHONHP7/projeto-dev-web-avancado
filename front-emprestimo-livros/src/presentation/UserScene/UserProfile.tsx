import { useEffect, useState } from 'react';
import FavoriteTable from '../../components/FavoriteTable';
import { useAuth } from '../../hooks/useAuth';
import { getFavoritesByUserId } from '../../service/api';

interface FavoriteResponse {
  userId: number;
  userName: string;
  books: {
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    bookAvailable: boolean;
    bookQuantity: number;
  }[];
}

const UserProfile = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteResponse>({
    userId: 0,
    userName: '',
    books: []
  });

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

    fetchFavorites();
  }, [user]);

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
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Livros Favoritos</h2>
              <FavoriteTable favoritesList={favorites} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;