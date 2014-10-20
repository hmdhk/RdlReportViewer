module RdlReportViewer {
    var rdlReportViewer = angular.module('rdlReportViewer', ['ui.router']);
    rdlReportViewer.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('rdlreportviewer', {
            url: "/rdlreportviewer",
            templateUrl: '/RdlReportViewer/RdlReportViewer.html',
            controller: [($scope) => { }]
        });
    }]);
}