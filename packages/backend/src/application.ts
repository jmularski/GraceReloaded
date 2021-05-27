import * as express from 'express';
import * as cors from 'cors';
import {inject, injectable} from 'inversify';
import {createServer, Server} from 'http';
import {SocketController} from './socket';
import {TYPES} from '@Common/di';
import {Constants} from '@Common/constants';
import {Logger} from '@Common/logger';

@injectable()
export class Application {
    private app!: express.Application;
    private server!: Server;
    private port!: number;
    private logger!: Logger;

    constructor(
        @inject(TYPES.Constants) constants: Constants,
        @inject(TYPES.Logger) logger: Logger,
    ) {
      this.logger = logger;
      this.createApp();
      this.setPort(constants);
      this.createServer();
      this.addSocketListener();
      this.listen();
    }

    private createApp() {
      this.app = express();
      this.app.use(cors());
    }

    private setPort(constants: Constants) {
      this.port = constants.SERVER_PORT;
    }

    private createServer() {
      this.server = createServer(this.app);
    }

    private addSocketListener() {
      new SocketController(this.server).listen();
    }

    private listen() {
      this.server.listen(
          this.port,
          () => this.logger.log('info', `Server running on port ${this.port}`),
      );
    }

    public get getApplication() {
      return this.app;
    }
}
