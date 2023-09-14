import React, { useState } from 'react';
import Modal from '../Modal';
import TransactionsForm from '../TransactionsForm';
import api from '../../services/base';
import { getItem } from '../../utils/storage';
import useUser from '../../hooks/useUser';

function EditTransaction({ transaction, onClose }) {
    const {
        flagEditTransaction,
        setFlagEditTransaction
    } = useUser();

    const [isOpen, setIsOpen] = useState(true)

    const [error, setError] = useState(null);

    const handleSubmit = async (data) => {
        const token = getItem('@dindin:token');

        try {
            await api.put(`/transacao/${transaction.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFlagEditTransaction(!flagEditTransaction);
        } catch (err) {
            setError("There was an error connecting to the server. Please check your network connection and try again.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h1 className='modal-title'>Editar Transação</h1>
            <TransactionsForm
                initialValues={transaction}
                onSubmit={handleSubmit}
                isOpen={isOpen}
                onClose={onClose}
                error={error}
            />
            {error && <p>{error}</p>}
        </Modal>
    );
}

export default EditTransaction;