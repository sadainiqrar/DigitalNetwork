angular.module('DigitalMarket').factory('socket', ['$rootScope', 'chatUrl', function ($rootScope, chatUrl) {
    var socket = io.connect(chatUrl);

    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);