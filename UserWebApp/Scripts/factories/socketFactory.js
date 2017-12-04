angular.module('DigitalMarket').factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect("http://localhost:3000");

    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);