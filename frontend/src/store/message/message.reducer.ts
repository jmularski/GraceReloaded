import { IMessage, MessageState, MessageActions } from "./message.types";
import { MessageTypes } from "../types";

export const messageReducer = (state: MessageState, action: MessageActions) => {
    switch (action.type) {
        case MessageTypes.Add:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    } 
}

export const addMessage = ({text, isBotMessage}: IMessage) => ({
    type: MessageTypes.Add,
    payload: { text, isBotMessage }
})