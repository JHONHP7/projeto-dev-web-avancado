import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BookDetails, User, BookResponse, LoanResponse } from '../../interfaces/interfaces';

const CreateLoan = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [books, setBooks] = useState<BookDetails[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [allBooks, setAllBooks] = useState<BookDetails[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState({
    disponivel: true,
    indisponivel: true
  });
  const [currentBookPage, setCurrentBookPage] = useState(1);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (bookTitle) {
        searchBooks();
      } else {
        setBooks([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [bookTitle]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [userName]);

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
      
      const convertedBooks: BookDetails[] = data.map(book => ({
        id: book.bookId,
        titulo: book.bookTitle,
        autor: book.bookAuthor,
        disponivel: book.bookAvailable,
        quantidadeExemplares: book.bookQuantity,
        dataPublicacao: ''
      }));

      setBooks(convertedBooks);
      setCurrentBookPage(1);
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
      setCurrentUserPage(1);
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

  const filteredBooks = (books.length > 0 ? books : allBooks).filter(book => {
    if (book.disponivel && !statusFilter.disponivel) return false;
    if (!book.disponivel && !statusFilter.indisponivel) return false;
    return true;
  });

  const indexOfLastBook = currentBookPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalBookPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const indexOfLastUser = currentUserPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = (users.length > 0 ? users : allUsers).slice(indexOfFirstUser, indexOfLastUser);
  const totalUserPages = Math.ceil((users.length > 0 ? users : allUsers).length / itemsPerPage);

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Criar Empréstimo</h1>
        <button
          onClick={() => navigate('/loans')}
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar
        </button>
      </div>
      
      <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Buscar Livro</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Digite o título do livro"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="border p-2 md:p-3 rounded-lg flex-1 text-base md:text-lg w-full"
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={statusFilter.disponivel}
              onChange={e => setStatusFilter(prev => ({...prev, disponivel: e.target.checked}))}
              className="form-checkbox h-4 w-4 md:h-5 md:w-5 text-blue-600"
            />
            <span>Disponíveis</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={statusFilter.indisponivel}
              onChange={e => setStatusFilter(prev => ({...prev, indisponivel: e.target.checked}))}
              className="form-checkbox h-4 w-4 md:h-5 md:w-5 text-blue-600"
            />
            <span>Indisponíveis</span>
          </label>
        </div>

        <h3 className="text-lg md:text-xl font-medium mb-4">Livros Disponíveis</h3>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Título</th>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Autor</th>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Exemplares</th>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentBooks.map((book) => (
                    <tr key={book.id} className={`${selectedBookId === book.id ? 'bg-blue-50' : ''}`}>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm">{book.titulo}</td>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm">{book.autor}</td>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm">{book.quantidadeExemplares}</td>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                        <span className={book.disponivel ? 'text-green-600' : 'text-red-600'}>
                          {book.disponivel ? 'Disponível' : 'Indisponível'}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-2">
                        <button
                          onClick={() => setSelectedBookId(book.id)}
                          disabled={!book.disponivel}
                          className={`text-xs md:text-sm py-1 px-2 md:px-3 rounded ${
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
        </div>
        
        {totalBookPages > 1 && (
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <button
              onClick={() => setCurrentBookPage(prev => Math.max(prev - 1, 1))}
              disabled={currentBookPage === 1}
              className="px-2 md:px-3 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-2 md:px-3 py-1 text-sm">
              Página {currentBookPage} de {totalBookPages}
            </span>
            <button
              onClick={() => setCurrentBookPage(prev => Math.min(prev + 1, totalBookPages))}
              disabled={currentBookPage === totalBookPages}
              className="px-2 md:px-3 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Buscar Usuário</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Digite o e-mail do usuário"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2 md:p-3 rounded-lg flex-1 text-base md:text-lg w-full"
          />
        </div>

        <h3 className="text-lg md:text-xl font-medium mb-4">Usuários Disponíveis</h3>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Nome</th>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className={`${selectedUserId === user.id ? 'bg-blue-50' : ''}`}>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm">{user.nome}</td>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm">{user.email}</td>
                      <td className="px-3 md:px-4 py-2">
                        <button
                          onClick={() => setSelectedUserId(user.id)}
                          className={`text-xs md:text-sm py-1 px-2 md:px-3 rounded ${
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
        </div>
        
        {totalUserPages > 1 && (
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <button
              onClick={() => setCurrentUserPage(prev => Math.max(prev - 1, 1))}
              disabled={currentUserPage === 1}
              className="px-2 md:px-3 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-2 md:px-3 py-1 text-sm">
              Página {currentUserPage} de {totalUserPages}
            </span>
            <button
              onClick={() => setCurrentUserPage(prev => Math.min(prev + 1, totalUserPages))}
              disabled={currentUserPage === totalUserPages}
              className="px-2 md:px-3 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      <button
        onClick={createLoan}
        disabled={!selectedBookId || !selectedUserId}
        className={`w-full py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-colors ${
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