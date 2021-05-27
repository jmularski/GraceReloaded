import {useContext, useEffect} from 'react';
import {io} from 'socket.io-client';
import {addMessage} from '@Store/message/message.reducer';
import {Message} from './message.interface';
import {IMessageContext} from '@Store/message/message.types';
import {MessageContext} from '@Store/message/message.context';

const SERVER_URL = process?.env?.REACT_APP_SERVER ?? 'http://localhost:5000/';
const client = io(SERVER_URL);

export const useSocket = () => {
  const {state, dispatch}: IMessageContext = useContext(MessageContext);

  useEffect(() => {
    client.on('message', ({id, message}: Message) => {
      if (state.userId !== id) return null;

      dispatch(addMessage({
        text: message,
        isBotMessage: true,
      }));
    });
  }, []);

  const emitMessage = (message: string) => {
    client.emit('chatMessage', {id: state.userId, message});
  };

  return {
    emitMessage,
  };
};
