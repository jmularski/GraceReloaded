import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';

export const Record = () => {
    const [ isRecording, setIsRecording ] = useState(false);
    

    return (
        <IconButton 
            aria-label={isRecording ? 'stop recording' : 'start recording'}
            onClick={() => {
                setIsRecording(isRecording => !isRecording);
            }}
        >
            {
                isRecording ?
                <StopIcon /> :
                <MicIcon />
            }
        </IconButton>
    );
}