import { useEffect, useState } from "react";
import api from '../../services/base';
import { getItem } from "../../utils/storage";
import './style.css';
import useUser from "../../hooks/useUser";

export default function ListStatements({ setIsOpen }) {

    const { statements, setStatements, transactions } = useUser()
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaments = async () => {
            const token = getItem('@dindin:token');
            try {
                const response = await api.get('/transacao/extrato', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setStatements(response.data)

            } catch (error) {
                setError("There was an error connecting to the server. Please check your network connection and try again.");
            }
        }

        fetchStaments();
    }, [transactions]);

    const balance = Number(statements.entrada) - Number(statements.saida);

    return (
        <div className="container-statements" >
            <div className="content-statements">
                <h3>Resumo</h3>
                <div className="div-margin">
                    <span>
                        Entradas <strong className="entries"> {`R$ ${statements.entrada}`}</strong>
                    </span>
                    <span>
                        Saídas <strong className="exits"> {`R$ ${statements.saida}`}</strong>
                    </span>
                </div>
                <span>
                    Saldo  <strong className="balance">{`R$ ${balance}`}</strong>
                </span>
            </div>

            {error && <p>{error}</p>}

            <button onClick={() => { setIsOpen(true) }}>Adicionar Transação</button>
        </div>
    );
}