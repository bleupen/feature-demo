(function (angular) {
    'use strict';

    /**
     * Config Routes to SQL Datasource pages
     */
    function config($stateProvider, $provide) {

        $provide.decorator('datasourceViewModelService', function ($delegate) {
            return function (id) {
                return $delegate(id).then(function (viewModel) {
                    if (viewModel.datasource.features.conversations) {
                        viewModel.states.push({
                            state: 'datasource.conversations',
                            label: 'Conversate',
                            icon: 'comment'
                        });
                    }
                    return viewModel;
                });
            };
        });

        $stateProvider
            .state('datasource.conversations', {
                url: '/conversations',
                controller: 'MyCoConversationsCtrl as ctrl',
                templateUrl: '/plugin-demo/myco-conversations-tpl.html',
                resolve: {
                    messages: function(datasourceViewModel) {
                        return datasourceViewModel.datasource.get('myco:conversations').then(function(response) {
                            return response.items;
                        });
                    }
                }
            })
        ;
    }

    angular.module('informer').config(config);

})(window.angular);