	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope, $rootScope, $cookies, $location) {
    $rootScope.globals = $cookies.getObject('globals') || {};
		// create a message to display in our view
    if (!($rootScope.globals.currentUser)) {
        $location.path("/");
    }
    else {
        $scope.admin_data = $rootScope.globals.currentUser;
        $scope.adminname = $scope.admin_data.username;
    }
  
   
});


