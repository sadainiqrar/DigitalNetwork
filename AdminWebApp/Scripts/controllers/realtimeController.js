
var controllerId = 'realtimeController';
	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope','$cookies', realtimeController]);


function realtimeController($scope, $rootScope, $cookies) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;


    $scope.breaker = function (number)
    {
        var brokenArray = [];
       var sNumber = (number).toString();

        for (var i = 0, len = sNumber.length; i < len; i += 1) {
            brokenArray.push(+sNumber.charAt(i));
        }
        return brokenArray;
    }
}