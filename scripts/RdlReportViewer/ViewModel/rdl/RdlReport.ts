module RdlReportViewer.Rdl {
    export class RdlReport implements IReport {
        private report: any;
        private _items: { [name: string]: IItem }
        private $q: ng.IQService;
        private $http: ng.IHttpService;
        public layout: any;

        public get items(): { [name: string]: IItem } {
            return this._items;
        }
        private _data: any;
        public getItemData(name: string): ng.IPromise<any> {
            var d = this.$q.defer();
            if (_.isUndefined(this._data)) {
                this.$http.get("/api/RdlReportViewer/GetReportData")
                    .then((response) => {
                        this._data = response.data["Report"];
                        d.resolve(this._data[name]);
                    });
            } else {
                d.resolve(this._data[name]);
            }
            return d.promise;
        }
        public parameters: IParameter[];

        private getItem(item: any, type: string) {
            var i;
            switch (type) {
                case "Tablix":
                    i = new RdlTablix(item, this);
                    break;
                case "Chart":
                    i = new RdlChart(item, this);
                    break;
                default:
                    i = new RdlItem(item, this);
            }
            return i;
        }

        constructor(rdlReport: any, $q: ng.IQService, $http: ng.IHttpService) {
            this.$q = $q;
            this.$http = $http;
            this.report = rdlReport;
            var items = _(this.report).navigate('Body.ReportItems');
            this._items = {};
            this.layout = new RdlLayout(this);

            _.forEach(items, (i, k: string) => {
                if (_.isArray(i)) {
                    _.forEach(i, (ii) => {
                        var item = this.getItem(ii, k);
                        this.items[item.name] = item;
                    });
                } else {
                    var item = this.getItem(i, k);
                    this.items[item.name] = item;
                }
            });
            //create layout
            this.layout = [];
            var sortedItems = _.sortBy((<any>this.items), (i: RdlItem) => {
                if (i.top)
                    return math.eval(i.top).value;
                else
                    return 0;
            });
            _.forEach(sortedItems, (item, k) => {
                this.layout.push({ name: item.name, col: 0, row: k });
            });

            this.parameters = _.map(_(_(rdlReport).navigate('ReportParameters.ReportParameter')).checkArray()
                , (param) => {
                    if (!angular.isUndefined(param['ValidValues'])) {
                        return new RdlSelectParameter(param);
                    }
                    return new RdlSelectParameter(param);
                });
        }

    }
}