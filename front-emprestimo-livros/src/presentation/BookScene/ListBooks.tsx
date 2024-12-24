// src/presentation/BookScene/ListBooks.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  disponivel: boolean;
  quantidadeExemplares: number;
  dataPublicacao: string;
}

const ListBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
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

    fetchBooks();
  }, []);

  return (
    <div className="w-screen h-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Lista de Livros</h2>
          <button
            onClick={() => navigate('/books/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Novo Livro
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {books.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Publicação</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{book.titulo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.autor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={book.disponivel ? "text-green-600" : "text-red-600"}>
                        {book.disponivel ? "Disponível" : "Indisponível"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.quantidadeExemplares}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(book.dataPublicacao).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/books/update/${book.id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-700">Carregando ou nenhum livro disponível...</p>
        )}
      </div>
    </div>
  );
};

export default ListBooks;