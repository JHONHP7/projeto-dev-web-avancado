import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../service/api/index';
import { User } from '../interfaces/interfaces';

const Navbar = () => {
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
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 h-full w-64 p-6 flex flex-col space-y-6">
      <h1 className="text-2xl font-bold mb-6">Emprestimos de livros UFF</h1>
      <Link to="/books" className="hover:bg-gray-700 px-4 py-3 rounded transition-colors">
        Home
      </Link>
      <Link to="/books" className="hover:bg-gray-700 px-4 py-3 rounded transition-colors">
        List Books
      </Link>
      {user?.role === 'ADMIN' && (
        <Link to="/loans" className="hover:bg-gray-700 px-4 py-3 rounded transition-colors">
          List Loans
        </Link>
      )}
      <Link to="/profile" className="hover:bg-gray-700 px-4 py-3 rounded transition-colors">
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 px-4 py-3 rounded transition-colors text-white"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
