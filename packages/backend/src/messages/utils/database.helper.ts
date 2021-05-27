import {Database} from '@Common/database';
import {container, TYPES} from '@Common/di';
import {NodeGetters, DatabaseActions} from '@Common/constants/node.constants';
import {Entities, Luis} from '@Services/luis/luis.interface';

interface Helper {
    getDataFromUserQuery(nodeGetters: NodeGetters, entities: Entities): Promise<string[] | null>
}

export class DatabaseHelper implements Helper {
    private luisService: Luis = container.get<Luis>(TYPES.Luis);
    private databaseService: Database = container.get<Database>(TYPES.Database);

    async getDataFromUserQuery(nodeGetters: NodeGetters, entities: Entities) {
      const {
        databaseAction,
        wantedNode,
        returnNode,
        detailNode,
        entityNode,
      } = nodeGetters;

      const dates = this.luisService.parseDate(entities);
      const name = this.luisService.parseNames(entities);

      switch (databaseAction) {
        case DatabaseActions.getNode:
          return await this.databaseService.getNode(
              dates,
              name[0],
              wantedNode,
              returnNode,
              detailNode
          );

        case DatabaseActions.getVal:
          if (!entityNode) return null;

          return await this.databaseService.getVal(
              dates,
              this.luisService.parseEntityByKey(entities, entityNode),
              wantedNode,
              returnNode,
              detailNode
          );

        case DatabaseActions.getEncounterlessNode:
          return await this.databaseService.getEncounterlessNode(
              dates,
              name[0],
              wantedNode,
              returnNode,
              detailNode
          );

        case DatabaseActions.getEncounterlessVal:
          if (!detailNode || !entityNode) return null;

          return await this.databaseService.getEncounterlessVal(
              dates,
              this.luisService.parseEntityByKey(entities, entityNode),
              wantedNode,
              returnNode,
              detailNode,
          );

        case DatabaseActions.getSame:
          if (name.length < 2 || !detailNode) return null;

          return await this.databaseService.getSame(name[0], name[1], detailNode);
      }
    }
}
