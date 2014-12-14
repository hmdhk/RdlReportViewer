module ReportViewer {
    export interface IItem {
        type: string;
        name: string;
        getData(): ng.IPromise<any>;
    }
} 