/* eslint-disable no-unused-vars */
import {EntityKeys} from '@Services/luis/luis.interface';
import {NodeProperties} from '@Common/database/database.interface'

export interface NodeGetters {
    databaseAction: DatabaseActions;
    wantedNode: string;
    returnNode: string;
    detailNode: keyof NodeProperties;
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
    wantedNode: '[:HAS_DRUG]-(drug:Drug)',
    returnNode: 'drug',
    detailNode: 'description'
  }],
  ['getAllergies', {
    databaseAction: DatabaseActions.getNode,
    wantedNode: '[:HAS_ALLERGY]-(allergy:Allergy)',
    returnNode: 'allergy',
    detailNode: 'description'
  }],
  ['getCarePlan', {
    databaseAction: DatabaseActions.getNode,
    wantedNode: '[:HAS_CARE_PLAN]-(careplan:CarePlan)',
    returnNode: 'carePlan',
    detailNode: 'description'
  }],
  ['getProcedures', {
    databaseAction: DatabaseActions.getNode,
    wantedNode: '[:HAS_PROCEDURE]-(procedure:Procedure)',
    returnNode: 'procedure',
    detailNode: 'description'
  }],
  ['getConditions', {
    databaseAction: DatabaseActions.getNode,
    wantedNode: '[:HAS_CONDITION]-(condition:Condition)',
    returnNode: 'condition',
    detailNode: 'description'
  }],
  ['getAddress', {
    databaseAction: DatabaseActions.getEncounterlessNode,
    wantedNode: '[:HAS_ADDRESS]-(address:Address)',
    returnNode: 'address',
    detailNode: 'address',
  }],
  ['getPatientAddresses', {
    databaseAction: DatabaseActions.getEncounterlessVal,
    wantedNode: '[:HAS_ADDRESS]-(address:Address)',
    returnNode: 'address',
    detailNode: 'address',
    entityNode: EntityKeys.DB_addressName,
  }],
  ['getPatientConditions', {
    databaseAction: DatabaseActions.getVal,
    wantedNode: '[:HAS_CONDITION]-(condition:Condition)',
    returnNode: 'condition',
    detailNode: 'firstName',
    entityNode: EntityKeys.DB_conditionName,
  }],
  ['getPatientDrugs', {
    databaseAction: DatabaseActions.getVal,
    wantedNode: '[:HAS_DRUG]-(drug:Drug)',
    returnNode: 'drug',
    detailNode: 'firstName',
    entityNode: EntityKeys.DB_drugDescription,
  }],
  ['getPatientAllergies', {
    databaseAction: DatabaseActions.getVal,
    wantedNode: '[:HAS_ALLERGY]-(allergy:Allergy)',
    returnNode: 'allergy',
    detailNode: 'firstName',
    entityNode: EntityKeys.DB_allergyName,
  }],
  ['getPatientCarePlan', {
    databaseAction: DatabaseActions.getVal,
    wantedNode: '[:HAS_CARE_PLAN]-(careplan:CarePlan)',
    returnNode: 'careplan',
    detailNode: 'firstName',
    entityNode: EntityKeys.DB_carePlanName,
  }],
  ['getPatientProcedures', {
    databaseAction: DatabaseActions.getVal,
    wantedNode: '[:HAS_PROCEDURE]-(procedure:Procedure)',
    returnNode: 'procedure',
    detailNode: 'firstName',
    entityNode: EntityKeys.DB_procedureName,
  }],
  ['getCommon', {
    databaseAction: DatabaseActions.getSame,
    wantedNode: '',
    returnNode: '',
    detailNode: 'details',
  }],
]);
