import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyledInput } from './styles';

export const MessageInput = ({ value, setValue, sendMessage }: MessageInputProps) => {
    return (
        <StyledInput 
            value={value}
            onKeyPress = {(event) => {
                if (event.key === "Enter") {
                    sendMessage();
                }
            }}
            onChange={event => setValue(event.target.value)} 
            placeholder="Enter a message..."
            id="messageInput"
        />
    )
}

const messageInputProps = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

type MessageInputProps = InferProps<typeof messageInputProps>