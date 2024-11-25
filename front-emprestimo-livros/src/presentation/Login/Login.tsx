import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
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
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 p-8 rounded-lg shadow-lg w-96 mx-auto mt-24 bg-white">
      <h2 className="text-2xl font-semibold mb-6">Entrar</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="CPF" 
          value={cpf}
          onChange={handleCpfChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Logar
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      <a 
        href="#" 
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        Não tem conta? Faça seu cadastro aqui
      </a>
    </div>
  );
};

export default Login;
