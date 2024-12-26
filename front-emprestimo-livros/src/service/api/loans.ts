import { API_CONFIG } from './config';

interface Loan {
  loanId: number;
  bookId: number;
  userId: number;
  loanDate: string;
  returnDate: string;
  status: string;
  bookName: string;
  userName: string;
}

interface CreateLoanRequest {
  idUser: number;
  idBook: number;
}

interface LoanResponse {
  message: string;
  success: boolean;
}

export const createLoan = async (loanData: CreateLoanRequest): Promise<LoanResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/loans/create`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loanData)
    });

    const data: LoanResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao criar empréstimo');
    }

    return data;
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error);
    throw error;
  }
};

export const getLoans = async (): Promise<Loan[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/loans`, {
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

export const renewLoan = async (loanId: number): Promise<Loan> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/loans/renew/${loanId}`, {
      method: 'PUT',
      headers: API_CONFIG.getAuthHeader()
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao renovar empréstimo');
    }

    return data;
  } catch (error) {
    console.error('Erro ao renovar empréstimo:', error);
    throw error;
  }
};

export const returnLoan = async (loanId: number): Promise<Loan> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/loans/return/${loanId}`, {
      method: 'PUT',
      headers: API_CONFIG.getAuthHeader()
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao devolver empréstimo');
    }

    return data;
  } catch (error) {
    console.error('Erro ao devolver empréstimo:', error);
    throw error;
  }
};
