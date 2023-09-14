import React, { useState } from 'react';
import './style.css';
import Header from '../../components/Header';
import AddTransaction from '../../components/AddTransaction';
import TransactionsList from '../../components/TransactionsList';
import EditTransaction from '../../components/EditTransaction';
import api from '../../services/base';
import { getItem } from '../../utils/storage';
import FilterTransation from '../../components/FilterTransaction';
import ListStatements from '../../components/StatementsList';
import { UserProvider } from '../../contexts/UserContext';


export default function Main() {
    const userData = JSON.parse(getItem('@dindin:usuario'));

    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState({ id: userData.id, nome: userData.nome, email: userData.email });

    const [editingTransaction, setEditingTransaction] = useState(null);
    const [error, setError] = useState('');
    const [queryString, setQueryString] = useState('');
    const [statements, setStatements] = useState([]);
    const [isOpenAddTransation, setIsOpenAddTransation] = useState(false);
    const [flagEditTransaction, setFlagEditTransaction] = useState(false);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, { ...transaction, id: Math.random() }]);
    };

    const editTransaction = (transaction) => {
        setEditingTransaction(transaction);
    };

    const updateTransaction = (id, updatedTransaction) => {
        setTransactions(transactions.map(transaction =>
            transaction.id === id ? updatedTransaction : transaction
        ));
        setEditingTransaction(null);
    };

    const deleteTransaction = async (id) => {
        const token = getItem('@dindin:token');
        try {
            await api.delete(`/transacao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            setTransactions(transactions.filter(transaction => transaction.id !== id));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <UserProvider>
            <div className='main-container'>

                <Header
                    user={user}
                    setUser={setUser}
                    error={error}
                    setError={setError}
                />
                <main>
                    <div className='container-filter'>
                        <div className='content-box'>
                            <FilterTransation
                                queryString={queryString}
                                setQueryString={setQueryString} />
                            <ListStatements
                                transactions={transactions}
                                statements={statements}
                                setStatements={setStatements}
                                setIsOpen={setIsOpenAddTransation} />
                        </div>
                        <div >
                            <TransactionsList
                                transactions={transactions}
                                setTransactions={setTransactions}
                                onEdit={editTransaction}
                                onDelete={deleteTransaction}
                                queryString={queryString}
                                flagEditTransaction={flagEditTransaction}
                            />
                        </div>
                    </div>

                    {
                        editingTransaction &&
                        <EditTransaction
                            transaction={editingTransaction}
                            onEdit={updateTransaction}
                            onClose={() => setEditingTransaction(null)}
                            flagEditTransaction={flagEditTransaction}
                            setFlagEditTransaction={setFlagEditTransaction}
                        />
                    }

                    <AddTransaction
                        transactions={editTransaction}
                        onSubmit={addTransaction}
                        isOpen={isOpenAddTransation}
                        setIsOpen={setIsOpenAddTransation}

                        flagEditTransaction={flagEditTransaction}
                        setFlagEditTransaction={setFlagEditTransaction}
                    />
                </main>

            </div>
        </UserProvider>
    );
};