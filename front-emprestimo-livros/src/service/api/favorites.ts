import { API_CONFIG } from './config';
import { UserFavorites } from '../../interfaces/interfaces';

export const getFavoritesByUserId = async (userId: number): Promise<UserFavorites> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/usuario/${userId}`, {
      method: 'GET',
      headers: API_CONFIG.getAuthHeader()
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar favoritos do usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar favoritos do usuário:', error);
    throw error;
  }
};

export const addFavorite = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/favorites/add`, {
      method: 'POST',
      headers: API_CONFIG.getAuthHeader(),
      body: JSON.stringify({
        idUsuario: 0,
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

export const removeFavorite = async (userId: number, bookId: number): Promise<void> => {
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
