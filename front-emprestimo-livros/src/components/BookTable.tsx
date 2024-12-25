// src/components/BookTable.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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

interface BookTableProps {
  books: Book[];
  user: User | null;
}

const BookTable: React.FC<BookTableProps> = ({ books, user }) => {
  const navigate = useNavigate();
  const [favoriteBooks, setFavoriteBooks] = useState<number[]>([]);

  const toggleFavorite = async (bookId: number) => {
    if (!user) return;

    try {
      if (favoriteBooks.includes(bookId)) {
        // Desfavoritar
        const response = await fetch(`http://localhost:8080/favorites/delete/favorite/${user.id}/${bookId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.ok) {
          setFavoriteBooks(prev => prev.filter(id => id !== bookId));
        }
      } else {
        // Favoritar
        const response = await fetch('http://localhost:8080/favorites/add', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idUsuario: user.id,
            idLivro: bookId
          })
        });

        if (response.ok) {
          setFavoriteBooks(prev => [...prev, bookId]);
        }
      }
    } catch (error) {
      console.error('Erro ao gerenciar favoritos:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Publicação</th>
            {user?.role === 'USER' && (
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Favorito</th>
            )}
            {user?.role === 'ADMIN' && (
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            )}
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
              <td className="px-6 py-4 whitespace-nowrap">{book.dataPublicacao}</td>
              {user?.role === 'USER' && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="text-yellow-500 hover:text-yellow-600 text-xl"
                  >
                    {favoriteBooks.includes(book.id) ? <AiFillStar /> : <AiOutlineStar />}
                  </button>
                </td>
              )}
              {user?.role === 'ADMIN' && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/books/update/${book.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Editar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
