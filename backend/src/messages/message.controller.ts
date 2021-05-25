import { UserMessage } from "../models/UserMessage";
import { MessageService } from "./message.service";

export class MessageController {
    private messageService: MessageService;

    constructor () {
        this.messageService = new MessageService();
    }

    async getMessages(msg: UserMessage) {
        return await this.messageService.getMessages(msg)
    }
}