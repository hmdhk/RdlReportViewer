/// <reference path="rdlitem.ts" />
module ReportViewer.Rdl {
    export class RdlChart extends RdlItem implements IChart {//implements ITable {
        private chart: any;
        private _data: any;

        public get type() {
            return "chart";
        }
        private _series = [];
        private _categoryNames;
        private _seriesGroupingNames = [];

        constructor(chart: any, report: IReport) {
            super(chart, report);
            this.chart = chart;

            var chartSeriesHierarchy = _((<any>_(chart)).navigate('ChartSeriesHierarchy.ChartMembers.ChartMember')).checkArray();

            _.forEach(chartSeriesHierarchy, (se) => {
                var groupName = _(se).navigate('Group.@Name');
                if (groupName)
                    this._seriesGroupingNames.push(groupName);
            });

            this._series = _((<any>_(chart)).navigate('ChartData.ChartSeriesCollection.ChartSeries')).checkArray();

            //_.forEach(chartSeries, (se) => {
            //    this._seriesNames.push(se['@Name']);
            //});


            this._categoryNames = [];
            var chartCategories = (<any>_(chart)).navigate('ChartCategoryHierarchy.ChartMembers.ChartMember');
            if (angular.isArray(chartCategories)) {
                angular.forEach(chartCategories, (cat) => {
                    this._categoryNames.push(cat['Group']['@Name']);
                });
            } else {
                this._categoryNames.push(chartCategories['Group']['@Name']);
            }
            report.onDataChange((data) => {
                this._data = this.createChartData();
            });
        }

        public get data(): any {
            if (this._data == null) {
                this._data = this.createChartData();
            }
            return this._data;
        }
        private createChartData(): any {
            if (this.report.data == null)
                return null;
            var data = this.report.data[this.name];

            var res = [];
            if (this._seriesGroupingNames.length > 0) {
                _.forEach(this._seriesGroupingNames, (seriesName) => {
                    var seriesGroup = _(_(data).navigate(seriesName + '_Collection.' + seriesName)).checkArray();
                    _.forEach(seriesGroup, (sg) => {
                        var series = this.createSeriesFromRawData(sg, this._series[0]);
                        res.push(series);
                    });
                });
            } else {
                _.forEach(data, (d, key) => {
                    var sd = _.find(this._series, (se) => { return se["@Name"] == key });
                    var series = this.createSeriesFromRawData(d, sd);
                    res.push(series);
                });
            }
            return res;
        }
        private createSeriesFromRawData(chartData, seriesDefinition= undefined) {
            var series = { name: chartData['@Label'], data: [], type: 'column' };
            if (!_.isUndefined(seriesDefinition)) {
                if (!_.isUndefined(seriesDefinition['Type'])) {
                    var type = seriesDefinition['Type'].toLowerCase();
                    switch (type) {
                        case "shape":
                            type = "pie";
                            break;
                    }
                    series.type = type;
                }
            }
            _.forEach(this._categoryNames, (catName) => {
                var catGroup = _(chartData).navigate(catName + '_Collection.' + catName);
                _.forEach(catGroup, (d) => {
                    var y;
                    if (_.isUndefined(d['Value'])) {
                        y = Number(d['@Y']);
                    }
                    else {
                        y = d['Value'] == null ? d['Value'] : Number(d['Value']['@Y']);
                    }
                    series.data.push({ name: d['@Label'], y: y });//, x: d['@Label']
                });
            });
            return series;
        }

        public get height(): number {
            return math.eval(this.chart['Height'] + ' to cm').value * 100;
        }
    }
}