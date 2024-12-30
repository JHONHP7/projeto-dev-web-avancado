// src/components/BookTable.tsx
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { BookTableProps } from '../interfaces/interfaces';
import { deleteBookById } from '../service/api/books';
import { addFavoriteBook, getFavoriteBooks, removeFavoriteBook } from '../service/api/index';


const BookTable: React.FC<BookTableProps> = ({ books, user }) => {
  const navigate = useNavigate();
  const [favoriteBooks, setFavoriteBooks] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const [selectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const data = await getFavoriteBooks(user.id);
        const favoriteIds = data.books.map(book => book.bookId);
        setFavoriteBooks(favoriteIds);
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
        await removeFavoriteBook(user.id, bookId);
        setFavoriteBooks(prev => prev.filter(id => id !== bookId));
      } else {
        await addFavoriteBook(user.id, bookId);
        setFavoriteBooks(prev => [...prev, bookId]);
      }
    } catch (error) {
      console.error('Erro ao gerenciar favoritos:', error);
    }
  };

  const filteredBooks = showOnlyFavorites && user?.role === 'USER'
    ? books.filter(book => favoriteBooks.includes(book.id))
    : books.filter(book => !selectedGenre || book.genero === selectedGenre);

  const displayedBooks = showOnlyFavorites
    ? filteredBooks
    : filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  const totalPages = showOnlyFavorites
    ? Math.ceil(filteredBooks.length / booksPerPage)
    : Math.ceil(filteredBooks.length / booksPerPage);

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter esta ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await deleteBookById(id);
        await Swal.fire(
          'Deletado!',
          'O livro foi deletado com sucesso.',
          'success'
        );
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      Swal.fire(
        'Erro!',
        'Não foi possível deletar o livro.',
        'error'
      );
    }
  };

  return (
    <div className="w-full">
      {user?.role === 'USER' && (
        <div className="mb-4 px-4">
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

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="block lg:hidden">
              {displayedBooks.map((book) => (
                <div key={book.id} className="bg-white p-4 mb-4 border rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold">{book.titulo}</h3>
                      <p className="text-sm text-gray-600">Autor: {book.autor}</p>
                    </div>
                    {user?.role === 'USER' && (
                      <button
                        onClick={() => toggleFavorite(book.id)}
                        className="text-2xl"
                      >
                        {favoriteBooks.includes(book.id) ?
                          <AiFillStar className="text-yellow-400" /> :
                          <AiOutlineStar className="text-gray-400" />
                        }
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>ISBN: {book.isbn}</p>
                    <p>Status: <span className={book.disponivel ? "text-green-600" : "text-red-600"}>
                      {book.disponivel ? "Disponível" : "Indisponível"}
                    </span></p>
                    <p>Quantidade: {book.quantidadeExemplares}</p>
                    <p>Data de Publicação: {book.dataPublicacao}</p>
                  </div>
                  {user?.role === 'ADMIN' && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/books/update/${book.id}`)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <table className="min-w-full hidden lg:table">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                  <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                  <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Publicação</th>
                  <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</th>
                  {user?.role === 'USER' && (
                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Favorito</th>
                  )}
                  {user?.role === 'ADMIN' && (
                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
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
                    <td className="px-6 py-4 whitespace-nowrap">{book.genero}</td>
                    {user?.role === 'USER' && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => toggleFavorite(book.id)}
                          className="text-2xl transition-transform duration-200 ease-in-out hover:scale-110"
                        >
                          {favoriteBooks.includes(book.id) ?
                            <AiFillStar className="text-yellow-400" /> :
                            <AiOutlineStar className="text-gray-400" />
                          }
                        </button>
                      </td>
                    )}
                    {user?.role === 'ADMIN' && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/books/update/${book.id}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {!showOnlyFavorites && totalPages > 1 && (
        <div className="flex justify-center mt-4 flex-wrap gap-2 px-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded min-w-[2.5rem] ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
