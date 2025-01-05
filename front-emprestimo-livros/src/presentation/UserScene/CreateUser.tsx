import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { createUser } from "../../service/api/users";
import { UserCreate } from "../../interfaces/interfaces";

const CreateUser = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [fieldErrors, setFieldErrors] = useState<{ nome?: string, email?: string, senha?: string }>({});
    const [user, setUser] = useState<UserCreate>({
        nome: '',
        email: '',
        senha: '',
        role: 'USER'
    });
    const [showsenha, setShowsenha] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { nome?: string, email?: string, senha?: string } = {};

        if (user.nome.length < 10 || user.nome.length > 30) {
            errors.nome = 'Nome deve ter entre 10 e 30 caracteres.';
        }
        if (user.email.length < 15 || user.email.length > 50) {
            errors.email = 'Email deve ter entre 15 e 50 caracteres.';
        }
        if (user.senha.length < 10 || user.senha.length > 20) {
            errors.senha = 'Senha deve ter entre 10 e 20 caracteres.';
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        try {
            const response = await createUser(user);

            if (response.success) {
                await Swal.fire({
                    title: 'Sucesso!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                navigate('/content/users');
            } else {
                setError(response.message);
                await Swal.fire({
                    title: 'Erro!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Erro ao criar usuário. Verifique os dados inseridos e tente novamente.';
            setError(errorMessage);
            console.error('Erro:', error);

            Swal.fire({
                title: 'Erro!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold">Criar Usuário</h2>
                    <button
                        onClick={() => navigate('/content/users')}
                        className="w-full sm:w-auto bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Voltar
                    </button>
                </div>
    
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
    
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={user.nome}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {fieldErrors.nome && <div className="text-red-500 text-sm">{fieldErrors.nome}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {fieldErrors.email && <div className="text-red-500 text-sm">{fieldErrors.email}</div>}
                        </div>
                    </div>
    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <div className="relative">
                                <input
                                    type={showsenha ? "text" : "password"}
                                    name="senha"
                                    value={user.senha}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowsenha(!showsenha)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showsenha ? "Esconder" : "Mostrar"}
                                </button>
                            </div>
                            {fieldErrors.senha && <div className="text-red-500 text-sm">{fieldErrors.senha}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="USER">Usuário</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                    </div>
    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/content/users')}
                            className="w-full sm:w-auto bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );  
};

export default CreateUser;