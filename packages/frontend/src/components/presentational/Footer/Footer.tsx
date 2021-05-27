import React, {useState} from 'react';
import PropTypes, {InferProps} from 'prop-types';
import {FooterContainer, FooterContent} from './styles';
import {Record} from '@Presentational/Record';
import {MessageInput} from '@Presentational/MessageInput';
import {Send} from '@Presentational/Send';
import {useRecording} from '@Service/recording/recording.service';
import {Grid} from '@material-ui/core';

export const Footer = ({
  sendMessage,
}: FooterProps) => {
  const [message, setMessage] = useState('');
  const {startRecording, stopRecording} = useRecording(setMessage);

  const sendMessageAndClearInput = () => {
    sendMessage(message);
    setMessage('');
  };

  const toggleRecording = (isRecording: boolean) => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <FooterContainer elevation={3}>
      <FooterContent>
        <Grid container columns={20}>
          <Grid item xs={12}>
            <MessageInput
              value={message}
              setValue={setMessage}
              sendMessage={sendMessageAndClearInput}
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={1}>
            <Record toggleRecording={toggleRecording}/>
          </Grid>
          <Grid item xs={1}>
            <Send sendMessage={sendMessageAndClearInput} />
          </Grid>
        </Grid>
      </FooterContent>
    </FooterContainer>
  );
};

const footerProps = {
  sendMessage: PropTypes.func.isRequired,
};

type FooterProps = InferProps<typeof footerProps>;
