import style from 'styled-components';
import { Theme } from '../../../theme';

interface MessageDivProps {
    isBotMessage: boolean,
    theme: Theme
};

export const MessageBox = style.div<MessageDivProps>`
    background-color: ${({ isBotMessage, theme }) =>  isBotMessage ? theme.botMessages : theme.userMessages };
    color: ${({ isBotMessage }) =>  isBotMessage ? 'black' : 'white' };
    min-width: 3vw;
    max-width: 25vw;
    border-radius: 10px;
    padding: 2%;
    margin-top: 1%;
`

export const MessageContainer = style.div<MessageDivProps>`
    width: 100%;
    display: flex;
    justify-content: ${({ isBotMessage }) => isBotMessage ? 'flex-start' : 'flex-end' };
`