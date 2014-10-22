module RdlReportViewer {
    export var rdlReportViewerDirective = ['$parse', '$compile', '$interpolate',
        function ($parse: ng.IParseService, $compile: ng.ICompileService, $interpolate: ng.IInterpolateService) {
            return {
                controller: ['$scope', function ($scope) {
                    var self = this;
                    this.report = null;
                    this.items = {};
                    this.data = null;
                    this.dataListeners = [];
                    this.parameters = {};
                    this.addItem = function addItem(name, item) {
                        self.items[name] = item;
                    };
                    function relaodItemsData() { }

                    this.getItem = function getItem(itemName) {
                        return self.items[itemName];
                    };

                    this.getItemData = function getItemData(itemName) {
                        return self.data[itemName];
                    };

                    this.addParameter = function addParameter(name, param) {
                        this.parameters[name] = param;
                    };
                    this.getParameter = function getParameter(name) {
                        return this.parameters[name];
                    };
                    this.setReportData = function setReportData(data) {
                        self.data = data;
                        $scope.$broadcast('rdlRefereshData');
                        //angular.forEach(self.dataListeners, (fn) => {
                        //    fn();
                        //});
                    };
                    //this.registerDataListener = function registerDataListener(listener) {
                    //    self.dataListeners.push(listener);
                    //};
                }],
                scope: { rdlReport: '=', getReportData: '&' },
                link: function (scope, element, attrs, ctrl) {

                    ctrl.getReportData = scope.getReportData;
                    scope.$watch('rdlReport', (newValue) => {
                        if (newValue) {
                            element.empty();
                            var rdlReport = ctrl.report = scope.rdlReport;

                            //function checkArray(source: any) {
                            //    if (angular.isArray(source))
                            //        return source;
                            //    return [source];
                            //}

                            var itemTemplate = $interpolate('<div rdl-{{type}}="{{name}}"></div>');

                            function addItem(item) {
                                var iEl = angular.element(itemTemplate({ type: item.type, name: item['@Name'] }));
                                element.append(iEl);
                                ctrl.addItem(item['@Name'], item);
                                $compile(iEl)(scope);

                            }

                            var parameters = _(_(rdlReport).navigate('Report.ReportParameters.ReportParameter')).checkArray();

                            angular.forEach(parameters, (param) => {
                                if (!angular.isUndefined(param['ValidValues'])) {
                                    param.type = 'select';
                                }
                                var paramEl = angular.element(itemTemplate({ type: 'param-' +  param.type, name: param['@Name'] }));
                                element.append(paramEl);
                                ctrl.addParameter(param['@Name'], param);
                                $compile(paramEl)(scope);
                            });

                            var items = _(rdlReport).navigate('Report.Body.ReportItems');


                            var flatItems = <_.List<any>>_.reduce(items, (m, item: any, k) => {
                                if (_.isArray(item)) {
                                    _.forEach(item, (i: any) => { i.type = k; });
                                    return m.concat(item);
                                }
                                else {
                                    item.type = k;
                                    m.push(item);
                                    return m;
                                }
                            }, []);

                            var sortedItems = _.sortBy(flatItems, (i: any) => {
                                if (i['Top'])
                                    return math.eval(i['Top']).value;
                                else
                                    return 0;
                            });
                            angular.forEach(sortedItems, (item, key) => {
                                if (angular.isArray(item)) {
                                    angular.forEach(item, (i) => {
                                        addItem(i);
                                    });
                                } else {
                                    addItem(item);
                                }
                            });
                            scope.getReportData().then((data) => {
                                ctrl.setReportData(data['Report']);
                            }, () => { });
                        }
                    });

                }
            };
        }];
}