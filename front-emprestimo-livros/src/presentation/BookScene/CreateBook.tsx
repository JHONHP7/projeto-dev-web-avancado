import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { createBook } from "../../service/api/books";

const CreateBook = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [book, setBook] = useState({
    titulo: '',
    autor: '',
    disponivel: true,
    quantidadeExemplares: 0,
    dataPublicacao: '',
    genero: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'checkbox' ? e.target.checked :
                         type === 'number' ? Number(value) :
                         value;

    setBook(prev => ({
      ...prev,
      [name]: updatedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBook = { 
      titulo: book.titulo,
      autor: book.autor,
      disponivel: book.disponivel,
      quantidadeExemplares: book.quantidadeExemplares,
      dataPublicacao: book.dataPublicacao,
      genero: book.genero
    };

    try {
      await createBook(updatedBook);

      await Swal.fire({
        title: 'Sucesso!',
        text: 'Livro cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

      navigate('/books');
    } catch (error) {
      setError('Erro ao salvar livro. Por favor, tente novamente.');
      console.error('Erro:', error);

      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao salvar livro. Por favor, tente novamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Cadastrar Novo Livro</h2>
          <button
            onClick={() => navigate('/books')}
            className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Voltar
          </button>
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="titulo"
                value={book.titulo}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
              <input
                type="text"
                name="autor"
                value={book.autor}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Exemplares</label>
              <input
                type="number"
                name="quantidadeExemplares"
                value={book.quantidadeExemplares}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
              <input
                type="date"
                name="dataPublicacao"
                value={book.dataPublicacao}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="disponivel"
                  checked={book.disponivel}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                />
                <span className="text-sm font-medium text-gray-700">Disponível</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
              <select
                name="genero"
                value={book.genero}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione um gênero</option>
                <option value="FICCAO">Ficção</option>
                <option value="NAO_FICCAO">Não Ficção</option>
                <option value="ROMANCE">Romance</option>
                <option value="FANTASIA">Fantasia</option>
                <option value="TERROR">Terror</option>
                <option value="SUSPENSE">Suspense</option>
                <option value="BIOGRAFIA">Biografia</option>
                <option value="HISTORIA">História</option>
                <option value="POESIA">Poesia</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;