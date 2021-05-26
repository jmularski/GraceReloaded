import { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { addMessage } from '../../store/message/message.reducer';
import { Message } from './message.interface';
import { IMessageContext } from '../../store/message/message.types';
import { MessageContext } from '../../store/message/message.context';

const SERVER_URL = process?.env?.REACT_APP_SERVER ?? "http://localhost:3000/";
const client = io(SERVER_URL);

export const useSocket = () => {
    const { state, dispatch }: IMessageContext = useContext(MessageContext);

    useEffect(() => {
        client.on('message', ({id, message}: Message) => {
            if(state.userId !== id) return null;

            dispatch(addMessage({
                text: message,
                isBotMessage: true
            }))
        });
    }, []);

    const emitMessage = (message: string) => {
        client.emit('chatMessage', {id: state.userId, message})
    }
    
    return {
        emitMessage
    }
}
