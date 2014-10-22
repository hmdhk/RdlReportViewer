module RdlReportViewer {
    export class ReportingService {

        private $http: ng.IHttpService;
        public getReportData(reportPath: string): ng.IPromise<any> {
            return this.$http.get("/api/RdlReportViewer/GetReportData");
        }
        public getReportDefinition(reportPath: string): ng.IPromise<any> {
            return this.$http.get("/api/RdlReportViewer/GetReportDefinition");
        }
        constructor($http) {
            this.$http = $http;
        }
    }
    ReportingService.$inject = ['$http'];
}