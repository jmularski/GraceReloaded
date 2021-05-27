import {LuisDates} from '@Services/luis/luis.interface';
import {DateTime} from 'neo4j-driver';

export type FindResult = Promise<[string, object][][] | null>;
export type QueryResult = Promise<Array<string> | null>;

export interface NodeProperties {
    firstName?: string,
    description?: string,
    details?: string,
    address?: string
};

export interface SameResults {
    date: DateTime,
    details: string,
}

export interface Database {
    find(
        query: string,
        parameters: object
    ): FindResult
    getNode(
        dates: LuisDates | null,
        name: string,
        wantedNode: string,
        returnNode: string
    ): QueryResult,
    getVal(
        dates: LuisDates | null,
        wantedEntity: string,
        wantedNode: string,
        returnNode: string
    ): QueryResult,
    getEncounterlessNode(
        dates: LuisDates | null,
        name: string,
        wantedNode: string,
        returnNode: string
    ): QueryResult,
    getEncounterlessVal(
        dates: LuisDates | null,
        wantedEntity: string,
        wantedNode: string,
        returnNode: string,
        detailNode: string
    ): QueryResult,
    getSame(name: string, secondName: string, detailNode: string): QueryResult
};
