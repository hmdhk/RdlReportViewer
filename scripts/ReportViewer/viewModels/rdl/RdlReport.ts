module ReportViewer.Rdl {
    export class RdlReport implements IReport {
        private report: any;
        private _items: { [name: string]: IItem }
        private $q: ng.IQService;
        private $http: ng.IHttpService;
        private _data: { [name: string]: any };
        private dataChangeHandlers: Array<(data: any) => void>;

        public parameters: IParameter[];
        public layout: any;
        public get data(): any {
            return this._data;
        }
        public set data(value: any) {
            this._data = value;
            _.forEach(this.dataChangeHandlers, (h) => {
                h(value);
            });
        }

        public get items(): { [name: string]: IItem } {
            return this._items;
        }

        public onDataChange(handler) {
            this.dataChangeHandlers.push(handler);
        }

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


            var items: any = {};
            if (_.isUndefined(this.report["Body"])) {
                var sections = _(_(this.report).navigate('ReportSections.ReportSection')).checkArray();

                _.forEach(sections, (section) => {
                    var sectionItems = _(section).navigate('Body.ReportItems');
                    _.forEach(sectionItems, (item, key) => {
                        item = _(item).checkArray();
                        if (items[key]) {
                            items[key] = items[key].concat(item);
                        } else {
                            items[key] = item;
                        }
                    });
                });
            }
            else {
                items = _(this.report).navigate('Body.ReportItems');
            }


            this._items = {};
            this.layout = new RdlLayout(this);

            this.data = null;
            this.dataChangeHandlers = [];

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