module RdlReportViewer.Directives {
    export var tableItemDirective = ['$interpolate', '$compile', ($interpolate, $compile) => {
        return {
            require: '^rvReportViewer',
            scope: { table: '=rvTableItem' },
            link: (scope, element, attrs, ctrl) => {
                //shouldn't be watch find another way. like ctrl.registerDataListener();

                var tableElement = angular.element('<table class="table table-striped table-condensed"></table>');
                element.append(tableElement);
                var theadElement = angular.element('<thead></thead>');
                tableElement.append(theadElement);
                var tbodyElement = angular.element('<tbody></tbody>');
                tableElement.append(tbodyElement);
                var trTemplate = '<tr></tr>';
                var tdTemplate = $interpolate('<td {{attrs}}>{{text}}</td>');
                var thTemplate = $interpolate('<th {{attrs}}>{{text}}</th>');
                var table: ITable = scope.table;

                var trHead = angular.element('<tr></tr>');
                theadElement.append(trHead);
                var trBody = angular.element('<tr ng-repeat="row in tableData"></tr>');
                tbodyElement.append(trBody);
                angular.forEach(table.header, (h) => {
                    trHead.append(thTemplate({ text: h, attrs: '' }));
                });

                angular.forEach(table.rowBindings, (r) => {
                    trBody.append(tdTemplate({ text: '', attrs: 'ng-bind="row[\'@' + r + '\']"' }));
                });


                scope.tableData = [];
                $compile(tableElement)(scope);
                
                scope.$on('rv.refereshData', () => {
                    getData();
                });

                function getData() {
                    table.getData().then((data) => {
                        scope.tableData = data;
                    });
                }


            }
        };
    }];
}