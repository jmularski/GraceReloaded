import React, {useRef, useEffect} from 'react';
import PropTypes, {InferProps} from 'prop-types';
import {ListContainer, StyledList} from './styles';
import {Message} from '@Presentational/Message';

export const MessageList = ({messages}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <ListContainer>
      <StyledList>
        {messages.map((message) => (
          <Message
            text={message?.text ?? ''}
            isBotMessage={message?.isBotMessage ?? false}
            key={message?.text}
          />
        ))}
      </StyledList>
      <div ref={messagesEndRef} />
    </ListContainer>
  );
};

const messageListProps = {
  messages: PropTypes.arrayOf(PropTypes.exact({
    text: PropTypes.string,
    isBotMessage: PropTypes.bool,
  })).isRequired,
};

type MessageListProps = InferProps<typeof messageListProps>;
