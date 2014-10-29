module RdlReportViewer.Directives {
    export var chartItemDirective = [() => {
        return {
            require: '^rvReportViewer',
            scope: { chart: '=rvChartItem' },
            link: (scope, element, attrs, ctrl) => {
                var chart: IChart = scope.chart;

                element.height(chart.height + 'cm');

                function getData() {
                    chart.getData()
                        .then((data) => {
                            var chartModel = {
                                title: null,
                                series: [],
                                credits: {
                                    enabled: false
                                },
                                xAxis: {
                                    //should infer this from the chart model
                                    type: "category"
                                }
                            };
                            chartModel.series = data;
                            element.highcharts(chartModel);
                        });
                }

                
                scope.$on('rv.refereshData', () => {
                    getData();
                });
            }
        };
    }];
}