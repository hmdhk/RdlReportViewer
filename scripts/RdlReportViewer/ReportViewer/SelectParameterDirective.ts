module RdlReportViewer.Directives {
    export var selectParameterDirective = [() => {
        return {
            require: '^rvReportViewer',
            scope: { parameter: '=rvSelectParameter' },
            //template: '<div class="form-group"><lable data-ng-bind="param.Prompt"></label><select class="form-control" data-ng-model="paramValue" data-ng-options="opt.Value as opt.Label for opt in param.ValidValues.ParameterValues.ParameterValue"></select></div>',
            //template: '<ui-select ng-model="p.value"><ui-select-match placeholder="{{param.label}}">{{$select.selected.value}}</ui-select-match><ui-select-choices repeat="opt in param.validValues | filter: $select.search"><div data-ng-bind="opt.label"></div></ui-select-choices></ui-select>',
            template: '<label data-ng-bind="parameter.label"></label><ui-select multiple ng-model="parameter.value" theme="bootstrap"><ui-select-match>{{$item.label}}</ui-select-match><ui-select-choices repeat="opt.value as opt in parameter.validValues | filter:$select.search">{{opt.label}}</ui-select-choices></ui-select>',
            //="parameter.multiple"
            link: (scope, element, attrs, ctrl) => {
                var parameter: ISelectParameter = scope.parameter;
                //scope.selection = { value: [] };
            }
        };
    }];

} 