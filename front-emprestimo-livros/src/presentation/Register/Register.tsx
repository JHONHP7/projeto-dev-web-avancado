import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Login bem-sucedido, token salvo no localStorage.');
        setError('');
        navigate('/');
      } else {
        setError('Erro na autenticação. Verifique suas credenciais e tente novamente.');
        console.error('Erro na autenticação:', response.statusText);
      }
    } catch (error) {
      setError('Erro de requisição. Tente novamente mais tarde.');
      console.error('Erro de requisição:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleemailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    
    setTimeout(() => {
      fetch('http://localhost:8080/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('token', data.token);
          console.log('Login bem-sucedido com Google!');
          navigate('/');
        })
        .catch((error) => {
          console.error('Erro ao autenticar com Google:', error);
          setError('Erro ao autenticar com Google. Tente novamente.');
        })
        .finally(() => setIsLoading(false));
    }, 200);
  };

  return (
    <GoogleOAuthProvider clientId="1080697336488-lqffnqk5lppnqkionbrnit6ubr0hpam6.apps.googleusercontent.com">
      <div className="flex flex-col items-center justify-center border border-gray-300 p-8 rounded-lg shadow-lg w-96 mx-auto mt-24 bg-white">
        <h2 className="text-2xl font-semibold mb-6">Entrar</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={handleemailChange}
                disabled={isLoading}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="Name"
                placeholder="Nome"
                value={name}
                onChange={handleNameChange}
                disabled={isLoading}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full p-3 bg-black text-white rounded-md hover:bg-gray-900 transition flex items-center justify-center"
            >
                {isLoading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Carregando...
                </div>
                ) : (
                'Logar'
                )}
            </button>
            </form>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            <a
                href="#"
                className="mt-4 text-sm text-black hover:underline"
            >
                Não tem conta? Faça seu cadastro aqui
            </a>
            <div className="mt-6">
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => console.error('Erro ao autenticar com Google')}
                />
            </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
