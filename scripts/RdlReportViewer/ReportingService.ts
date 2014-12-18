module RdlReportViewer {
    export class ReportingService {


        private urlPrefix = "/api/RdlReportViewer/";
        public getReportData(reportPath: string, params: any): ng.IPromise<any> {
            return this.$http.get(this.urlPrefix + "GetReportData", { params: angular.extend({ reportPath: reportPath }, params) });
        }
        public getReportDefinition(reportPath: string): ng.IPromise<any> {
            return this.$http.get(this.urlPrefix + "GetReportDefinition", { params: { reportPath: reportPath } });
        }
        public getReports(): ng.IPromise<any> {
            return this.$http.get(this.urlPrefix + "GetReports");
        }
        constructor(private $http: ng.IHttpService) {
        }
    }
    ReportingService.$inject = ['$http'];
}