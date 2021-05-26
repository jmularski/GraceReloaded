import axios from 'axios';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../common/di';
import {Constants} from '../../common/constants';
import {
  LuisResult,
  Luis,
  Entities,
  EntityKeys,
  LuisDates,
} from './luis.interface';
import {Intent} from './luis.dto';

@injectable()
export class LuisService implements Luis {
    @inject(TYPES.Constants) private constants!: Constants;

    async getPredictions(text: string): Promise<LuisResult> {
      const response = await axios.get(this.constants.LUIS_ENDPOINT, {
        params: {
          'show-all-intents': true,
          'verbose': true,
          'query': text,
          'subscription-key': this.constants.LUIS_KEY,
        },
      });

      const {data} = response;
      const intentsResponse = new Map(Object.entries(data.prediction.intents));
      const intents: Array<Intent> = Array.from(intentsResponse
          .keys())
          .map((key: string) => {
            const value = intentsResponse.get(key) as Intent | null;
            const score = value ? value.score : 0;
            return <Intent>{intent: key, score};
          });

      const noneScore = (intentsResponse.get('None') as Intent).score;

      if (intents[0].score > 0.75) {
        return {
          predictions: [intents[0].intent],
          entities: data.prediction.entities,
        };
      }

      const multiplePredictions = intents
          .filter((prediction) => (prediction.score > noneScore && prediction.score > 0.05))
          .map((prediction) => prediction.intent);


      return {
        predictions: multiplePredictions,
        entities: <Entities>data.prediction.entities,
      };
    }

    parseDate(entities: Entities): LuisDates | null {
      const datesParsed = entities?.datetimeV2?.values() ?? null;
      if (!datesParsed) {
        return null;
      }

      for (const date of datesParsed) {
        return date.values[0].resolution[0];
      }

      return null;
    };

    parseNames = (entities: Entities): string[] =>
      (entities?.DB_personName?.map((name) => name[0]) ?? []);

    parseEntityByKey = (entities: Entities, key: EntityKeys) =>
      (entities?.[key]?.[0]?.[0] ?? '');
}
