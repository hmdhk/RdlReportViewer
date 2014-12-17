module ReportViewer {
    export interface IChart extends IItem {
        height: number;
        categoryNames: string;
        seriesNames: string;
        data: any;
    }
}