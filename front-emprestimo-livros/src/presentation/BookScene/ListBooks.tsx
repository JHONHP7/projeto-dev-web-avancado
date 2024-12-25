// src/presentation/BookScene/ListBooks.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookTable from "../../components/BookTable";

interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  disponivel: boolean;
  quantidadeExemplares: number;
  dataPublicacao: string;
}

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

const ListBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState({
    disponivel: true,
    indisponivel: true
  });
  const [searchTerm, setSearchTerm] = useState({
    titulo: '',
    autor: ''
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

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/books', {
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
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setError('Erro ao carregar livros. Por favor, tente novamente.');
      }
    };

    fetchUser();
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    if (book.disponivel && !statusFilter.disponivel) return false;
    if (!book.disponivel && !statusFilter.indisponivel) return false;
    
    const matchesTitulo = book.titulo.toLowerCase().includes(searchTerm.titulo.toLowerCase());
    const matchesAutor = book.autor.toLowerCase().includes(searchTerm.autor.toLowerCase());
    
    return matchesTitulo && matchesAutor;
  });

  return (
    <div className="w-screen h-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Lista de Livros</h2>
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => navigate('/books/create')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Novo Livro
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex gap-4">
            <div className="flex items-center w-1/3">
              <label className="w-20">Título:</label>
              <input
                type="text"
                placeholder="Pesquisar por título..."
                value={searchTerm.titulo}
                onChange={e => setSearchTerm(prev => ({...prev, titulo: e.target.value}))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center w-1/3">
              <label className="w-20">Autor:</label>
              <input
                type="text"
                placeholder="Pesquisar por autor..."
                value={searchTerm.autor}
                onChange={e => setSearchTerm(prev => ({...prev, autor: e.target.value}))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={statusFilter.disponivel}
                onChange={e => setStatusFilter(prev => ({...prev, disponivel: e.target.checked}))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Disponíveis</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={statusFilter.indisponivel}
                onChange={e => setStatusFilter(prev => ({...prev, indisponivel: e.target.checked}))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Indisponíveis</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {filteredBooks.length > 0 ? (
          <BookTable books={filteredBooks} user={user} />
        ) : (
          <p className="text-gray-700">Carregando ou nenhum livro disponível...</p>
        )}
      </div>
    </div>
  );
};

export default ListBooks;
