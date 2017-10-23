	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('realtimeController', function($scope) {
		// create a message to display in our view
		$scope.message = 'realtime Controller !';
	});