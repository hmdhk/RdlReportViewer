module ReportViewer.Rdl {
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
        private _groups: string[];
        public get groups() {
            return this._groups;
        }

        public get data(): any {
            if (this.report.data == null)
                return null;
            var collectionName = _(this.tablix).navigate('TablixRowHierarchy.TablixMembers.TablixMember')[1]['DataElementName'];
            var groupName = _(this.tablix).navigate('TablixRowHierarchy.TablixMembers.TablixMember')[1]['Group'];
            groupName = _.isUndefined(groupName['DataElementName']) ? groupName['@Name'] : groupName['DataElementName'];
            if (_.isUndefined(collectionName))
                collectionName = groupName + '_Collection';
            return this.report.data[this.name][collectionName][groupName];
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

            var tablixRowHierarchy = (<any>_(tablix)).navigate('TablixRowHierarchy.TablixMembers.TablixMember');
            this.header.unshift(_(tablixRowHierarchy[0]['TablixHeader']).navigate('CellContents.Textbox.Paragraphs.Paragraph.TextRuns.TextRun.Value'));

            //should see correct indeces in tablixRow
            var tablixCells = tablixRow[1]['TablixCells']['TablixCell'];
            this._rowBindings = _.map(tablixCells, (cell) => {
                return (<any>_(cell)).navigate('CellContents.Textbox.@Name');
            });
            //this._groups = [{ title: 'owner', value: '' }];

        }
    }
}