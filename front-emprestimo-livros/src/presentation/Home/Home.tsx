import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const Home = () => {
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
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link to="/books" className="text-white hover:text-gray-200">
              Livros
            </Link>
            {user && user.role === 'ADMIN' && (
              <Link to="/loans" className="text-white hover:text-gray-200">
                Empréstimos
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-white hover:text-gray-200">
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

export default Home;
