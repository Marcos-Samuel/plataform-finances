import React, { useState, useEffect } from 'react';
import api from '../../services/base';
import { getItem } from '../../utils/storage';
import { useForm } from 'react-hook-form';

function TransactionsForm({ initialValues, onSubmit, isOpen, onClose }) {

    const {
        valor,
        categoria_id,
        data,
        descricao,
        tipo
    } = initialValues;

    const [newTransactionType, setNewTransactionType] = useState(tipo || 'entrada');
    const [error, setError] = useState(null);

    const { register, handleSubmit } = useForm({});
    const [categories, setCategories] = useState([]);

    const handleTeste = async (date) => {

        const { valor, categoria_id, data, descricao } = date;

        await onSubmit({
            valor,
            categoria_id: !date.categoria_id ? initialValues.categoria_id : categoria_id,
            data,
            descricao,
            tipo: newTransactionType
        });

        onClose(!isOpen)
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const token = getItem('@dindin:token');
            try {
                const response = await api.get('/categoria', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setCategories(response.data);

            } catch (err) {
                setError("There was an error connecting to the server. Please check your network connection and try again.");
            }
        }

        fetchCategories();
    }, []);

    return (
        <>
            <div className='btns-flow-modal'>
                <button
                    className={
                        `${newTransactionType === 'entrada' ? 'btn-blue' : ''} btn-inflow`
                    }
                    type="button"
                    onClick={() => setNewTransactionType('entrada')}>
                    Entrada
                </button>
                <button
                    className={
                        `${newTransactionType === 'saida' ? 'btn-red' : ''} btn-inflow`
                    }
                    type="button"
                    onClick={() => setNewTransactionType('saida')}>
                    Saída
                </button>
            </div>

            <form onSubmit={handleSubmit(handleTeste)}>
                <label
                    htmlFor="amount"
                    className='amount-username-labels'>
                    Valor
                </label>
                <input
                    type="number"
                    id="amount"
                    defaultValue={valor || 0}
                    {...register('valor')}
                />

                <label
                    htmlFor="category"
                    className='category-email-labels'>
                    Categoria
                </label>
                <select
                    name="category"
                    id="category"

                    {...register('categoria_id')}

                >
                    {categories.map(item => (
                        <option required key={item.id} value={item.id} selected={categoria_id === item.id}>
                            {item.descricao}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="date"
                    className='date-password-labels'>
                    Data
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    defaultValue={(data && data.split('T')[0]) ?? ''}
                    {...register('data')}
                />

                <label
                    htmlFor="description"
                    className='description-password-labels'>
                    Descrição
                </label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    defaultValue={descricao || ''}
                    {...register('descricao')}
                />

                {error && <p>{error}</p>}

                <button
                    type="submit"
                    className='btn-confirm-modal'>
                    Confirme
                </button>
            </form>
        </>
    );
}

export default TransactionsForm;