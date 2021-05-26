import 'reflect-metadata';

import { ConstantsService } from "../../../src/common/constants"
import { container, TYPES } from "../../../src/common/di";
import { Luis } from "../../../src/services/luis";
import { EntityKeys } from '../../../src/services/luis/luis.interface';

describe("Luis tests", () => {
    const constants = new ConstantsService();
    let luisService: Luis;

    beforeEach(() => {
        container.snapshot();

        container.rebind(TYPES.Constants).toConstantValue(constants);
        luisService = container.get<Luis>(TYPES.Luis)
    });

    afterEach(() => {
        container.restore();
    });

    describe("prediction tests", () => {
        test("returns correct prediction", async () => {
            const prediction = await luisService.getPredictions(
                "what drugs did cristina921 take?"
            );

            expect(prediction.predictions).toStrictEqual(["getDrugs"]);
        });

        test("returns correct entities", async () => {
            const prediction = await luisService.getPredictions(
                "what drugs did cristina921 take?"
            );

            expect(prediction.entities).toHaveProperty("DB_personName");
        });
    });


    describe("parsing entities tests", () => {
        describe("date tests", () => {
            test("returns null when nonexistent", async () => {
                const dates = luisService.parseDate({});
    
                expect(dates).toStrictEqual(null);
            });
    
            test("returns date", async () => {
                const dates = luisService.parseDate(
                    {
                        "datetimeV2":
                        {
                            values: () => (
                                [{
                                    values: [
                                        {
                                            resolution: [{
                                                "start": "06.04.2021",
                                                "end": "07.04.2021"
                                            }]
                                        }
                                    ]
                                }]
                            )
                        }
                    }
                );
    
                expect(dates).toStrictEqual({
                    "start": "06.04.2021",
                    "end": "07.04.2021"
                });
            });
        });
        
        describe("name tests", () => {
            test("returns null when nonexistent", async () => {
                const names = luisService.parseNames({});
          
                expect(names).toStrictEqual([]);
            });
          
            test("returns name", async () => {
                const names = luisService.parseNames({ DB_personName: [["foo"]] });
          
                expect(names).toStrictEqual(["foo"]);
            });

            test("parses multiple names correctly", () => {
                const names = luisService.parseNames({ DB_personName: [["foo"], ["bar"]] });

                expect(names).toStrictEqual(["foo", "bar"])
            });
        });

        describe("custom entity test", () => {
            test("parses custom entity correctly", () => {
                const entities = luisService.parseEntityByKey({ DB_addressName: [["foo"]]}, EntityKeys.DB_addressName);

                expect(entities).toStrictEqual("foo")
            });
        })
    });
})