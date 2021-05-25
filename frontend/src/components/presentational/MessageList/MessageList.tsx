import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { MessageContainer } from './styles';
import { Message } from '../Message';

export const MessageList = ({ messages }: MessageListProps) => {
    
    return (
        <MessageContainer>
            {messages.map((message) => (
                <Message text={message?.text ?? ''} isBotMessage={message?.isBotMessage ?? false} />
            ))}
        </MessageContainer>
    );
}

const messageListProps = {
    messages: PropTypes.arrayOf(PropTypes.exact({
        text: PropTypes.string,
        isBotMessage: PropTypes.bool,
    })).isRequired,
}

type MessageListProps = InferProps<typeof messageListProps>;