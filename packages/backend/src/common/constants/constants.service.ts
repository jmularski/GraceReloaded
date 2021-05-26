import {resolve} from 'path';
import {config} from 'dotenv';
import {Constants} from './constants.interface';
import {injectable} from 'inversify';
import {nodeConstants, NodeGetters} from './node.constants';

@injectable()
export class ConstantsService implements Constants {
  constructor() {
    this.loadEnvFile();
  }

  private loadEnvFile() {
    config({path: resolve(__dirname, '../../../.env')});
  }

  get SERVER_PORT(): number {
    return parseInt(process.env?.SERVER_PORT ?? '3000');
  }

  get ENV(): string {
    return process.env.NODE_ENV ?? 'development';
  }

  get DB_HOST(): string {
    return process.env.DB_HOST ?? 'bolt://localhost:7687/';
  }

  get DB_USERNAME(): string {
    return process.env?.DB_USERNAME ?? 'root';
  }

  get DB_PASSWORD(): string {
    return process.env?.DB_PASSWORD ?? 'password';
  }

  get LUIS_ENDPOINT(): string {
    return process.env?.LUIS_ENDPOINT ?? '';
  }

  get LUIS_KEY(): string {
    return process.env?.LUIS_KEY ?? '';
  }

  getNodeMapping(intent: string): NodeGetters | undefined {
    return nodeConstants.get(intent);
  }
}
