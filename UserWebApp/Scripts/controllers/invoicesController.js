	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('invoicesController', function($scope) {
		// create a message to display in our view
		$scope.message = 'invoices controller!';
	});