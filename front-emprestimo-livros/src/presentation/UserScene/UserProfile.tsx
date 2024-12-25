import { useState, useEffect } from 'react';
import FavoriteTable from '../../components/FavoriteTable';

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

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
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteResponse>({
    userId: 0,
    userName: '',
    books: []
  });

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
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:8080/favorites/usuario/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Erro ao buscar favoritos');
          }

          const favoritesData = await response.json();
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
      <h1 className="text-3xl font-bold mb-8">Perfil do Usuário</h1>
      {user && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Informações do Usuário</h2>
            <div className="space-y-4">
              <p><span className="font-semibold">Nome:</span> {user.nome}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Tipo:</span> {user.role}</p>
            </div>
          </div>
          
          {user.role === 'USER' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Livros Favoritos</h2>
              <FavoriteTable favoritesList={favorites} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;