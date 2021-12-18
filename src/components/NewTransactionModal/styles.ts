import styled from "styled-components";
import { darken, transparentize } from 'polished';

export const Container = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 4rem;
    }

    input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: .25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;

        &::placeholder {
            color: var(--text-body);
        }

        & + input {
            margin-top: 1rem;
        }
    }

    button[type="submit"] {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #FFF;
        border-radius: .25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
        font-weight: 600;

        transform: filter .2s;

        &:hover {
            filter: brightness(.9);
        }
    }
`;

export const TransactionalTypeContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
`;

interface RadioBoxProps {/* definindo o tipo para a propriedade "isActive que criamos".
ela é implementada pelo componete de estilo por meio do generics: Componente<Interface> */
    isActive: boolean;
    activeColor: 'gree' | 'red';
}

const colors = {/* para mapear cor de botão ativo*/
    gree: '#33CC95',
    red: '#E62E4D'
}

export const RadioBox = styled.button<RadioBoxProps>`
        height: 4rem;
        border: 1px solid #d7d7d7;
        border-radius: .25rem;

        /* background: ${(props) => props.isActive ? '#ccc' : 'transparent'}; *//* por criar o style dentro do template string podemos criar funções dentro dele.
        e acessar todas as propriedades desse componente (as padrões e as criadas pelo dev) e usar para alterar estilos*/

        background: ${(props) => props.isActive
            ? transparentize(.9, colors[props.activeColor])/* procura em colors o que vier de ativeColor */
            : 'transparent'};

        display: flex;
        align-items: center;
        justify-content: center;

        transition: border-color .2s;

        &:hover {
            border-color: ${darken(0.1, '#d7d7d7')};
        }

        img {
            width: 20px; 
            height: 20px; 
        }

        span {
            display: inline-block;
            margin-left: 1rem;
            font-size: 1rem;
            color: var(--text-title);
        }
`;