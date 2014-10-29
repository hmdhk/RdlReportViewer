module RdlReportViewer.Rdl {
    export class RdlSelectParameter implements ISelectParameter {
        public type: string;
        public validValues: { value: any; label: string }[];
        public defaultValues: any[];
        public multiple: boolean;
        public allowEmpty: boolean;
        public label: string;
        public name: string;
        public value: any[];
        private parameter: any;
        constructor(parameter: any) {
            this.type = "select";
            this.parameter = parameter;
            this.validValues = _.map(_(_(parameter).navigate("ValidValues.ParameterValues.ParameterValue")).checkArray(),
                (pv) => {
                    return { value: pv['Value'], label: pv['Label'] };
                });
            this.defaultValues = _(_(parameter).navigate("DefaultValue.Values.Value")).checkArray();
            this.value = this.defaultValues;
            this.allowEmpty = parameter['AllowBlank'];
            this.multiple = parameter['MultiValue'];
            this.label = parameter['Prompt'];
            this.name = parameter['@Name'];
            
        }

    }
} 