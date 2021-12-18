// import { useContext } from "react";
import { Container } from "./styles";
import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg';
import totalImg from '../../assets/Total.svg';
import { useTransactions } from "../../hooks/useTransactions";

export const Summary = () => {
    /* modo mais atual de se consumir um contexto (usando useContext).*/
    // const { transactions } = useContext(TransactionsContext);
    // usando hook personalizado para evitar importar muita coisa para usar um contexto
    const { transactions } = useTransactions();


    const summary = transactions.reduce((acumulador, transaction) => {
        if (transaction.type === 'deposit') {
            acumulador.deposits += transaction.amount;
            acumulador.total += transaction.amount;
        }
        else {
            acumulador.withdraws += transaction.amount;
            acumulador.total -= transaction.amount;
        }

        return acumulador;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return (
        <Container>

            {/* Modo antigo de se consumir um contexto
            <TransactionsContext.Consumer>
                {
                    (data) =>{
                        use o contexto como precisar
                        return (
                            <ul> 
                               { data.map(el => return (<li>{el.title}</li>))}
                            </ul>
                        )
                    }
                }
            </TransactionsContext.Consumer> */}
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    -
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}
