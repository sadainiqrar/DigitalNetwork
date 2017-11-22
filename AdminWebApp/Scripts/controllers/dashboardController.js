	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope,  $rootScope, $cookies, $location) {
    $rootScope.globals = $cookies.getObject('globals') || {};

        $scope.admin_data = $rootScope.globals.currentUser;
        $scope.adminname = $scope.admin_data.username;
        
});




