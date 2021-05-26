import { Message } from "../models";
import { MessageService } from "./message.service";

export class MessageController {
    private messageService: MessageService;

    constructor () {
        this.messageService = new MessageService();
    }

    async getMessages(msg: Message) {
        return await this.messageService.getMessages(msg)
    }
}