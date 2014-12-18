module RdlReportViewer {
    export var reportViewerController = ['$scope', 'reportingService', '$q', '$http', '$stateParams',
        ($scope, reportingService: ReportingService, $q: ng.IQService, $http: ng.IHttpService, $stateParams) => {
            var report: ReportViewer.IReport;
            $scope.reportPath = $stateParams.reportPath;
            reportingService.getReportDefinition($scope.reportPath).then((response: any) => {
                $scope.reportDef = response.data;
                $scope.report = report = new ReportViewer.Rdl.RdlReport(response.data['Report'], $q, $http);
            }, () => { });


            $scope.getReportData = () => {
                var params = {};
                _.forEach(report.parameters, (p: ReportViewer.IParameter) => {
                    params[p.name] = p.value;
                });
                reportingService.getReportData($scope.reportPath, params)
                    .then((response) => {
                        report.data = response.data["Report"];
                        $scope.$broadcast('rv.refereshData');
                    });
            };

        }];
} 