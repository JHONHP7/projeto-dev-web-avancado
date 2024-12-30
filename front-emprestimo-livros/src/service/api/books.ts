import { API_CONFIG } from './config';
import { BookResponse, Book, FavoriteResponse } from '../../interfaces/interfaces';

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/books`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export const getFavoriteBooks = async (userId: number): Promise<FavoriteResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/usuario/${userId}`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar favoritos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    throw error;
  }
};

export const addFavoriteBook = async (userId: number, bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/add`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario: userId,
        idLivro: bookId
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar favorito');
    }
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    throw error;
  }
};

export const removeFavoriteBook = async (userId: number, bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/delete/favorite/${userId}/${bookId}`, {
      method: 'DELETE',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao remover favorito');
    }
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    throw error;
  }
};

export const getBookById = async (id: number): Promise<Book> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/books/${id}`, {
      method: 'GET',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar livro');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    throw error;
  }
};

export const createBook = async (bookData: Omit<Book, 'id' | 'isbn'>): Promise<Book> => {
  try {
    // Reformatando a data para o formato dd-MM-yyyy
    const [year, month, day] = bookData.dataPublicacao.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    const updatedBook = { ...bookData, dataPublicacao: formattedDate, isbn: '' }; // Adicionando o campo isbn como vazio

    const token = localStorage.getItem('token');

    // Enviando a requisição POST
    const response = await fetch(`${API_CONFIG.BASE_URL}/books/save`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar livro');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao salvar livro:', error);
    throw error;
  }
}

export const updateBook = async (bookData: Book): Promise<Book> => {
  try {
    /** Convertendo a data do formato "YYYY-MM-DD" para "DD-MM-YYYY" */
    const [year, month, day] = bookData.dataPublicacao.split('-');
    const formattedDateForSubmit = `${day}-${month}-${year}`;

    const bookToSubmit = {
      ...bookData,
      dataPublicacao: formattedDateForSubmit
    };

    const response = await fetch(`${API_CONFIG.BASE_URL}/books/update`, {
      method: 'PUT',
      headers: API_CONFIG.getAuthHeader(),
      body: JSON.stringify(bookToSubmit)
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar livro');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    throw error;
  }
};

export const deleteBook = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar livro');
    }
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    throw error;
  }
};

export const getBookByIdForUpdate = async (id: number): Promise<Book> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/books/${id}`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar livro');
    }

    const data = await response.json();
    /**
     * Convertendo a data do formato "DD-MM-YYYY" para "YYYY-MM-DD"
     */
    const [day, month, year] = data.publicationDate.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    return {
      id: data.bookId,
      titulo: data.bookTitle,
      autor: data.bookAuthor,
      isbn: data.bookIsbn,
      disponivel: data.bookAvailable,
      quantidadeExemplares: data.bookQuantity,
      dataPublicacao: formattedDate,
    };
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    throw error;
  }
};

export const searchBooksByTitle = async (title: string): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/books/title`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar livros');
    }

    const data: BookResponse[] = await response.json();
    return data.map(book => ({
      id: book.bookId,
      titulo: book.bookTitle,
      autor: book.bookAuthor,
      disponivel: book.bookAvailable,
      quantidadeExemplares: book.bookQuantity,
      dataPublicacao: '',
      isbn: ''
    }));
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export const deleteBookById = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/books/delete`, {
      method: 'DELETE',
      headers: {
        ...API_CONFIG.getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar livro');
    }
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    throw error;
  }
};
