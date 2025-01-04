import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../../components/UsersTable';
import { getAllUsers, deleteUserProfile } from '../../service/api/index';
import { UsersGetAllResponse, UserResponse } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

const UsersList: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response: UsersGetAllResponse = await getAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setError('Erro ao carregar usuários. Por favor, tente novamente.');
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const term = searchTerm.toLowerCase();
        return user.nome.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
    });

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleEdit = (id: number) => {
        navigate(`/edit-user/${id}`);
    };

    const handleDelete = async (id: number): Promise<{ message: string; success: boolean; }> => {
        try {
            const response = await deleteUserProfile(id);
            if (response.success) {
                setUsers(users.filter(user => user.id !== id));
                await Swal.fire(
                    'Deletado!',
                    'O usuário foi deletado com sucesso.',
                    'success'
                );
            } else {
                console.error('Erro ao deletar usuário:', response.message);
                Swal.fire(
                    'Erro!',
                    response.message,
                    'error'
                );
            }
            return response;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            Swal.fire(
                'Erro!',
                'Não foi possível deletar o usuário.',
                'error'
            );
            throw error;
        }
    };

    const handleCreate = () => {
        navigate('/create-user');
    };

    return (
        <div className="w-full min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Lista de Usuários</h2>
                    <button
                        onClick={handleCreate}
                        className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Criar Novo Usuário
                    </button>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou email..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && (
                    <div className="text-red-500 mb-4">
                        {error}
                    </div>
                )}

                <div className="overflow-x-auto">
                    {filteredUsers.length > 0 ? (
                        <>
                            <UsersTable
                                users={currentUsers}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                            <div className="flex justify-center mt-6 overflow-x-auto">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`px-3 py-1 rounded min-w-[2.5rem] ${
                                                currentPage === number
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-700">Carregando ou nenhum usuário disponível...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersList;
