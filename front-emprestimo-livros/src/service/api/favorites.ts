import { API_CONFIG } from './config';

interface Favorite {
  id: number;
  userId: number;
  bookId: number;
}

export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites`, {
      method: 'GET',
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

export const addFavorite = async (bookId: number): Promise<Favorite> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/add/${bookId}`, {
      method: 'POST',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar favorito');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    throw error;
  }
};

export const removeFavorite = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/remove/${bookId}`, {
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

export const checkIsFavorite = async (bookId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/check/${bookId}`, {
      method: 'GET',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao verificar favorito');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    throw error;
  }
};
