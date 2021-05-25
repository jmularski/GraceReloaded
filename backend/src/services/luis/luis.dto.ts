interface ResultItem {
    score: number;
}

export interface Intent extends ResultItem {
    intent: string;
}

export interface DateValues {
    values: Array<DateResolution>
}

export interface DateResolution {
    resolutions: Array<Date>
}

export type DateTimeEntity = Generator<DateValues>;