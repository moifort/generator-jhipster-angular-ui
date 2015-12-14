'use strict';

angular.module('<%=angularAppName%>')
    .controller('AngularUIController', function ($scope) {
        $scope.switcheryValue = true;

        $scope.slider = {};
        $scope.slider.value = 10;
        $scope.slider.min = 1;
        $scope.slider.max = 100;
        $scope.slider.step = 1;
    });
