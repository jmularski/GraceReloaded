import {Message} from '../models';
import {container, TYPES} from '../common/di';
import {Luis} from '../services/luis';
import {Constants} from '../common/constants';
import {DatabaseHelper} from './utils/database.helper';
import {OutputHelper, Output} from './utils/output.helper';

export class MessageService {
    private luisService: Luis = container.get<Luis>(TYPES.Luis);
    private constants: Constants = container.get<Constants>(TYPES.Constants);
    private databaseHelper: DatabaseHelper = new DatabaseHelper();
    private outputHelper: Output = new OutputHelper();

    async getMessages(msg: Message) {
      const {predictions, entities} = await this.luisService.getPredictions(msg.message);

      const result = [];
      for (const prediction of predictions) {
        const nodeGetters = this.constants.getNodeMapping(prediction);

        if (!nodeGetters) {
          result.push('Couldn\'t understand your question.');
          continue;
        }

        const data = await this.databaseHelper.getDataFromUserQuery(nodeGetters, entities);

        result.push(this.outputHelper.parseDataToOutput({
          databaseAction: nodeGetters.databaseAction,
          primaryName: this.luisService.parseNames(entities)[0],
          returnNode: nodeGetters.returnNode,
          data: data as string[],
        }));
      }

      return result;
    }
}
