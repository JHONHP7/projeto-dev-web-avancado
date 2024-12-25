import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  disponivel: boolean;
  quantidadeExemplares: number;
  dataPublicacao: string;
}

interface BookResponse {
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookAvailable: boolean;
  bookQuantity: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

interface LoanResponse {
  message: string;
  success: boolean;
}

const CreateLoan = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [booksResponse, usersResponse] = await Promise.all([
        fetch('http://localhost:8080/books', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('http://localhost:8080/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (booksResponse.ok) {
        const booksData = await booksResponse.json();
        setAllBooks(booksData);
      }

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        if (usersData.data) {
          setAllUsers(usersData.data);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
    }
  };

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

      const data: BookResponse[] = await response.json();
      
      const convertedBooks: Book[] = data.map(book => ({
        id: book.bookId,
        titulo: book.bookTitle,
        autor: book.bookAuthor,
        isbn: '',
        disponivel: book.bookAvailable,
        quantidadeExemplares: book.bookQuantity,
        dataPublicacao: ''
      }));

      setBooks(convertedBooks);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const searchUsers = async () => {
    try {
      if (!userName.trim()) {
        setUsers(allUsers);
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/users/email/${userName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

      const data: LoanResponse = await response.json();

      if (!data.success) {
        await Swal.fire({
          title: 'Erro!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      await Swal.fire({
        title: 'Sucesso!',
        text: 'Empréstimo criado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });

      setSelectedBookId(null);
      setSelectedUserId(null);
      setBooks([]);
      setUsers([]);
      setBookTitle('');
      setUserName('');
      
      await fetchInitialData();
    } catch (error) {
      await Swal.fire({
        title: 'Erro!',
        text: 'Erro ao criar empréstimo. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      console.error('Erro ao criar empréstimo:', error);
    }
  };

  const handleBookKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchUsers();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Criar Empréstimo</h1>
        <button
          onClick={() => navigate('/loans')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar
        </button>
      </div>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Buscar Livro</h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Digite o título do livro"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            onKeyPress={handleBookKeyPress}
            className="border p-3 rounded-lg flex-1 text-lg"
          />
          <button 
            onClick={searchBooks}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 text-lg"
          >
            Buscar
          </button>
        </div>

        <h3 className="text-xl font-medium mb-4">Livros Disponíveis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Autor</th>
                <th className="px-4 py-2">ISBN</th>
                <th className="px-4 py-2">Exemplares</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {(books.length > 0 ? books : allBooks).map((book) => (
                <tr key={book.id} className={`${selectedBookId === book.id ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-2">{book.titulo}</td>
                  <td className="px-4 py-2">{book.autor}</td>
                  <td className="px-4 py-2">{book.isbn}</td>
                  <td className="px-4 py-2">{book.quantidadeExemplares}</td>
                  <td className="px-4 py-2">
                    <span className={book.disponivel ? 'text-green-600' : 'text-red-600'}>
                      {book.disponivel ? 'Disponível' : 'Indisponível'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedBookId(book.id)}
                      disabled={!book.disponivel}
                      className={`py-1 px-3 rounded ${
                        selectedBookId === book.id 
                          ? 'bg-blue-500 text-white'
                          : book.disponivel 
                            ? 'bg-gray-200 hover:bg-gray-300'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {selectedBookId === book.id ? 'Selecionado' : 'Selecionar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Buscar Usuário</h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Digite o e-mail do usuário"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={handleUserKeyPress}
            className="border p-3 rounded-lg flex-1 text-lg"
          />
          <button 
            onClick={searchUsers}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 text-lg"
          >
            Buscar
          </button>
        </div>

        <h3 className="text-xl font-medium mb-4">Usuários Disponíveis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {(users.length > 0 ? users : allUsers).map((user) => (
                <tr key={user.id} className={`${selectedUserId === user.id ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-2">{user.nome}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedUserId(user.id)}
                      className={`py-1 px-3 rounded ${
                        selectedUserId === user.id
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {selectedUserId === user.id ? 'Selecionado' : 'Selecionar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={createLoan}
        disabled={!selectedBookId || !selectedUserId}
        className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors ${
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
