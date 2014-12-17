module RdlReportViewer {
    export var reportViewerController = ['$scope', 'reportingService', '$q', '$http',
        ($scope, reportingService: ReportingService, $q: ng.IQService, $http: ng.IHttpService) => {
            var report: ReportViewer.IReport;
            $scope.reportPath = "/rdlreports/test";
            reportingService.getReportDefinition($scope.reportPath).then((response: any) => {
                $scope.reportDef = response.data;
                $scope.report = report = new ReportViewer.Rdl.RdlReport(response.data['Report'], $q, $http);
            }, () => { });


            $scope.getReportData = () => {
                //return reportingService.getReportData($scope.reportPath)
                //    .then((response) => {
                //        return response.data;
                //    });

                var params = {};
                _.forEach(report.parameters, (p: ReportViewer.IParameter) => {
                    params[p.name] = p.value;
                });
                return $http.get("/api/RdlReportViewer/GetReportData", { params: params })
                    .then((response) => {
                        report.data = response.data["Report"];
                        $scope.$broadcast('rv.refereshData');
                    });
            };

        }];
} 