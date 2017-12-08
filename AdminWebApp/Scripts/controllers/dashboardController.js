	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope, $rootScope, $cookies, $state, AuthenticationService, GoogleSignin) {
    $rootScope.globals = $cookies.getObject('globals') || {};

        $scope.admin_data = $rootScope.globals.currentUser;
        $scope.adminname = $scope.admin_data.username;



        $scope.googleLogout = function () {

            $scope.auth = GoogleSignin.isSignedIn();
            if ($scope.auth) {
                GoogleSignin.signOut();
                AuthenticationService.ClearCredentials();
                $state.go("home.login");
            }
        };
});




