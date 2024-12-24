import { useState } from 'react';

interface Book {
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookAvailable: boolean;
}

interface User {
  id: number;
  nome: string;
  email: string;
}

const CreateLoan = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const searchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/books/title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: bookTitle })
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar livros');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const searchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: userName })
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const createLoan = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/loans/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          idUser: selectedUserId,
          idBook: selectedBookId,
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar empréstimo');
      }

      alert('Empréstimo criado com sucesso!');
      setSelectedBookId(null);
      setSelectedUserId(null);
      setBooks([]);
      setUsers([]);
      setBookTitle('');
      setUserName('');
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Empréstimo</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Buscar Livro</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Digite o título do livro"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button 
            onClick={searchBooks}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {books.map((book) => (
            <div 
              key={book.bookId}
              className={`p-4 border rounded-lg ${selectedBookId === book.bookId ? 'border-blue-500 bg-blue-50' : ''}`}
            >
              <p className="font-semibold">{book.bookTitle}</p>
              <p className="text-gray-600">{book.bookAuthor}</p>
              <p className={book.bookAvailable ? 'text-green-600' : 'text-red-600'}>
                {book.bookAvailable ? 'Disponível' : 'Indisponível'}
              </p>
              <button
                onClick={() => setSelectedBookId(book.bookId)}
                className={`mt-2 px-3 py-1 rounded ${
                  selectedBookId === book.bookId 
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {selectedBookId === book.bookId ? 'Selecionado' : 'Selecionar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Buscar Usuário</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Digite o nome do usuário"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button 
            onClick={searchUsers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {users.map((user) => (
            <div 
              key={user.id}
              className={`p-4 border rounded-lg ${selectedUserId === user.id ? 'border-blue-500 bg-blue-50' : ''}`}
            >
              <p className="font-semibold">{user.nome}</p>
              <p className="text-gray-600">{user.email}</p>
              <button
                onClick={() => setSelectedUserId(user.id)}
                className={`mt-2 px-3 py-1 rounded ${
                  selectedUserId === user.id
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {selectedUserId === user.id ? 'Selecionado' : 'Selecionar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={createLoan}
        disabled={!selectedBookId || !selectedUserId}
        className={`w-full py-2 rounded ${
          selectedBookId && selectedUserId
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Criar Empréstimo
      </button>
    </div>
  );
};

export default CreateLoan;
