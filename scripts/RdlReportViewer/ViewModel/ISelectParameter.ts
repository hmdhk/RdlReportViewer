module RdlReportViewer {
    export interface ISelectParameter extends IParameter {
        validValues: { value: any; label: string }[];
        defaultValues: { value: any; label: string }[];
        multiple: boolean;
        allowEmpty: boolean;
        label: string;
        value: any[];
    }
}