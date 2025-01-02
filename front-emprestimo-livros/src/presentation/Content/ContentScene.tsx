import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const ContentScene = () => {
  const navigate = useNavigate();
  const { user, logout, getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <Link to="/" className="block rounded-lg overflow-hidden cursor-pointer">
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
              <Link to="/content/loans" className="text-white hover:text-gray-200">
                Empréstimos
              </Link>
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
      <Outlet />
    </div>
  );
};

export default ContentScene;