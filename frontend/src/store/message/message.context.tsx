import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { MessageState, IMessageContext } from './message.types';
import { messageReducer } from './message.reducer';

const initialState: MessageState = JSON.parse(localStorage.getItem('MessageState') as string) as MessageState || {
    userId: Math.floor(Math.random() * 10000000),
    messages: []
}

export const MessageContext = createContext<IMessageContext>({
    state: initialState, 
    dispatch: () => {}
});

export const MessageProvider = ({
    children
}: MessageProps) => {
    const [ state, dispatch ] = useReducer(messageReducer, initialState);
    
    const contextValue: IMessageContext = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    useEffect(() => {
        localStorage.setItem('MessageState', JSON.stringify(state));
    }, [state])

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    )
}

const messageProviderPropTypes = {
    children: PropTypes.node.isRequired,
}

type MessageProps = InferProps<typeof messageProviderPropTypes>;