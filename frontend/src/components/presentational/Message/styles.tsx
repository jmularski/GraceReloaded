import style from 'styled-components';

interface MessageDivProps {
    isBotMessage: boolean
};

export const MessageBox = style.div<MessageDivProps>`
    background-color: ${({ isBotMessage }) =>  isBotMessage ? 'turquoise' : 'blue' };
    color: ${({ isBotMessage }) =>  isBotMessage ? 'navy' : 'white' };
    d: right;
    min-width: 5vw;
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