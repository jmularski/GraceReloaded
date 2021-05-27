import React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import {MessageBox, MessageContainer, StyledText} from './styles';

export const Message = ({
  isBotMessage,
  text,
}: MessageProps) => {
  return (
    <MessageContainer isBotMessage={isBotMessage}>
      <MessageBox isBotMessage={isBotMessage} className="message">
        <StyledText>
          {text}
        </StyledText>
      </MessageBox>
    </MessageContainer>
  );
};

const messagePropTypes = {
  isBotMessage: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

type MessageProps = InferProps<typeof messagePropTypes>;
