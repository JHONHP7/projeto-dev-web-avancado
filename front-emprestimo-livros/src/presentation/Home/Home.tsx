import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = () => {
      logout();
    };
    handleLogout()
  }, [])
  return (
    <div className="w-full min-h-screen">
      <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <div className="rounded">
            <img 
              src="/src/assets/books.png"
              alt="Foto de perfil"
              className="w-12 h-12 rounded-lg"
            />
          </div>
        </div>
      </div>
    </nav>

      <div className="container mx-auto mt-8 gap-4 p-4 text-black">
        <h1 className="text-4xl font-bold mb-2">Bem-vindo(a) à nossa biblioteca!</h1>
        <p className="text-lg font-medium leading-relaxed">
          Tem interesse em algum livro da biblioteca? Venha conferir! <br />
          Aqui você poderá procurar livros, fazer reservas e fazer devoluções.
        </p>
      </div>

      <div className="container mx-auto mt-8 flex flex-col items-center gap-4 p-4">
        <div className="w-full sm:w-1/2 md:w-1/3 bg-gray-100 border border-gray-300 rounded-lg p-8 text-center shadow-md">
          <h2 className="text-2xl font-semibold mb-4">🔒 Faça Login</h2>
          <p className="text-gray-600 mb-4">
            Para acessar todas as funcionalidades, por favor, faça login.
          </p>
          <Link
            to="/login"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
