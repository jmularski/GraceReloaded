import { EntityKeys } from "../../services/luis/luis.interface";

export interface NodeGetters {
    databaseAction: DatabaseActions;
    wantedNode: string;
    returnNode: string;
    detailNode?: string;
    entityNode?: EntityKeys;
}

export enum DatabaseActions {
    getNode,
    getEncounterlessNode,
    getEncounterlessVal,
    getVal,
    getSame
}

export const nodeConstants = new Map<string, NodeGetters>([
    ['getDrugs', {
        databaseAction: DatabaseActions.getNode,
        wantedNode: "[:HAS_DRUG]-(drug:Drug)",
        returnNode: "drug",
    }],
    ['getAllergies', {
        databaseAction: DatabaseActions.getNode,
        wantedNode: "[:HAS_ALLERGY]-(allergy:Allergy)",
        returnNode: "allergy",
    }],
    ['getCarePlan', {
        databaseAction: DatabaseActions.getNode,
        wantedNode: "[:HAS_CARE_PLAN]-(careplan:CarePlan)",
        returnNode: "carePlan",
    }],
    ['getProcedures', {
        databaseAction: DatabaseActions.getNode,
        wantedNode: "[:HAS_PROCEDURE]-(procedure:Procedure)",
        returnNode: "procedure",
    }],
    ['getConditions', {
        databaseAction: DatabaseActions.getNode,
        wantedNode: "[:HAS_CONDITION]-(condition:Condition)",
        returnNode: "condition",
    }],
    ['getAddress', {
        databaseAction: DatabaseActions.getEncounterlessNode,
        wantedNode: "[:HAS_ADDRESS]-(address:Address)",
        returnNode: "address.address",
        detailNode: ".address",
    }],
    ['getPatientAddresses', {
        databaseAction: DatabaseActions.getEncounterlessVal,
        wantedNode: "[:HAS_ADDRESS]-(address:Address)",
        returnNode: "address",
        detailNode: "address",
        entityNode: EntityKeys.DB_addressName,
    }],
    ['getPatientConditions', {
        databaseAction: DatabaseActions.getVal,
        wantedNode: "[:HAS_CONDITION]-(condition:Condition)",
        returnNode: "condition",
        detailNode: "description",
        entityNode: EntityKeys.DB_conditionName,
    }],
    ['getPatientDrugs', {
        databaseAction: DatabaseActions.getVal,
        wantedNode: "[:HAS_DRUG]-(drug:Drug)",
        returnNode: "drug",
        detailNode: "description",
        entityNode: EntityKeys.DB_drugDescription,
    }],
    ['getPatientAllergies', {
        databaseAction: DatabaseActions.getVal,
        wantedNode: "[:HAS_ALLERGY]-(allergy:Allergy)",
        returnNode: "allergy",
        detailNode: "description",
        entityNode: EntityKeys.DB_allergyName,
    }],
    ['getPatientCarePlan', {
        databaseAction: DatabaseActions.getVal,
        wantedNode: "[:HAS_CARE_PLAN]-(careplan:CarePlan)",
        returnNode: "careplan",
        detailNode: "description",
        entityNode: EntityKeys.DB_carePlanName,
    }],
    ['getPatientProcedures', {
        databaseAction: DatabaseActions.getVal,
        wantedNode: "[:HAS_PROCEDURE]-(procedure:Procedure)",
        returnNode: "procedure",
        detailNode: "description",
        entityNode: EntityKeys.DB_procedureName,
    }],
    ['getCommon', {
        databaseAction: DatabaseActions.getSame,
        wantedNode: "",
        returnNode: "",
        detailNode: "address",
    }]
]);