import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { ListContainer, StyledList } from './styles';
import { Message } from '../Message';

export const MessageList = ({ messages }: MessageListProps) => {
    
    return (
        <ListContainer>
            <StyledList>
                {messages.map((message) => (
                    <Message text={message?.text ?? ''} isBotMessage={message?.isBotMessage ?? false} />
                ))}
            </StyledList>
        </ListContainer>
    );
}

const messageListProps = {
    messages: PropTypes.arrayOf(PropTypes.exact({
        text: PropTypes.string,
        isBotMessage: PropTypes.bool,
    })).isRequired,
}

type MessageListProps = InferProps<typeof messageListProps>;