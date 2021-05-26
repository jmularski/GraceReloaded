import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export const Send = ({ sendMessage }: SendProps) => {
    return (
        <IconButton aria-label={'send message'} onClick={sendMessage} id="sendMessage">
            <SendIcon />
        </IconButton>
    )
}

const sendProps = {
    sendMessage: PropTypes.func.isRequired,
};

type SendProps = InferProps<typeof sendProps>