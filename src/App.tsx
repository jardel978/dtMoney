import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { NewTransactionalModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';


/* O pricipal benefíco de usar o styled-components é que o css fica restingido ao componete que pertence e isso evita comflitos ou que nos atrapanhemos com estilos*/
/* import styled from 'styled-components'; */
/* const Title = styled.h1` */ /* (criando componente de estilo)*/
/* (css aqui. Detalhe: funciona como scss: Podemos encadear estilos)*/
/*
color: #8257e6;

 (Ex de encadeamento)
button {
  background-color: #000;
  color: white;
}
`
usando o componente: 
  <Title>
    Deus é fiel!
    <button>Styled</button>
  </Title>
*/

export function App() {

  const [isNewTransactionModalOpen, setisNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setisNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setisNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>{/* o Provider deve ser o pai dos elementos que queromos que tenham acesso ao contexto. O value é obrigatório*/}
      <GlobalStyle />{/* usando style global */}

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionalModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}
