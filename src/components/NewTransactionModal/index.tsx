import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Modal from 'react-modal';

import colseImg from '../../assets/Botão - Fechar.svg';
import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg';

import { Container, TransactionalTypeContainer, RadioBox } from './styles';


interface NewTransactionalModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

Modal.setAppElement('#root');//setando qual é o elemento/container principal da aplicação. Isso colocará o modal dentro dele e ajudará em questões de acessibilidade

export const NewTransactionalModal = ({ isOpen, onRequestClose }: NewTransactionalModalProps) => {

    // const { createTransaction } = useContext(TransactionsContext);
    const { createTransaction } = useTransactions();/* usando hook personalizado */

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
      
        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        
        /* Resetando campos do form*/
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();/* fechar componete de Modal após execução de createTransaction*/
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <button
                type='button'
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={colseImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação </h2>

                <input 
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Valor"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                <TransactionalTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        // className={type === 'deposit' ? 'active' : ''}//abaixo outra funcionalidade dos styleds components
                        isActive={type === 'deposit'}//podemos criar propriedades nomeadas como quisermos para manipular os estilos
                        activeColor="gree"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionalTypeContainer>

                <input 
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit">Cadastrar</button>

            </Container>

        </Modal>
    )
}
