module RdlReportViewer {
    export var reportViewerController = ['$scope', 'reportingService', '$q', function ($scope, reportingService: ReportingService, $q:ng.IQService) {
        
        $scope.reportPath = "/rdlreports/test";
        reportingService.getReportDefinition($scope.reportPath).then((response: any) => {
            $scope.reportDef = response.data;
        }, () => { });

        
        $scope.getReportData = () => {
            

            return reportingService.getReportData($scope.reportPath)
                .then((response) => {
                    return response.data;
                });
        };

        
    }];
} 