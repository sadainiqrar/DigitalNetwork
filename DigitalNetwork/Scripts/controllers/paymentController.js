	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('paymentController', function($scope) {
		// create a message to display in our view
		$scope.message = 'payment Controller !';
	});