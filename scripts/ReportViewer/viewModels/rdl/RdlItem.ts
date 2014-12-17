module ReportViewer.Rdl {
    export class RdlItem implements IItem {
        private item: any;
        public report: IReport;

        public get type() {
            return "item";
        }
        public get name() {
            return this.item["@Name"];
        }
        public get top() {
            return this.item["Top"];
        }

        constructor(item: any, report: IReport) {
            this.item = item;
            this.report = report;
        }


    }
}