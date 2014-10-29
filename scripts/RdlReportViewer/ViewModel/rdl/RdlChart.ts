/// <reference path="rdlitem.ts" />
module RdlReportViewer.Rdl {
    export class RdlChart extends RdlItem implements IChart {//implements ITable {
        private chart: any;

        public get type() {
            return "chart";
        }
        private _seriesNames;
        public get seriesNames() {
            return this._seriesNames;
        }

        private _categoryNames;

        public get categoryNames() {
            return this._categoryNames;
        }

        constructor(chart: any, report: IReport) {
            super(chart, report);
            this.chart = chart;

            this._seriesNames = [];
            var chartSeries = (<any>_(chart)).navigate('ChartSeriesHierarchy.ChartMembers.ChartMember');
            if (_.isArray(chartSeries)) {
                _.forEach(chartSeries, (se) => {
                    this._seriesNames.push(se['Group']['@Name']);
                });
            } else {
                this._seriesNames.push(chartSeries['Group']['@Name']);
            }

            this._categoryNames = [];
            var chartCategories = (<any>_(chart)).navigate('ChartCategoryHierarchy.ChartMembers.ChartMember');
            if (angular.isArray(chartCategories)) {
                angular.forEach(chartCategories, (cat) => {
                    this._categoryNames.push(cat['Group']['@Name']);
                });
            } else {
                this._categoryNames.push(chartCategories['Group']['@Name']);
            }

        }

        public getData(): ng.IPromise<any> {
            return this.report.getItemData(this.name).then((data) => {
                var res = [];
                var seriesNames = this._seriesNames;
                var categoryNames = this._categoryNames;
                angular.forEach(seriesNames, (seriesName) => {
                    var seriesGroup = _(_(data).navigate(seriesName + '_Collection.' + seriesName)).checkArray();
                    angular.forEach(seriesGroup, (sg) => {
                        var series = { name: sg['@Label'], data: [] };
                        angular.forEach(categoryNames, (catName) => {
                            var catGroup = _(sg).navigate(catName + '_Collection.' + catName);
                            angular.forEach(catGroup, (d) => {
                                series.data.push({ name: d['@Label'], x: d['@Label'], y: Number(d['Value']['@Y']) });
                            });
                        });
                        res.push(series);
                    });
                });
                return res;
            });
        }

        public get height(): number {
            return math.eval(this.chart['Height'] + ' to cm').value * 100;
        }
    }
}