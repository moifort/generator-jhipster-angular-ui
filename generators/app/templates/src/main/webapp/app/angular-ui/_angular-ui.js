(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('angular-ui', {
            parent: 'app',
            url: '/angular-ui',
            data: {
                authorities: [],
                pageTitle: 'AngularUI'
            },
            views: {
                'content@': {
                    templateUrl: 'app/angular-ui/angular-ui.html',
                    controller: 'AngularUIController'
                }
            }
        });
    }
})();
