// src/components/BookTable.tsx
import { useState, useEffect } from "react";
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

const BookTable: React.FC<BookTableProps> = ({ books, user }) => {
  const navigate = useNavigate();
  const [favoriteBooks, setFavoriteBooks] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const response = await fetch(`http://localhost:8080/favorites/usuario/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.ok) {
          const data: FavoriteResponse = await response.json();
          const favoriteIds = data.books.map(book => book.bookId);
          setFavoriteBooks(favoriteIds);
        }
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    };

    fetchFavorites();
  }, [user]);

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

  const filteredBooks = showOnlyFavorites && user?.role === 'USER' 
    ? books.filter(book => favoriteBooks.includes(book.id))
    : books;

  const displayedBooks = showOnlyFavorites 
    ? filteredBooks 
    : filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  const totalPages = showOnlyFavorites 
    ? Math.ceil(filteredBooks.length / booksPerPage)
    : Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="overflow-x-auto">
      {user?.role === 'USER' && (
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showOnlyFavorites}
              onChange={(e) => {
                setShowOnlyFavorites(e.target.checked);
                setCurrentPage(1);
              }}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Favoritos</span>
          </label>
        </div>
      )}
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
          {displayedBooks.map((book) => (
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
                    className="text-2xl transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none"
                  >
                    {favoriteBooks.includes(book.id) ? 
                      <AiFillStar className="text-yellow-400 drop-shadow-lg hover:text-yellow-500" /> : 
                      <AiOutlineStar className="text-gray-400 hover:text-yellow-400" />
                    }
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
      {!showOnlyFavorites && totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookTable;
