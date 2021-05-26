import { Database } from "../../common/database";
import { container, TYPES } from "../../common/di";
import { NodeGetters, DatabaseActions } from "../../common/constants/node.constants";
import { Entities, Luis } from "../../services/luis/luis.interface";

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
            entityNode
        } = nodeGetters;

        const name = this.luisService.parseNames(entities);

        switch (databaseAction) {
            case DatabaseActions.getNode:
                return await this.databaseService.getNode(null, name[0], wantedNode, returnNode);

            case DatabaseActions.getVal:
                if (!entityNode) return null;

                return await this.databaseService.getVal(null, this.luisService.parseEntityByKey(entities, entityNode), wantedNode, returnNode)

            case DatabaseActions.getEncounterlessNode:
                return await this.databaseService.getEncounterlessNode(null, name[0], wantedNode, returnNode);

            case DatabaseActions.getEncounterlessVal:
                if(!detailNode || !entityNode) return null;

                return await this.databaseService.getEncounterlessVal(null, this.luisService.parseEntityByKey(entities, entityNode), wantedNode, returnNode, detailNode)

            case DatabaseActions.getSame:
                if(name.length < 2 || !detailNode) return null;

                return await this.databaseService.getSame(name[0], name[1], detailNode)
        }
    }
}