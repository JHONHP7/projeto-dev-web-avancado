import { API_CONFIG } from './config';

interface UserProfile {
  id: number;
  nome: string;
  email: string;
  role: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
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

export const updateUserProfile = async (userData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/update`, {
      method: 'PUT',
      headers: API_CONFIG.getAuthHeader(),
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

export const deleteUserProfile = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar usuário');
    }
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};
