import React, {useContext, useState} from 'react';
import {Header} from '@Presentational/Header';
import {Footer} from '@Presentational/Footer';
import {MessageList} from '@Presentational/MessageList';
import {MessageContext} from '@Store/message/message.context';
import {IMessageContext, IMessage} from '@Store/message/message.types';
import {addMessage} from '@Store/message/message.reducer';
import {useSocket} from '@Service/socket/socket.service';


export const Chat = () => {
  const {state, dispatch}: IMessageContext = useContext(MessageContext);

  const [searchValue, setSearchValue] = useState('');
  const {emitMessage} = useSocket();

  const filteredMessages = state.messages.filter(
      (message: IMessage) => message.text.includes(searchValue),
  );

  const sendMessage = (text: string) => {
    emitMessage(text);
    dispatch(addMessage({
      text,
      isBotMessage: false,
    }));
  };

  return (
    <div>
      <Header setSearchValue={setSearchValue} />
      <MessageList messages={filteredMessages} />
      <Footer sendMessage={sendMessage}/>
    </div>
  );
};
