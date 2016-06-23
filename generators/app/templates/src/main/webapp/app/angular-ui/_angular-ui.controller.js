(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('AngularUIController', AngularUIController);

        AngularUIController.$inject = ['$scope'];

    function AngularUIController ($scope) {
        $scope.switcheryValue = true;

        $scope.slider = {};
        $scope.slider.value = 10;
        $scope.slider.min = 1;
        $scope.slider.max = 100;
        $scope.slider.step = 1;

    }
})();
