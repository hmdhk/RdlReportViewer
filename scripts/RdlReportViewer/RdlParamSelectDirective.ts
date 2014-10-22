module RdlReportViewer {
    export var rdlParamSelectDirective = [function () {
        return {
            require: '^rdlReportViewer',
            scope: {},
            //template: '<div class="form-group"><lable data-ng-bind="param.Prompt"></label><select class="form-control" data-ng-model="paramValue" data-ng-options="opt.Value as opt.Label for opt in param.ValidValues.ParameterValues.ParameterValue"></select></div>',
            template: '<ui-select ng-model="p.value"><ui-select-match placeholder="{{param.Prompt}}">{{$select.selected.value}}</ui-select-match><ui-select-choices repeat="opt in param.ValidValues.ParameterValues.ParameterValue | filter: $select.search"><div data-ng-bind="opt.Label"></div></ui-select-choices></ui-select>',
            link: function (scope, element, attrs, ctrl) {
                var param = scope.param = ctrl.getParameter(attrs.rdlParamSelect);
                scope.p = { value: {} };



            }
        };
    }];
}