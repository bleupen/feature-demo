(function (angular) {
    'use strict';

    function MyCoConversationsCtrl(messages) {
        this.messages = messages;
    }

    angular.module('informer').controller('MyCoConversationsCtrl', MyCoConversationsCtrl);

})(window.angular);
