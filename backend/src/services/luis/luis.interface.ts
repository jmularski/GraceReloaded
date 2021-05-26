import { DateTimeEntity } from "./luis.dto";

export enum EntityKeys {
    DB_addressName = "DB_addressName",
    DB_allergyName = "DB_allergyName",
    DB_carePlanName = "DB_carePlanName",
    DB_conditionName = "DB_conditionName",
    DB_drugDescription = "DB_drugDescription",
    DB_personName = "DB_personName",
    DB_procedureName = "DB_procedureName"
}

export type Entities = Partial<Record<EntityKeys, Array<Array<string>>> & Record<"datetimeV2", DateTimeEntity | undefined>>;

export interface LuisDates {
    start: string,
    end: string
}

export interface LuisResult {
    predictions: Array<string>,
    entities: Entities
}

export interface Luis {
    getPredictions(text: string): Promise<LuisResult>,
    parseDate(entities: Entities): LuisDates | null,
    parseNames(entities: Entities): string[],
    parseEntityByKey(entities: Entities, entity: EntityKeys): string
}