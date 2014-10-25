module RdlReportViewer.Directives {
    export var reportViewerDirective = ['$parse', '$compile', '$interpolate',
        ($parse: ng.IParseService, $compile: ng.ICompileService, $interpolate: ng.IInterpolateService) => {
            return {
                controller: [() => { }],
                scope: { report: '=rvReportViewer' },
                link: (scope, element, attrs, ctrl) => {

                    scope.$watch('report', (newValue) => {
                        if (_.isUndefined(scope.report)) {
                            return;
                        }
                        var report: IReport = scope.report;
                        var itemTemplate = $interpolate('<div rv-{{type}}-item="{{name}}"></div>');

                        function addItem(item: IItem) {
                            var iEl = angular.element(itemTemplate({ type: item.type, name: item.name }));
                            scope[item.name] = item;
                            element.append(iEl);
                            //ctrl.addItem(item.name, item);
                            $compile(iEl)(scope);
                        }

                        _.forEach(report.layout, (l: any) => {
                            addItem(report.items[l.name]);
                        });
                        //_.forEach(report.items, (item) => {
                        //    addItem(item);
                        //});

                    });
                }
            };
        }];
}