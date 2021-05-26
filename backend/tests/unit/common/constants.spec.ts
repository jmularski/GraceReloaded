import 'reflect-metadata';

import { ConstantsService, Constants } from "../../../src/common/constants"
const OLD_ENV = process.env;

describe("Constants spec", () => {

    describe("Returns default values if env vars not present", () => {
        let constants: Constants;
        beforeAll(() => {
            constants = new ConstantsService();
            process.env = { };
            jest.resetModules();
        })

        it('should return default port', () => {
            expect(constants.SERVER_PORT).toEqual(3000);
        });

        it('should return development mode', () => {
            expect(constants.ENV).toEqual('development');
        });

        it('should return default host', () => {
            expect(constants.DB_HOST).toEqual("bolt://localhost:7687/");
        })

        it('should return default username', () => {
            expect(constants.DB_USERNAME).toEqual("root");
        })

        it('should return default password', () => {
            expect(constants.DB_PASSWORD).toEqual("password");
        })

        it('should return default luis endpoint', () => {
            expect(constants.LUIS_ENDPOINT).toEqual("");
        })

        it('should return default luis key', () => {
            expect(constants.LUIS_KEY).toEqual("");
        });
    });

    describe("Returns correct values if env vars present", () => {
        let constants: Constants;
        beforeAll(() => {
            jest.resetModules();
            process.env = { ...OLD_ENV };
            process.env = OLD_ENV;
            process.env.DB_HOST="bolt://51.140.127.105:7687/";
            process.env.DB_USERNAME="neo4j"
            process.env.DB_PASSWORD="Ok1gr18cRrXcjhm4byBw"
            process.env.LUIS_ENDPOINT="https://westus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/2c7e50ec-9035-4b8f-987f-8c1d99dd7589/slots/production/predict"
            process.env.LUIS_KEY="5f068b567c6a4381a9ec95cdf932c252"
            constants = new ConstantsService();
        });

        it('should return correct host', () => {
            expect(constants.DB_HOST).toEqual(process.env.DB_HOST);
        })

        it('should return correct username', () => {
            expect(constants.DB_USERNAME).toEqual(process.env.DB_USERNAME);
        })

        it('should return correct password', () => {
            expect(constants.DB_PASSWORD).toEqual(process.env.DB_PASSWORD);
        })

        it('should return correct luis endpoint', () => {
            expect(constants.LUIS_ENDPOINT).toEqual(process.env.LUIS_ENDPOINT);
        })

        it('should return correct luis key', () => {
            expect(constants.LUIS_KEY).toEqual(process.env.LUIS_KEY);
        })
    });
})