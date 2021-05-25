import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { FooterContainer, FooterContent } from './styles';
import { Record } from '../Record';
import { MessageInput } from '../MessageInput';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export const Footer = ({
    sendMessage
}: FooterProps) => {
    const [message, setMessage] = useState("");

    const sendMessageAndClearInput = () => {
        sendMessage(message);
        setMessage("");
    }

    return (
        <FooterContainer elevation={3}>
            <FooterContent>
                <MessageInput value={message} setValue={setMessage} sendMessage={sendMessageAndClearInput} />
                <Record />
                <IconButton aria-label={'send message'} onClick={sendMessageAndClearInput} id="sendMessage">
                    <SendIcon />
                </IconButton>
            </FooterContent>
        </FooterContainer>
    )    
}

const footerProps = {
    sendMessage: PropTypes.func.isRequired
}

type FooterProps = InferProps<typeof footerProps>;