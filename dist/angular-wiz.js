/**
 * A native angular wizard directive that is HTML/CSS-compatible with the easyWizard jQuery plugin.
 * @version v0.0.1 - 2014-07-23 * @link https://github.com/danielkrainas/angular-wiz
 * @author Daniel Krainas - me@danielkrainas.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('angular-wiz.templates', ['templates/step.html']);

angular.module("templates/step.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/step.html",
    "<li ng-class=\"{current: active}\"><span>{{position}}</span> {{title}}</li>");
}]);

angular.module('angular-wiz.templates', ['templates/wizard.html']);

angular.module("templates/wizard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/wizard.html",
    "<div>\n" +
    "	<ul class=\"easyWizardSteps\" ng-transclude></ul>\n" +
    "	<div class=\"easyWizardWrapper\">\n" +
    "		<section class=\"step\" ng-repeat=\"step in steps\" ng-class=\"{active: step.active}\" step-content-transclude=\"step\"></section>\n" +
    "	</div>\n" +
    "	<div class=\"easyWizardButtons\" style=\"clear: both;\">\n" +
    "		<button class=\"prev btn btn-default\" ng-click=\"previous()\" ng-show=\"canReturn\">« Back</button>\n" +
    "		<button class=\"next btn btn-default\" ng-click=\"next()\" ng-show=\"canContinue\">Next »</button>\n" +
    "		<button type=\"submit\" class=\"submit btn btn-primary\" ng-click=\"finish()\" ng-show=\"isFinalStep\">Submit</button>\n" +
    "	</div>\n" +
    "</div>");
}]);

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