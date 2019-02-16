var app = angular.module('sandbox', []);

app.controller('dropdownDemo', function($scope) {
    $scope.variants = [
        {
            name: ''
        },
        {
            name: 'Belfas',
            corrent: false
        },
        {
            name: 'Liverpool',
            correct: true
        },
        {
            name: 'London',
            corrent: false
        }
    ];
    $scope.default = '';
});

app.run(function($rootScope) {
    angular.element(document).on('click', function(e) {
        $rootScope.$broadcast('documentClicked', angular.element(e.target));
    });
});

app.directive('dropdown', function($rootScope, $document) {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/dropdown.html',
        scope: {
            list: '=',
            selected: '=',
            property: '@'
        },
        link: function(scope) {
            scope.listVisible = false;
            scope.focused = '';

            scope.select = function(item) {
                if (item && item.name) {
                    scope.selected = item;
                    if (item.correct) {
                        scope.answerState = '_correct';
                    } else {
                        scope.answerState = '_wrong';
                    }
                } else {
                    scope.selected = '';
                    scope.answerState = '';
                }

                scope.focused = scope.list[2];
            };

            scope.isSelected = function(item) {
                return item.name && scope.selected === item;
            };

            scope.isFocused = function (item) {
                return scope.focused === item;
            };

            scope.show = function() {
                scope.listVisible = true;
                scope.focused = null;
            };

            scope.onMouseenter = function (item) {
                scope.focused = item;
            };

            scope.onMouseleave = function () {
                scope.focused = null;
            };

            scope.onListKeyDown = function (event) {
                var keyCode = event.which;
                if (keyCode === 40 || keyCode === 38 || keyCode === 13 || keyCode === 27) {
                    event.preventDefault();
                    event.stopPropagation();

                    var focusedNumber = scope.list.indexOf(scope.focused);
                    switch (keyCode) {
                        case 40:
                            if (focusedNumber === -1 || focusedNumber === scope.list.length - 1) {
                                scope.focused = scope.list[0];
                            } else {
                                scope.focused = scope.list[focusedNumber + 1];
                            }
                            break;
                        case 38:
                            if (focusedNumber === -1 || focusedNumber === 0) {
                                scope.focused = scope.list[scope.list.length - 1];
                            } else {
                                scope.focused = scope.list[focusedNumber - 1];
                            }
                            break;
                        case 13:
                            scope.select(scope.focused);
                            scope.focused = null;
                            scope.listVisible = false;
                            break;
                        case 27:
                            scope.select();
                            scope.focused = null;
                            scope.listVisible = false;
                    }
                }
                scope.$apply();
            };

            scope.onDisplayKeyDown = function (event) {
                var keyCode = event.which;
                if (keyCode === 40 || keyCode === 38 || keyCode === 13) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (keyCode === 13 || keyCode === 40) {
                        scope.listVisible = true;
                    }
                }
                scope.$apply();
            };

            scope.onFocus = function () {
                $document.bind('keydown', scope.onDisplayKeyDown);
            };

            scope.onBlur = function () {
                $document.unbind('keydown', scope.onDisplayKeyDown);
            };

            $rootScope.$on('documentClicked', function(inner, target) {
                if (!$(target[0]).is('.dropdown__display._clicked')
                    && !$(target[0]).parents('.dropdown__display._clicked').length > 0)
                    scope.$apply(function() {
                        scope.listVisible = false;
                    });
            });

            scope.$watch('selected', function() {
                scope.display = scope.selected[scope.property];
            });

            scope.$watch('listVisible', function (isVisible) {
                if (isVisible) {
                    $document.bind('keydown', scope.onListKeyDown);
                } else {
                    $document.unbind('keydown', scope.onListKeyDown);
                }
            })
        }
    }
});
