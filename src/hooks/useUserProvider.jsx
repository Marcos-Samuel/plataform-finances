import { useState } from "react";
import api from "../services/base";
import { getItem } from "../utils/storage";

export default function useUserProvider() {
  const userData = JSON.parse(getItem("@dindin:usuario"));

  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({
    id: userData.id,
    nome: userData.nome,
    email: userData.email,
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [error, setError] = useState("");
  const [queryString, setQueryString] = useState("");
  const [statements, setStatements] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flagEditTransaction, setFlagEditTransaction] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setError("");
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Math.random() }]);
  };

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction
      )
    );
    setEditingTransaction(null);
  };

  const deleteTransaction = async (id) => {
    const token = getItem("@dindin:token");
    try {
      await api.delete(`/transacao/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (err) {
      setError(err);
    }
  };

  return {
    setEditingTransaction,
    setTransactions,
    setError,
    setStatements,
    transactions,
    user,
    editingTransaction,
    error,
    queryString,
    statements,
    isOpen,
    setIsOpen,
    flagEditTransaction,
    setFlagEditTransaction,
    addTransaction,
    editTransaction,
    updateTransaction,
    deleteTransaction,
    setQueryString,
    setUser,
    handleClose,
  };
}
