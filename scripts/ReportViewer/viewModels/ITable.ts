module ReportViewer {
    export interface ITable extends IItem {
        header: string[];
        rowBindings: string[];
        data: any;
    }
}