import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { api } from '../services/api';

/* As intefaces são usadas para definir os tipos dos dados esperados */
interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;/* criando nova interface removendo os campos que NÃO queremos de outra interface já existente*/
/* type TransactionalInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>; criando nova interface usando apenas os campos QUE queremos de outra interface já existente*/

interface TransactionsProviderProps {
    children: ReactNode;/* dizendo que children é do tipo que recebe qualquer tipo de elemento válido no react */
}

/* Criando interface para definir tipagem do contexto */
interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}


const TransactionsContext = createContext<TransactionsContextData>(
    /* manobra para forçar e dizer o react que esse valor inical do contexto é sim dos tipos definidos na inteface TransactionsContextData*/
    {} as TransactionsContextData
);

/* exportando o context TransactionsProvider que é o componente que compartilha Provider do contexto*/
export function TransactionsProvider({ children }: TransactionsProviderProps) {
    /* indicando o tipo de dado desse estado e que é um array */
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        /* Geralmente toda requisição post retorna o dado inserido. Pegar esse dado e adicionar ao state transactions que vale lembrar é compartilhado por contexto (value={ transactions, ...}*/
        const response = await api.post('/transactions', {
            ...transactionInput, 
            createdAt: new Date(),
        });
        const { transaction } = response.data;

        setTransactions([...transactions, transaction,])
    }

    return (
        /* Componente que leva o contexto com o value referente à chamada da API*/
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

/* criando hook personalizado para evitar ter que importa useContext, TransactionsProvider... para usar o contexto*/
export function useTransactions() {
    /* esse useContext(TransactionsContent) era usado em cada arq e por isso era necessário importar tanto o useContext quanto o TransactionsContext
    com esse hook personalizado, utilizamos apenas o import do hook para uso do contexto e do Provider*/
    const context =  useContext(TransactionsContext);

    return context;
}