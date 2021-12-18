import logoImg from '../../assets/Logo.svg';
import { Container, Content } from './style';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;//definido o tipo do props que virá que é uma função
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}
