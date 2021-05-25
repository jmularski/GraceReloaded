import React, { useContext, useState } from 'react';
import { Header } from '../../presentational/Header';
import { Footer } from '../../presentational/Footer';
import { MessageContext } from '../../../store/message/message.context';
import { IMessageContext, IMessage } from '../../../store/message/message.types';
import { addMessage } from '../../../store/message/message.reducer';
import { useSocket } from '../../../services/socket.service';
import { MessageList } from '../../presentational/MessageList';

export const Chat = () => {
    const { state, dispatch }: IMessageContext = useContext(MessageContext);

    const [searchValue, setSearchValue] = useState("");
    const { emitMessage } = useSocket();

    const filteredMessages = state.messages.filter((message: IMessage) => message.text.includes(searchValue));

    const sendMessage = (text: string) => {
        emitMessage(text);
        dispatch(addMessage({
            text,
            isBotMessage: false
        }))
    }

    return (
        <div>
            <Header setSearchValue={setSearchValue} />
            <MessageList messages={filteredMessages} />
            <Footer sendMessage={sendMessage}/>
        </div>
    );
}