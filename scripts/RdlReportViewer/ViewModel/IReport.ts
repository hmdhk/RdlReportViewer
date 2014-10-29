module RdlReportViewer {
    export interface IReport {
        items: { [name: string]: IItem };
        getReportData();
        getItemData(name: string);
        layout: any;
        parameters: IParameter[];
    }
}