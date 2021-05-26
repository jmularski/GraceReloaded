import {DatabaseActions} from '../../common/constants/node.constants';

export interface OutputParams {
    databaseAction: DatabaseActions,
    primaryName?: string,
    returnNode: string,
    data: Array<string> | null
}

export interface Output {
    parseDataToOutput(outputParams: OutputParams): string
}

export class OutputHelper implements Output {
  parseDataToOutput(
      {databaseAction, primaryName, returnNode, data}: OutputParams,
  ) {
    const stringifiedData = data ? data.join(', ') : null;

    switch (databaseAction) {
      case DatabaseActions.getNode:
        return stringifiedData ?
          `The ${returnNode} data for this patient is: ${stringifiedData}` :
          `${primaryName} has no data related to any ${returnNode}`;
      case DatabaseActions.getVal:
        return stringifiedData ?
          `The patients with this ${returnNode} are: ${stringifiedData}` :
          `No patient have had encounters with this ${returnNode}`;
      case DatabaseActions.getEncounterlessVal:
        return stringifiedData ?
          `This patients with this ${returnNode} are: ${stringifiedData}` :
          `No patient have had encounters with ${returnNode}`;
      case DatabaseActions.getEncounterlessNode:
        return stringifiedData ?
          `The ${returnNode} data for patient ${primaryName} is: ${stringifiedData}` :
          `${primaryName} has no data related to any ${returnNode}`;
      case DatabaseActions.getSame:
        return stringifiedData ?
          `The matching data for the patients is: ${stringifiedData}` :
          'These patient have nothing in common';
    }
  }
}
