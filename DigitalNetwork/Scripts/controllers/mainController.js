	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('mainController', function ($scope, $rootScope, $cookies) {
    $rootScope.globals = $cookies.getObject('globals') || {};
		// create a message to display in our view
    $scope.userdate = $rootScope.globals.currentUser;
    $scope.email = $scope.userdate.email;
	});