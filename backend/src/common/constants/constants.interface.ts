import { NodeGetters } from "./node.constants";

export interface Constants {
    ENV: string;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    SERVER_PORT: number;
    LUIS_ENDPOINT: string;
    LUIS_KEY: string;
    getNodeMapping(intent: string): NodeGetters | undefined;
}