module ReportViewer {
    export interface IReport {
        items: { [name: string]: IItem; };
        data: { [name: string]: any; };
        onDataChange(handler: (data: any) => void);
        layout: any;
        parameters: IParameter[];
    }
}