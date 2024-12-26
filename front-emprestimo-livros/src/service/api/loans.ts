import { API_CONFIG } from './config';

interface Loan {
  id: number;
  bookId: number;
  userId: number;
  loanDate: string;
  returnDate: string;
  returned: boolean;
}

export const getLoans = async (): Promise<Loan[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/loans`, {
      method: 'GET',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar empréstimos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    throw error;
  }
};

export const createLoan = async (loanData: Omit<Loan, 'id'>): Promise<Loan> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/loans/save`, {
      method: 'POST',
      headers: API_CONFIG.getAuthHeader(),
      body: JSON.stringify(loanData)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar empréstimo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error);
    throw error;
  }
};

export const returnLoan = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/loans/${id}/return`, {
      method: 'PUT',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao devolver livro');
    }
  } catch (error) {
    console.error('Erro ao devolver livro:', error);
    throw error;
  }
};
