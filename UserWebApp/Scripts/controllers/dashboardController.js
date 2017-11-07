	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope, $rootScope, $cookies, $location) {
    $rootScope.globals = $cookies.getObject('globals') || {};

   $scope.userdata = $rootScope.globals.currentUser;
   $scope.username = $scope.userdata.fullname;
 
  
   
});


