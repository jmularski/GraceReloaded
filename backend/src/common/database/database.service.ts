import { auth, Driver, driver, QueryResult, Node } from 'neo4j-driver';
import { injectable, inject } from 'inversify';
import { TYPES } from '../di';
import { Constants } from '../constants';
import { Logger } from '../logger';
import { LuisDates } from '../../services/luis/luis.interface';
import { Database, NodeProperties, SameResults } from './database.interface';

@injectable()
export class DatabaseService implements Database {
    private driver!: Driver;
    private logger!: Logger;

    constructor(
        @inject(TYPES.Constants) constants: Constants,
        @inject(TYPES.Logger) logger: Logger,
    ) {
        this.logger = logger;
        this.createConnection(constants.DB_HOST, constants.DB_USERNAME, constants.DB_PASSWORD);
    }

    private createConnection(host: string, username: string, password: string) {
        this.driver = driver(
            host,
            auth.basic(username, password),
        );
    }

    private getDateQuery(dates: LuisDates | null) {
        return dates !== null
        ? `AND date(e2.date)>date('${dates.start}') AND date(e2.end)<date('${dates.end}')`
        : '';
    }

    private getNodeProperties(result: [string, object][][], returnNode: string) {

        const flattenedData = result.reduce((acc, val) => acc.concat(val), []);
        const nodeData = flattenedData.filter(row => row[0] === returnNode).map(row => row[1]) as Object as Node[];
        return nodeData.map(node => node.properties) as NodeProperties[]; 
    }

    public async find(query: string, parameters: object) {
        const session = this.driver.session();

        try {
            const result: QueryResult = await session.run(query, parameters);

            return Array.from(result.records.map(record => Array.from(record.entries())));
        } catch (error) {
            this.logger.log('error', error);

            return null;
        } finally {
            await session.close();
        }
    }

    public async getNode(dates: LuisDates | null, name: string, wantedNode: string, returnNode: string) {
        const result = await this.find(`
            MATCH (p:Patient{firstName:$name})
            MATCH (p)-[:HAS_ENCOUNTER]-(e:Encounter)
            WHERE apoc.node.degree.in(e, 'NEXT') = 0
            MATCH (e)-[:NEXT*0..]->(e2)
            MATCH (e2)-${wantedNode}
            WHERE ${returnNode}.description IS NOT NULL ${this.getDateQuery(dates)} RETURN ${returnNode}`,
          { name });
        
        if(!result) return null;

        const parsedResult = this.getNodeProperties(result, returnNode).map(properties => properties?.description ?? null).filter(result => result !== null) as string[];
        const deduplicatedResult = Array.from(new Set(parsedResult));

        return deduplicatedResult;
    }


    public async getVal(dates: LuisDates | null, wantedEntity: string, wantedNode: string, returnNode: string) {

        const result = await this.find(`
              MATCH (p:Patient)
              MATCH (p)-[:HAS_ENCOUNTER]-(e:Encounter)
              WHERE apoc.node.degree.in(e, 'NEXT') = 0
              MATCH (e)-[:NEXT*0..]->(e2)
              MATCH (e2)-${wantedNode} 
              WHERE ${returnNode}.description = '${wantedEntity}' ${this.getDateQuery(dates)}RETURN p,${returnNode}`,
          {});

        if(!result) return null;

        const parsedResult = this.getNodeProperties(result, 'p').map(properties => properties?.firstName ?? null).filter(result => result !== null) as string[];
        const deduplicatedResult = Array.from(new Set(parsedResult));

        return deduplicatedResult;
    }

    public async getEncounterlessNode(dates: LuisDates | null, name: string, wantedNode: string, returnNode: string) {
        const result = await this.find(
            `MATCH (p:Patient{firstName:$name}) MATCH (p)-${wantedNode} ${this.getDateQuery(dates)} RETURN ${returnNode}`,
            { name },
        );

        if(!result) return null;

        const parsedResult = this.getNodeProperties(result, returnNode).map(properties => properties?.address ?? '');
        const deduplicatedResult = Array.from(new Set(parsedResult))

        return deduplicatedResult;
    }

    public async getEncounterlessVal(dates: LuisDates | null, wantedEntity: string, wantedNode: string, returnNode: string, detailNode: string) {
        const result = await this.find(
            `MATCH (p:Patient) MATCH (p)-${wantedNode} WHERE ${returnNode}.${detailNode} = '${wantedEntity}' ${this.getDateQuery(dates)} RETURN p,${returnNode}`,
            {},
        );

        if(!result) return null;

        const parsedResult = this.getNodeProperties(result, returnNode).map(properties => properties?.address ?? '');
        const deduplicatedResult = Array.from(new Set(parsedResult));

        return deduplicatedResult;
    }

    public async getSame(name: string, secondName: string, detailNode: string) {
        const encounterResults = await this.find(
            'match (p:Patient { firstName:$name} )   '
              + 'match (p)-[:HAS_ENCOUNTER]-(e:Encounter)   '
              + "where apoc.node.degree.in(e, 'NEXT') = 0   "
              + 'match (e)-[:NEXT*0..]->(e2)   '
              + 'match (e2)-[r]-(s)  '
      
              + 'match (p1:Patient { firstName:$secondName} )   '
              + 'match (p1)-[:HAS_ENCOUNTER]-(ea:Encounter)   '
              + "where apoc.node.degree.in(ea, 'NEXT') = 0   "
              + 'match (ea)-[:NEXT*0..]->(eb)   '
              + 'match (eb)-[a]-(b) '
              + 'where b.description = s.description '
              + 'return distinct { date:e2.date, details: b.description} ',
            { name, secondName },
        );

        const encounterlessResults = await this.find(
            'match (p:Patient { firstName:$name} )   '
              + 'match (p)-[r]-(s)  '
              + 'match (p1:Patient { firstName:$secondName} )   '
              + 'match (p1)-[a]-(b)  '
              + 'WHERE s.'+detailNode+' = b.'+detailNode
              + ' return distinct { det:p.firstName, details: b.'+detailNode +'}',
            { name, secondName }
        );

        if (!encounterlessResults && !encounterResults) {
            return null;
        }
        console.log("hi");

        const result = [...encounterResults ?? [], ...encounterlessResults ?? []];
        const flattenedResult = result.reduce((acc, val) => acc.concat(val), []);
        const nodeData = flattenedResult.map(row => row[1]) as Object as SameResults[];
        const parsedResult = nodeData.map(row => row.details) as string[]
        console.log(parsedResult);
        const deduplicatedResult = Array.from(new Set(parsedResult));

        return deduplicatedResult;
    }
}