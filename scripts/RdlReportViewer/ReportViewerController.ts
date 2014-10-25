module RdlReportViewer {
    export var reportViewerController = ['$scope', 'reportingService', '$q', '$http',
        ($scope, reportingService: ReportingService, $q: ng.IQService, $http: ng.IHttpService) => {

            $scope.reportPath = "/rdlreports/test";
            reportingService.getReportDefinition($scope.reportPath).then((response: any) => {
                $scope.reportDef = response.data;
                $scope.report = new Rdl.RdlReport(response.data['Report'], $q, $http);
            }, () => { });


            $scope.getReportData = () => {
                return reportingService.getReportData($scope.reportPath)
                    .then((response) => {
                        return response.data;
                    });
            };


        }];
} 