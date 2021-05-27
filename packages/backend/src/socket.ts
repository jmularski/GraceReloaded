import {Server as SocketServer, Socket} from 'socket.io';
import {Server} from 'http';
import {MessageController} from '@Messages/message.controller';
import {Message} from '@Models/Message';

const socketChannels = {
  USER_CHANNEL: 'chatMessage',
  BOT_CHANNEL: 'userMessage',
};

export class SocketController {
    private io: SocketServer;
    private messageController: MessageController

    constructor(server: Server) {
      this.io = new SocketServer(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });
      this.messageController = new MessageController();
    }

    private emit(socket: Socket, msg: Message) {
      socket.emit(
          socketChannels.BOT_CHANNEL,
          {message: msg.message, id: msg.id},
      );
    }

    public listen() {
      this.io.on('connection', (socket: Socket) => {
        socket.on(socketChannels.USER_CHANNEL, async (msg: Message) => {
          const responses = await this.messageController.getMessages(msg);
          responses.map((response) => {
            console.log('message emitted');
            this.emit(socket, {message: response, id: msg.id});
          });
        });
      });
    }
}
