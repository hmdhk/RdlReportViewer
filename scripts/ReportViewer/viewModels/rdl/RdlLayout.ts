module ReportViewer.Rdl {
    export class RdlLayout implements ILayout {
        public get columnCount() {
            return 1;
        }
        private report;
        
        constructor(report: any) {
            this.report = report;
        }
    }
} 