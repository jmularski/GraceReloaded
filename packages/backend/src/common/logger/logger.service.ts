import {createLogger, Logger, format, transports} from 'winston';
import {injectable, inject} from 'inversify';
import {TYPES} from '../di';
import {Constants} from '../constants/constants.interface';

@injectable()
export class LoggerService {
    private logger!: Logger;

    constructor(
        @inject(TYPES.Constants) constants: Constants,
    ) {
      this.configure(constants.ENV);
    }

    private configure(environment: string) {
      this.logger = createLogger({
        level: 'info',
        format: format.json(),
        defaultMeta: {service: 'user-service'},
        transports: [
          new transports.File({filename: 'error.log', level: 'error'}),
          new transports.File({filename: 'combined.log'}),
        ],
      });

      if (environment !== 'production') {
        this.logger.add(new transports.Console({
          format: format.simple(),
        }));
      }
    }

    public log(level: string, message: string) {
      this.logger.log(level, message);
    }
}
