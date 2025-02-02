import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../hooks/useAuth';

const MainLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
    const { user, logout, getCurrentUser } = useAuth();
  
    useEffect(() => {
      (async () => {
        const userData = await getCurrentUser();

        if (!userData) {
          navigate('/');
        }
      })();
    }, []);
  
    const handleLogout = () => {
      logout();
      navigate('/');
    };
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      {pathname === '/content' ? (
        <div>
            <div className="container mx-auto mt-8 gap-4 p-4 text-black">
              <h1 className="text-4xl font-bold mb-2">Bem-vindo(a) à nossa biblioteca!</h1>
              <p className="text-lg font-medium leading-relaxed">
                Tem interesse em algum livro da biblioteca? Venha conferir! <br />
                Aqui você poderá procurar livros, fazer reservas e fazer devoluções.
              </p>
            </div>
      
            {user && user.role !== 'ADMIN' ? (
              <div className="container mx-auto mt-8 flex flex-col items-center gap-4 p-4">
                <Link to="/content/books" className="w-full sm:w-1/2 md:w-1/3">
                  <div className="bg-blue-200 hover:bg-blue-300 rounded-lg p-8 flex items-center justify-center text-blue-800 font-bold text-lg cursor-pointer shadow-md">
                    📚 Livros
                  </div>
                </Link>
                <Link to="/content/profile" className="w-full sm:w-1/2 md:w-1/3">
                  <div className="bg-yellow-200 hover:bg-yellow-300 rounded-lg p-8 flex items-center justify-center text-yellow-800 font-bold text-lg cursor-pointer shadow-md">
                    👤 Meu Perfil
                  </div>
                </Link>
                <div
                  onClick={handleLogout}
                  className="w-full sm:w-1/2 md:w-1/3 bg-red-200 hover:bg-red-300 rounded-lg p-8 flex items-center justify-center text-red-800 font-bold text-lg cursor-pointer shadow-md"
                >
                  🚪 Sair
                </div>
              </div>
            ) : (
              <div className="container mx-auto mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                <Link to="/content/books">
                  <div className="bg-blue-200 hover:bg-blue-300 rounded-lg p-8 flex items-center justify-center text-blue-800 font-bold text-lg cursor-pointer shadow-md">
                    📚 Livros
                  </div>
                </Link>
                <Link to="/content/loans">
                  <div className="bg-green-200 hover:bg-green-300 rounded-lg p-8 flex items-center justify-center text-green-800 font-bold text-lg cursor-pointer shadow-md">
                    💼 Empréstimos
                  </div>
                </Link>
                <Link to="/content/profile">
                  <div className="bg-yellow-200 hover:bg-yellow-300 rounded-lg p-8 flex items-center justify-center text-yellow-800 font-bold text-lg cursor-pointer shadow-md">
                    👤 Meu Perfil
                  </div>
                </Link>
                <Link to="/content/users">
                  <div className="bg-purple-200 hover:bg-purple-300 rounded-lg p-8 flex items-center justify-center text-purple-800 font-bold text-lg cursor-pointer shadow-md">
                    👥 Usuários
                  </div>
                </Link>
                <div
                  onClick={handleLogout}
                  className="bg-red-200 hover:bg-red-300 rounded-lg p-8 flex items-center justify-center text-red-800 font-bold text-lg cursor-pointer shadow-md"
                >
                  🚪 Sair
                </div>
              </div>
            )}
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default MainLayout;
