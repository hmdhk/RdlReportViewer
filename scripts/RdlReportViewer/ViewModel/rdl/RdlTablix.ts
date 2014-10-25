module RdlReportViewer.Rdl {
    export class RdlTablix extends RdlItem implements ITable {
        private tablix: any;

        public get type() {
            return "table";
        }
        private _header: string[];

        public get header() {
            return this._header;
        }
        private _rowBindings: string[];
        public get rowBindings() {
            return this._rowBindings;
        }

        public getData(): ng.IPromise<any> {
            return this.report.getItemData(this.name).then((data) => {
                return data['Detail_Collection']['Detail'];
            });
        }

        constructor(tablix: any, report: IReport) {
            super(tablix, report);
            this.tablix = tablix;
            var tablixRow = (<any>_(tablix)).navigate('TablixBody.TablixRows.TablixRow');
            var tablixHeaderCells = tablixRow[0]['TablixCells']['TablixCell'];
            if (!_.isArray(tablixHeaderCells)) {
                tablixHeaderCells = [tablixHeaderCells];
            }
            this._header = _.map(tablixHeaderCells, (cell) => {
                return (<any>_(cell)).navigate('CellContents.Textbox.Paragraphs.Paragraph.TextRuns.TextRun.Value');
            });
            //should see correct indeces in tablixRow
            var tablixCells = tablixRow[1]['TablixCells']['TablixCell'];
            this._rowBindings = _.map(tablixCells, (cell) => {
                return (<any>_(cell)).navigate('CellContents.Textbox.@Name');
            });


        }
    }
}