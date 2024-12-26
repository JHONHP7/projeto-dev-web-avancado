import { API_CONFIG } from './config';

interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  disponivel: boolean;
  quantidadeExemplares: number;
  dataPublicacao: string;
}

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/books`, {
      method: 'GET',
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

export const createBook = async (bookData: Omit<Book, 'id'>): Promise<Book> => {
  try {
    // Formatar a data de publicação no formato DD-MM-YYYY
    const [year, month, day] = bookData.dataPublicacao.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    const updatedBook = { ...bookData, dataPublicacao: formattedDate };

    const response = await fetch(`${API_CONFIG.BASE_URL}/books/save`, {
      method: 'POST',
      headers: API_CONFIG.getAuthHeader(),
      body: JSON.stringify(updatedBook)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar livro');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    throw error;
  }
};

export const updateBook = async (bookData: Book): Promise<Book> => {
  try {
    // Convertendo a data do formato "YYYY-MM-DD" para "DD-MM-YYYY"
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

export const getLoggedUser = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/usuario/logado`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
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

    // Convertendo a data do formato "DD-MM-YYYY" para "YYYY-MM-DD"
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
