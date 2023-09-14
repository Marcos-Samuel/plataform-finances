import React from 'react';
import UserProfileForm from '../UserProfileForm';
import api from '../../services/base';
import { getItem, setItem } from '../../utils/storage';
import useUser from '../../hooks/useUser';

function EditUser({
    user,
    setUser,
    isOpen,
    onClose,
    setError
}) {


    async function handleSubmit(updatedUser) {

        const token = getItem('@dindin:token');

        try {
            await api.put(`/usuario`, updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            const usuario = {
                id: updatedUser.id,
                nome: updatedUser.nome,
                email: updatedUser.email,
            }

            setItem({
                usuario,
                token
            })

            setUser(usuario);

            onClose(!isOpen);

        } catch (err) {
            setError(err.response.data.mensagem);
        }
    };

    return (
        <>
            <h1 className='modal-title'> Editar Perfil</h1>

            <UserProfileForm
                initialValues={user}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default EditUser;