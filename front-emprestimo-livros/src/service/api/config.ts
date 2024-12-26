export const API_CONFIG = {
    BASE_URL: 'http://localhost:8080',
    getAuthHeader: () => {
      const token = localStorage.getItem('token');
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
  };