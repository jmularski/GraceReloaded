import { Server as SocketServer, Socket } from 'socket.io';
import { Server } from 'http';
import { MessageController } from './messages/message.controller';
import { UserMessage } from './models/UserMessage';

export class SocketController {
    private io: SocketServer;
    private messageController: MessageController

    constructor(server: Server) {
        this.io = new SocketServer(server, {
            cors: {
                origin: 'http://localhost:3001',
                methods: ['GET', 'POST']
            }
        });
        this.messageController = new MessageController();
    }

    private emit(socket: Socket, msg: UserMessage) {
        socket.emit('message', {message: msg.message, id: msg.id});
    }

    public listen() {
        this.io.on('connection', (socket: Socket) => {
            socket.on('chatMessage', async (msg: UserMessage) => {
                const responses = await this.messageController.getMessages(msg);
                responses.map(response => {
                    console.log("message emitted");
                    this.emit(socket, {message: response, id: msg.id})
                });
            });
        });
    }
}