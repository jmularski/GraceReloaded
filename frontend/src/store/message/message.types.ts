import { MessageTypes } from "../types";

export interface IMessage {
    text: string,
    isBotMessage: boolean
}

export interface Action {
    type: string,
    payload: IMessage
}

export interface MessageState {
    userId: number,
    messages: Array<IMessage>
}

export interface IMessageContext {
    state: MessageState;
    dispatch: React.Dispatch<any>;
}

export interface AddMessage {
    type: MessageTypes.Add,
    payload: IMessage
}

export type MessageActions = AddMessage