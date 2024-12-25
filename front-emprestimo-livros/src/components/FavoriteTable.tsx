import Swal from 'sweetalert2';

interface Book {
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookAvailable: boolean;
  bookQuantity: number;
}

interface FavoriteResponse {
  userId: number;
  userName: string;
  books: Book[];
}

interface FavoriteTableProps {
  favoritesList: FavoriteResponse;
}

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
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/favorites/delete/favorite/${favoritesList.userId}/${bookId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao remover favorito');
        }

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
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livro</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponível</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
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
                  className="text-red-600 hover:text-red-800"
                >
                  Remover
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
