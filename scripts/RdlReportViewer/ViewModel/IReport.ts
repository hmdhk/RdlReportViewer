module RdlReportViewer {
    export interface IReport {
        items: { [name: string]: IItem };
        getItemData(name: string);
        layout: any;
    }
}