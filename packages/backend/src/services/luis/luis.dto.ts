import {LuisDates} from './luis.interface';

interface ResultItem {
    score: number;
}

export interface Intent extends ResultItem {
    intent: string;
}

interface DateResolution {
    resolution: Array<LuisDates>
}

interface DateValues {
    values: Array<DateResolution>
}

export interface DateTimeEntity {
    values(): DateValues[]
};
