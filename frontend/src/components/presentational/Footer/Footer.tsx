import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { FooterContainer, FooterContent } from './styles';
import { Record } from '../Record';
import { MessageInput } from '../MessageInput';
import { Send } from '../Send';

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
                <Send sendMessage={sendMessageAndClearInput} />
            </FooterContent>
        </FooterContainer>
    )    
}

const footerProps = {
    sendMessage: PropTypes.func.isRequired
}

type FooterProps = InferProps<typeof footerProps>;