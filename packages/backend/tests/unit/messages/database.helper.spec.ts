import { mock } from 'jest-mock-extended';
import { spy, restore } from 'sinon';
import { container, TYPES } from '../../../src/common/di';
import { DatabaseActions } from '../../../src/common/constants';
import { Database } from "../../../src/common/database";
import { DatabaseHelper } from "../../../src/messages/utils/database.helper";
import { EntityKeys } from "../../../src/services/luis/luis.interface";

describe("Database helper spec", () => {
    let dbMock = mock<Database>();

    beforeEach(() => {
        container.snapshot();

        container.rebind(TYPES.Database).toConstantValue(dbMock);
    });

    afterEach(() => {
        container.restore();
    });

    it.each([
        [DatabaseActions.getNode, spy(dbMock.getNode)],
        [DatabaseActions.getVal, spy(dbMock.getVal)],
        [DatabaseActions.getEncounterlessNode, spy(dbMock.getEncounterlessNode)],
        [DatabaseActions.getEncounterlessVal, spy(dbMock.getEncounterlessVal)],
        [DatabaseActions.getSame, spy(dbMock.getSame)],
    ])("%s should call correct function and return correct result", async (query, spy) => {  
        const databaseHelper = new DatabaseHelper();
        
        await databaseHelper.getDataFromUserQuery({
            databaseAction: query,
            wantedNode: "",
            returnNode: "",
            detailNode: "details",
            entityNode: EntityKeys.DB_addressName
        }, {});

        expect(spy.calledOnce);
        restore();
    })
});