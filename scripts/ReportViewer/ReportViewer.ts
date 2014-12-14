/// <reference path="directives/chartitemdirective.ts" />
/// <reference path="directives/reportviewerdirective.ts" />
/// <reference path="directives/selectparameterdirective.ts" />
/// <reference path="directives/tableitemdirective.ts" />
module ReportViewer {
    var reportViewer = angular.module('reportviewer', ['ui.select']);
    reportViewer.directive('rvReportViewer', Directives.reportViewerDirective);
    reportViewer.directive('rvTableItem', Directives.tableItemDirective);
    reportViewer.directive('rvChartItem', Directives.chartItemDirective);
    reportViewer.directive('rvSelectParameter', Directives.selectParameterDirective);
} 