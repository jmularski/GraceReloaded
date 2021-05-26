import React, {useState} from 'react';
import PropTypes, {InferProps} from 'prop-types';
import {IconButton} from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';

export const Record = ({toggleRecording}: RecordProps) => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <IconButton
      aria-label={isRecording ? 'stop recording' : 'start recording'}
      onClick={() => {
        setIsRecording((isRecording) => !isRecording);
        toggleRecording(isRecording);
      }}
    >
      {
                isRecording ?
                <StopIcon /> :
                <MicIcon />
      }
    </IconButton>
  );
};

const recordProps = {
  toggleRecording: PropTypes.func.isRequired,
};

type RecordProps = InferProps<typeof recordProps>;
