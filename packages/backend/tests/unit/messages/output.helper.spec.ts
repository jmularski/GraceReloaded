import 'reflect-metadata';

import { OutputHelper } from "../../../src/messages/utils/output.helper"
import { DatabaseActions } from "../../../src/common/constants";

describe("Output helper spec", () => {
    const outputHelper = new OutputHelper();

    it.each([
        [null, DatabaseActions.getNode, "test has no data related to any test"],
        [["foo"], DatabaseActions.getNode, "The test data for this patient is: foo"],
        [null, DatabaseActions.getVal, "No patient have had encounters with this test"],
        [["foo"], DatabaseActions.getVal, "The patients with this test are: foo"],
        [null, DatabaseActions.getEncounterlessNode, "test has no data related to any test"],
        [['foo'], DatabaseActions.getEncounterlessNode, "The test data for patient test is: foo"],
        [null, DatabaseActions.getEncounterlessVal, "No patient have had encounters with test"],
        [['foo'], DatabaseActions.getEncounterlessVal, "This patients with this test are: foo"],
        [null, DatabaseActions.getSame, "These patient have nothing in common"],
        [['foo'], DatabaseActions.getSame, "The matching data for the patients is: foo"],
    ])("should return correct output", (data, action, output) => {
        const helperOutput = outputHelper.parseDataToOutput({
            databaseAction: action,
            primaryName: "test",
            returnNode: "test",
            data
        });

        expect(helperOutput).toEqual(output);
    })
})