module RdlReportViewer {
    export interface IChart extends IItem {
        height: number;
        categoryNames: string;
        seriesNames: string;
    }
}