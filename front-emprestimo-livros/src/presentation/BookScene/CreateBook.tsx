// src/presentation/BookScene/CreateBook.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookCreate {
  titulo: string;
  autor: string;
  isbn: string;
  disponivel: boolean;
  quantidadeExemplares: number;
  dataPublicacao: string;
}

const CreateBook = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [book, setBook] = useState<BookCreate>({
    titulo: '',
    autor: '',
    isbn: '',
    disponivel: true,
    quantidadeExemplares: 0,
    dataPublicacao: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/books/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar livro');
      }

      navigate('/books');
    } catch (error) {
      setError('Erro ao salvar livro. Por favor, tente novamente.');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="w-screen h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Novo Livro</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="titulo"
            value={book.titulo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Autor</label>
          <input
            type="text"
            name="autor"
            value={book.autor}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="disponivel"
              checked={book.disponivel}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600"
            />
            <span className="ml-2">Disponível</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade de Exemplares</label>
          <input
            type="number"
            name="quantidadeExemplares"
            value={book.quantidadeExemplares}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Publicação</label>
          <input
            type="date"
            name="dataPublicacao"
            value={book.dataPublicacao}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;