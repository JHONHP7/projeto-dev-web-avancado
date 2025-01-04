import { API_CONFIG } from './config';
import { User, UserCreate, UserDeleteResponse, UsersGetAllResponse } from '../../interfaces/interfaces';

export const searchUsersByEmail = async (email: string): Promise<User[]> => {
  try {
    if (!email.trim()) {
      return [];
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/users/email/${email}`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/usuario/logado`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar perfil do usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/update`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar perfil do usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    throw error;
  }
};

export const deleteUserProfile = async (id: number): Promise<UserDeleteResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

export const createUser = async (userData: UserCreate): Promise<{ message: string; success: boolean }> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<UsersGetAllResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao listar usuários');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/${id}`, {
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar usuário por ID');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
};