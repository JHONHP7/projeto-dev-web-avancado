import Swal from 'sweetalert2';
import { removeFavorite } from '../service/api';
import { FavoriteTableProps } from '../interfaces/interfaces';

const FavoriteTable = ({ favoritesList }: FavoriteTableProps) => {
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Livro</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Autor</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Disponível</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {favoritesList.books.map((book) => (
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
  );
};

export default FavoriteTable;
