module RdlReportViewer {
    export var rdlTablixDirective = ['$interpolate', '$compile', function ($interpolate, $compile) {
        return {
            require: '^rdlReportViewer',
            scope: {},
            link: function (scope, element, attrs, ctrl) {
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
                var rdlItem = ctrl.getItem(attrs.rdlTablix);
                var tablixRow = (<any>_(rdlItem)).navigate('TablixBody.TablixRows.TablixRow');
                var tablixHeaderCells = tablixRow[0]['TablixCells']['TablixCell'];
                if (!angular.isArray(tablixHeaderCells)) {
                    tablixHeaderCells = [tablixHeaderCells];
                }
                var trHead = angular.element('<tr></tr>');
                theadElement.append(trHead);
                var trBody = angular.element('<tr ng-repeat="row in tableData"></tr>');
                tbodyElement.append(trBody);
                angular.forEach(tablixHeaderCells, (cell) => {
                    var text = (<any>_(cell)).navigate('CellContents.Textbox.Paragraphs.Paragraph.TextRuns.TextRun.Value');
                    trHead.append(thTemplate({ text: text, attrs: '' }));
                });
                //should see correct indeces in tablixRow
                var tablixCells = tablixRow[1]['TablixCells']['TablixCell'];
                angular.forEach(tablixCells, (cell) => {
                    var name = (<any>_(cell)).navigate('CellContents.Textbox.@Name');
                    trBody.append(tdTemplate({ text: '', attrs: 'ng-bind="row[\'@' + name + '\']"' }));
                });


                scope.tableData = [];
                $compile(tableElement)(scope);
                scope.$on('rdlRefereshData', () => {
                    scope.tableData = ctrl.getItemData(attrs.rdlTablix)['Detail_Collection']['Detail'];
                });
            }
        };
    }];
} 