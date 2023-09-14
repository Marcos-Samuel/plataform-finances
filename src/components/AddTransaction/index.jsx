import React, { useState } from 'react';
import Modal from '../Modal';
import TransactionsForm from '../TransactionsForm';
import api from '../../services/base';
import { getItem } from '../../utils/storage';
import useUser from '../../hooks/useUser';

function AddTransaction({
    isOpen,
    setIsOpen,
}) {
    const { flagEditTransaction,
        setFlagEditTransaction } = useUser()

    const [error, setError] = useState(null);

    const handleClose = () => {
        setIsOpen(false);
        setError(null);
    };

    const handleSubmit = async (transaction) => {
        const token = getItem('@dindin:token');

        try {
            await api.post('/transacao', transaction, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            setFlagEditTransaction(!flagEditTransaction)

        } catch (error) {
            setError("There was an error connecting to the server. Please check your network connection and try again.");
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <h1 className='modal-title'>Adicionar Transação</h1>
                <TransactionsForm
                    isOpen={isOpen}
                    onClose={handleClose}
                    initialValues={{ valor: '', categoria_id: 1, data: '', descricao: '' }}
                    onSubmit={handleSubmit}

                />
                {error && <p>{error}</p>}
            </Modal>
        </div>
    );
}

export default AddTransaction;