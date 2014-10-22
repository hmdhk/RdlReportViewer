module RdlReportViewer {
    export var rdlChartDirective = [function () {
        return {
            require: '^rdlReportViewer',
            scope: {},
            link: function (scope, element, attrs, ctrl) {
                var rdlItem = ctrl.getItem(attrs.rdlChart);

                element.height(math.eval(rdlItem['Height'] + ' to cm').value * 100 + 'cm');

                var seriesNames = [];
                var categoryNames = [];
                var chartCategories = (<any>_(rdlItem)).navigate('ChartCategoryHierarchy.ChartMembers.ChartMember');
                if (angular.isArray(chartCategories)) {
                    angular.forEach(chartCategories, (cat) => {
                        categoryNames.push(cat['Group']['@Name']);
                    });
                } else {
                    categoryNames.push(chartCategories['Group']['@Name']);
                }
                var chartSeries = (<any>_(rdlItem)).navigate('ChartSeriesHierarchy.ChartMembers.ChartMember');
                if (angular.isArray(chartSeries)) {
                    angular.forEach(chartSeries, (se) => {
                        seriesNames.push(se['Group']['@Name']);
                    });
                } else {
                    seriesNames.push(chartSeries['Group']['@Name']);
                }

                scope.$on('rdlRefereshData', () => {
                    var data = ctrl.getItemData(attrs.rdlChart);
                    var chartModel = {
                        title: null,
                        series: [],
                        credits: {
                            enabled: false
                        },
                        xAxis: {
                            //should infer this from the chart model
                            type:"category"
                        }
                    };

                    angular.forEach(seriesNames, (seriesName) => {
                        var seriesGroup = _(data).navigate(seriesName + '_Collection.' + seriesName);
                        angular.forEach(seriesGroup, (sg) => {

                            var series = { name: sg['@Label'], data: [] };

                            angular.forEach(categoryNames, (catName) => {
                                var catGroup = _(sg).navigate(catName + '_Collection.' + catName);
                                angular.forEach(catGroup, (d) => {
                                    series.data.push({ name: d['@Label'], x: d['@Label'], y: Number(d['Value']['@Y']) });
                                });
                            });
                            chartModel.series.push(series);
                        });

                    });
                    element.highcharts(chartModel);
                });
            }
        };
    }];
}