/// <reference path="rdlreportviewer/reportviewer/selectparameterdirective.ts" />
/// <reference path="rdlreportviewer/reportviewer/chartitemdirective.ts" />
/// <reference path="rdlreportviewer/reportviewer/tableitemdirective.ts" />
/// <reference path="rdlreportviewer/rdlchartdirective.ts" />
/// <reference path="rdlreportviewer/rdlparamselectdirective.ts" />
/// <reference path="rdlreportviewer/rdlreportviewerdirective.ts" />
/// <reference path="rdlreportviewer/rdltablixdirective.ts" />
/// <reference path="rdlreportviewer/reportingservice.ts" />
/// <reference path="rdlreportviewer/reportviewercontroller.ts" />
/// <reference path="rdlreportviewer/reportviewer/reportviewerdirective.ts" />
module RdlReportViewer {
    var rdlReportViewer = angular.module('rdlReportViewer', ['ui.router', 'ui.select']);
    rdlReportViewer.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('rdlreportviewer', {
            url: "/rdlreportviewer",
            templateUrl: '/RdlReportViewer/RdlReportViewer.html',
            controller: [($scope) => { }]
        }).state('rdlreportviewer.reportviewer', {
                //'abstract': true,
                url: "/reportviewer",
                templateUrl: '/RdlReportViewer/Views/ReportViewer.html',
                controller: 'reportViewerController'
            });

        function navigate(obj, path) {
            var keys = path.split('.');
            var value = obj;
            for (var i = 0, l = keys.length; i < l; i++) {
                if (typeof value === 'undefined') {
                    return value;
                }
                value = value[keys[i]];
            }
            return value;
        };
        function checkArray(source) {
            if (_.isArray(source))
                return source;
            return [source];
        };
        _.mixin({
            navigate: navigate,
            checkArray: checkArray
        });
    }]);
    rdlReportViewer.service('reportingService', ReportingService);
    rdlReportViewer.controller('reportViewerController', reportViewerController);
    rdlReportViewer.directive('rdlReportViewer', rdlReportViewerDirective);
    rdlReportViewer.directive('rdlTablix', rdlTablixDirective);
    rdlReportViewer.directive('rdlChart', rdlChartDirective);
    rdlReportViewer.directive('rdlParamSelect', rdlParamSelectDirective);
    rdlReportViewer.directive('rvReportViewer', Directives.reportViewerDirective);
    rdlReportViewer.directive('rvTableItem', Directives.tableItemDirective);
    rdlReportViewer.directive('rvChartItem', Directives.chartItemDirective);
    rdlReportViewer.directive('rvSelectParameter', Directives.selectParameterDirective);
}