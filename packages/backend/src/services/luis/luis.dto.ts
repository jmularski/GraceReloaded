import {LuisDates} from './luis.interface';

interface ResultItem {
    score: number;
}

export interface Intent extends ResultItem {
    intent: string;
}

interface DateResolution {
    timex: string,
    resolution: Array<LuisDates>
}

export interface DateTimeEntity {
    type: string,
    values: Array<DateResolution>
};
