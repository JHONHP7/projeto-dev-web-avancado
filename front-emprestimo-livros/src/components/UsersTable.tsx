import React, { useState } from 'react';
import { UserResponse } from '../interfaces/interfaces';
import Swal from 'sweetalert2';

interface UsersTableProps {
    users: UserResponse[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
    const [filterByAdmin, setFilterByAdmin] = useState(false);

    const handleDelete = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter esta ação!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                onDelete(id);
                await Swal.fire(
                    'Deletado!',
                    'O usuário foi deletado com sucesso.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            Swal.fire(
                'Erro!',
                'Não foi possível deletar o usuário.',
                'error'
            );
        }
    };

    const filteredUsers = users.filter(user => {
        return !filterByAdmin || user.role === 'ADMIN';
    });

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        {/* Checkbox para filtrar administradores */}
                        <div className="p-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filterByAdmin}
                                    onChange={e => setFilterByAdmin(e.target.checked)}
                                    className="mr-2"
                                />
                                Administradores
                            </label>
                        </div>
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => onEdit(user.id)}
                                                    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
