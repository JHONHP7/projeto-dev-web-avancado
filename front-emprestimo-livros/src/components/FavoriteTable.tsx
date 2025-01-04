import { useState } from 'react';
import Swal from 'sweetalert2';
import { removeFavorite } from '../service/api';
import { FavoriteTableProps } from '../interfaces/interfaces';

const ITEMS_PER_PAGE = 10;

const FavoriteTable = ({ favoritesList }: FavoriteTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalPages = Math.ceil(favoritesList.books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = favoritesList.books.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleRemoveFavorite = async (bookId: number) => {
    try {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Você deseja remover este livro dos favoritos?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await removeFavorite(favoritesList.userId, bookId);

        await Swal.fire(
          'Removido!',
          'O livro foi removido dos seus favoritos.',
          'success'
        );

        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      await Swal.fire(
        'Erro!',
        'Ocorreu um erro ao remover o livro dos favoritos.',
        'error'
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Livro</th>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Autor</th>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Disponível</th>
              <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentBooks.map((book) => (
              <tr key={book.bookId}>
                <td className="px-6 py-4 whitespace-nowrap">{book.bookTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.bookAuthor}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {book.bookAvailable ? 'Sim' : 'Não'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleRemoveFavorite(book.bookId)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <span className="text-sm text-gray-700">
          Mostrando {startIndex + 1}-{Math.min(endIndex, favoritesList.books.length)} de {favoritesList.books.length} favoritos
        </span>
        
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Anterior
          </button>
          
          <span className="px-3 py-1">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteTable;
