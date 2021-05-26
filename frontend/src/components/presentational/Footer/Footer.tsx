import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { FooterContainer, FooterContent } from './styles';
import { Record } from '../Record';
import { MessageInput } from '../MessageInput';
import { Send } from '../Send';
import { useRecording } from '../../../services/recording/recording.service';
import { start } from 'repl';

export const Footer = ({
    sendMessage
}: FooterProps) => {
    const [message, setMessage] = useState("");
    const { startRecording, stopRecording } = useRecording(setMessage);

    const sendMessageAndClearInput = () => {
        sendMessage(message);
        setMessage("");
    }

    const toggleRecording = (isRecording: boolean) => {
        if(isRecording) {
           stopRecording();
        } else {
            startRecording();
        }
    }

    return (
        <FooterContainer elevation={3}>
            <FooterContent>
                <MessageInput value={message} setValue={setMessage} sendMessage={sendMessageAndClearInput} />
                <Record toggleRecording={toggleRecording}/>
                <Send sendMessage={sendMessageAndClearInput} />
            </FooterContent>
        </FooterContainer>
    )    
}

const footerProps = {
    sendMessage: PropTypes.func.isRequired
}

type FooterProps = InferProps<typeof footerProps>;