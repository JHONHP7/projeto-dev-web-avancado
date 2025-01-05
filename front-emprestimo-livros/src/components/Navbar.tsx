import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../service/api/index';
import { User } from '../interfaces/interfaces';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

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
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <Link to='/content'>
            <div className="rounded">
              <img 
                src="/src/assets/books.png"
                alt="Foto de perfil"
                className="w-12 h-12 rounded-lg"
              />
            </div>
          </Link>
          <Link to="/content/books" className="text-white hover:text-gray-200">
            Livros
          </Link>
          {user && user.role === 'ADMIN' && (
            <>
              <Link to="/content/loans" className="text-white hover:text-gray-200">
                Empréstimos
              </Link>
              <Link to="/content/users" className="text-white hover:text-gray-200">
                Usuários
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/content/profile" className="text-white hover:text-gray-200">
            Meu Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
