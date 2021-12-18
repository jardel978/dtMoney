// import { useContext } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';


export const TransactionsTable = () => {

    const { transactions } = useTransactions();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td className="title">{transaction.title}</td>
                                <td className={transaction.type}>
                                    {transaction.type === 'deposit' ? '' : '-'}
                                    {new Intl.NumberFormat('pt-BR', {/* Intl: Api nativa do navegador que já formata dados para a gente*/
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transaction.amount)}
                                </td>
                                <td>{transaction.category}</td>
                                <td>                                        {/* a data vem como string da API, new Date a converte para data novamente */}
                                    {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Container>
    )
}
