import { DatabaseActions } from "../../common/constants/node.constants";

export interface OutputParams {
    databaseAction: DatabaseActions,
    primaryName?: string,
    returnNode: string,
    data: Array<string>
}

export interface Output {
    parseDataToOutput(outputParams: OutputParams): string
}

export class OutputHelper implements Output {

    parseDataToOutput({databaseAction, primaryName, returnNode, data}: OutputParams) {

        switch(databaseAction) {
            case DatabaseActions.getNode:
                return data ?
                    `The ${returnNode.toLowerCase()} data for this patient is: ${data.join(', ')}` :
                    `${primaryName} has no data related to any ${returnNode.toLowerCase()}`

            case DatabaseActions.getVal:
                return data ?
                    `The patients with this ${returnNode.toLowerCase()} are: ${data.join(', ')}` :
                    `No patient have had encounters with ${returnNode.toLowerCase()}`

            case DatabaseActions.getEncounterlessVal:
                return data ?
                    `This patients with this ${returnNode.toLowerCase()} are: ${data.join(', ')}` :
                    `No patient have had encounters with ${returnNode.toLowerCase()}`;

            case DatabaseActions.getEncounterlessNode:
                return data ?
                    `The ${returnNode.toLowerCase()} data for patient ${primaryName} is: ${data}` :
                    `${primaryName} has no data related to any ${returnNode.toLowerCase()}`;

            case DatabaseActions.getSame:


            default:
                return "Couldn't understand your question.";
        }
    }
}