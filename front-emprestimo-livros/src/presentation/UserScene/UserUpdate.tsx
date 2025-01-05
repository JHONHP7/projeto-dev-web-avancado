import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { updateUserProfile, getUserById } from "../../service/api/users";
import { UserUpdateRequest, User } from "../../interfaces/interfaces";

const UserUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState<string>('');
    const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
    const [user, setUser] = useState<UserUpdateRequest>({
        id: 0,
        nome: '',
        email: '',
        password: '',
        role: 'USER'
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const response: User = await getUserById(Number(id));
                    setUser({
                        id: response.id,
                        nome: response.nome,
                        email: response.email,
                        password: '',
                        role: response.role
                    });
                } catch (error) {
                    setError('Erro ao carregar os dados do usuário.');
                    console.error('Erro ao buscar usuário:', error);
                }
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser: UserUpdateRequest = { 
            id: user.id,
            nome: user.nome,
            email: user.email,
            password: user.password,
            role: user.role
        };

        try {
            await updateUserProfile(updatedUser);

            await Swal.fire({
                title: 'Sucesso!',
                text: 'Usuário atualizado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });

            navigate('/content/users');
        } catch (error) {
            setError('Erro ao atualizar usuário. Verifique os dados inseridos e tente novamente');
            console.error('Erro:', error);

            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao atualizar usuário. Verifique os dados inseridos e tente novamente',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold">Atualizar Usuário</h2>
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
                        </div>
                    </div>
    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        {showPasswordField && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Digite a nova senha"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        )}
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
                        <button
                            type="button"
                            onClick={() => setShowPasswordField(!showPasswordField)}
                            className="w-full sm:w-auto bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            {showPasswordField ? 'Cancelar Atualização de Senha' : 'Atualizar Senha'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );  
};

export default UserUpdate;
