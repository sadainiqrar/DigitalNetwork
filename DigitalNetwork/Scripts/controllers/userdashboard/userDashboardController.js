	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('userDashboardController', function ($scope,  $rootScope, $cookies, $location) {
    $rootScope.globals = $cookies.getObject('globals') || {};
		// create a message to display in our view
    if (!($rootScope.globals.currentUserUser)) {
        $location.path("/user/login");
    }
    else {
        $scope.admin_data = $rootScope.globals.currentUserUser;
        $scope.adminname = $scope.admin_data.username;
    }
        
    
});


