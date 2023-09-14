import React, { useEffect, useState } from "react";
import pencilIcon from '../../assets/editar.svg';
import trashIcon from '../../assets/lixo.svg';
import api from '../../services/base';
import { getItem } from "../../utils/storage";
import './style.css';
import arrowUp from '../../assets/arrowUp.png'
import arrowDown from '../../assets/arrowDown.png'
import useUser from "../../hooks/useUser";
import ModalDelete from "../ModalDelete";

const columns = [
    {
        id: 'data',
        label: 'Data',

    },
    {
        id: 'diaDaSemana',
        label: 'Dia da Semana',

    },
    {
        id: 'descricao',
        label: 'Descricao',
    },
    {
        id: 'categoria_nome',
        label: 'Categoria',
    },
    {
        id: 'valor',
        label: 'Valor',
    },
    { id: 'funcinalidade', label: '', }
];

function TransactionsList({ onEdit }) {

    const {
        transactions,
        deleteTransaction,
        setTransactions,
        queryString,
        flagEditTransaction
    } = useUser();

    const [open, setOpen] = useState(false)

    const [currentItem, setCurrentItem] = useState(null)

    const handleOpenConfirm = (item) => {
        setCurrentItem(item)
        setOpen(true)
    }


    const [error, setError] = useState(null);
    const [order, setOrder] = useState(true);
    const [orderTransation, setOrderTransation] = useState([])

    useEffect(() => {
        const transactionsList = async () => {
            try {
                const token = getItem('@dindin:token');
                const response = await api.get(`/transacao${queryString}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTransactions(response.data);
            } catch (err) {
                setError("There was an error connecting to the server. Please check your network connection and try again.");
            }
        };
        transactionsList();
    }, [queryString, flagEditTransaction]);

    useEffect(() => {
        orderTransactions();
    }, [order, transactions]);

    const orderTransactions = () => {
        const localTransations = [...transactions];

        localTransations.sort((a, b) => {
            return order
                ? new Date(a.data) - new Date(b.data)
                : new Date(b.data) - new Date(a.data);
        });

        setOrderTransation([...localTransations]);
    };

    const handleSort = (columnId) => {
        setOrder((prevOrder) => !prevOrder);
        if (columnId) {
            const column = columns.find((col) => col.id === columnId);
            if (column && column.sortColumn) {
                setOrder((prevOrder) => !prevOrder);
                return;
            }
        }
        orderTransactions();
    };

    return (
        <div className="container-table">
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id} onClick={() => handleSort(column.sortColumn || column.id)}>
                                {column.label}
                                {column.id === 'data' && <img className="arrow" src={order ? arrowUp : arrowDown} alt="order" />}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {orderTransation.map((transaction) => {
                        const date = new Date(transaction.data);
                        return (
                            <tr key={transaction.id}>
                                <td className="data-num">{
                                    new Intl.DateTimeFormat('pt-br', {
                                        timeZone: 'UTC'
                                    }).format(date)
                                }</td>
                                <td>{
                                    new Intl.DateTimeFormat('pt-br', {
                                        timeZone: 'UTC',
                                        weekday: 'long'
                                    }).format(date)
                                }</td>
                                <td>{transaction.descricao}</td>
                                <td>{transaction.categoria_nome}</td>
                                <td className={transaction.tipo === 'entrada' ? 'entries' : 'exits'}>{`R$ ${transaction.valor.toFixed(2)}`}</td>
                                <td>
                                    <img
                                        src={pencilIcon}
                                        alt="Edit"
                                        onClick={() => onEdit(transaction)}
                                    />

                                    <img
                                        src={trashIcon}
                                        alt="Delete"
                                        onClick={() => handleOpenConfirm(transaction)}
                                    />
                                </td>
                                <ModalDelete
                                    open={open && transaction.id === currentItem.id}
                                    handleClose={() => setOpen(!open)}
                                    handleConfirm={() => deleteTransaction(transaction.id)}
                                />
                            </tr>

                        );

                    })}
                </tbody>

            </table>
        </div>
    );
}

export default TransactionsList;