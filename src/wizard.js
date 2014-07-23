angular.module('angular-wiz', ['angular-wiz.templates'])

.constant('wizardConfig', {
})

.controller('WizardController', ['$scope', function WizardCtrl($scope) {
    var ctrl = this;
    var steps = ctrl.steps = $scope.steps = [];
    $scope.activeIndex = 0;

    ctrl.select = function (selectedStep) {
        angular.forEach(steps, function (step, index) {
            if (step.active && step !== selectedStep) {
                step.active = false;
                //step.onDeselect();
            }
        });

        $scope.canReturn = false;
        $scope.canContinue = false;
        $scope.isFinalStep = false;
        $scope.activeIndex = steps.indexOf(selectedStep);
        if ($scope.activeIndex > 0) {
            $scope.canReturn = true;
        }

        if ($scope.activeIndex == (steps.length - 1)) {
            $scope.isFinalStep = true;
        } else {
            $scope.canContinue = true;
        }

        selectedStep.active = true;
        //selectedStep.onSelect();
    };

    $scope.next = ctrl.next = function () {
        if (steps.length <= ($scope.activeIndex + 1)) {
            return;
        }

        steps[$scope.activeIndex + 1].active = true;
    };

    $scope.previous = ctrl.previous = function () {
        if (steps.length > 1 && $scope.activeIndex > 0) {
            steps[$scope.activeIndex - 1].active = true;
        }
    };

    $scope.finish = ctrl.finish = function () {
        if ($scope.isFinalStep && typeof $scope.finished === 'function') {
            $scope.finished();
        }
    };

    $scope.canReturn = true;
    $scope.canContinue = false;
    $scope.isFinalStep = true;

    ctrl.addStep = function addStep(step) {
        step.active = false;
        steps.push(step);
        if (steps.length === 1) {
            step.active = true;
        } else if (step.active) {
            ctrl.select(step);
        }

        return steps.length;
    };

    ctrl.removeStep = function removeStep(step) {
        var index = steps.indexOf(step);
        if (step.active && steps.length > 1) {
			index = steps.length - 1 ? index - 1 : index + 1;
            var newActiveIndex = index;
            ctrl.select(steps[newActiveIndex]);
        }

        steps.splice(index, 1);
    };
}])

.directive('wizard', ['wizardConfig', function (wizardConfig) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: function(element, attributes) {
			return attributes.template || 'templates/wizard.html';
		},
        transclude: true,
        scope: {
            active: '=',
            finished: '&'
        },
        controller: 'WizardController',
        link: function ($scope, $element, $attrs) {

        }
    };
}])

.directive('wizardStep', function () {
    return {
        restrict: 'EA',
        require: '^wizard',
        replace: true,
        transclude: true,
        scope: {
            active: '@?',
            title: '@'
        },
        templateUrl: function(element, attributes) {
			return attributes.template || 'templates/step.html';
		},
        controller: function () {
        },
        compile: function ($element, $attrs, $transclude) {
            return function postLink($scope, $element, $attrs, wizard) {
                $scope.active = $scope.active || false;
                $scope.$watch('active', function (active) {
                    if (active) {
                        wizard.select($scope);
                    }
                });

                //$scope.disabled = false;
                //$scope.select = function () {
                //    $scope.active = true;
                //};

                $scope.position = wizard.addStep($scope);
                $scope.$on('$destroy', function () {
                    wizard.removeStep($scope);
                });

                $scope.$transcludeFn = $transclude;
            };
        }
    };
})

.directive('stepContentTransclude', function () {
    return {
        restrict: 'A',
        require: '^wizard',
        link: function ($scope, $element, $attrs) {
            var step = $scope.$eval($attrs.stepContentTransclude);
            step.$transcludeFn(step.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    $element.append(node);
                });
            });
        }
    };
})

;