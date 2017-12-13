	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope, $rootScope, $cookies, $state, $mdDialog, AuthenticationService, sitesFactory,$location, GoogleSignin) {
    $rootScope.globals = $cookies.getObject('globals') || {};

        $scope.admin_data = $rootScope.globals.currentUser;
        $scope.adminname = $scope.admin_data.username;

       
        if ($rootScope.globals.currentUser.currentSite === null)
        {

        $rootScope.globals.currentUser.currentSite = $rootScope.globals.currentUser.sites[0];
        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }
        try {
            $scope.selectedSite = $rootScope.globals.currentUser.currentSite.site_name;
        }
        catch (err) {
            alert('Error');
        }
        //$scope.selectedSite = $rootScope.globals.currentUser.currentSite.site_name;
        $scope.switchSite = function ()
        {
            $rootScope.globals.currentUser.currentSite = this.s;
            $scope.selectedSite = $rootScope.globals.currentUser.currentSite.site_name;
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
            $state.go($state.current, {}, { reload: true });

        }
        $scope.googleLogout = function () {

            $scope.auth = GoogleSignin.isSignedIn();
            if ($scope.auth) {
                GoogleSignin.signOut();
                AuthenticationService.ClearCredentials();
                $state.go("home.login");
            }
        };


        $scope.addSite = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'addsite.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.active = $location.$$path;
        $scope.makeActive = function (item) {
            $scope.active = item;

        }


        function DialogController($scope, $rootScope, $cookies, $mdDialog, sitesFactory) {

            $scope.ischecked = false;
            $scope.selectedSite;
            $scope.sites = [];
            sitesFactory.getAvailable($rootScope.globals.currentUser.email).then(
                // callback function for successful http request
                function success(response) {
                    $scope.sites = response.data;


                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );

            $scope.add = function ()
            {
                if ($scope.selectedSite)
                    {
                sitesFactory.addSite($scope.selectedSite.site_url, $scope.selectedSite.site_name, $scope.selectedSite.ga_id, $scope.ischecked, $rootScope.globals.currentUser.email).then(
                    // callback function for successful http request
                    function success(response) {
                        $rootScope.globals.currentUser.sites = response.data;
                        var cookieExp = new Date();
                        cookieExp.setDate(cookieExp.getDate() + 7);
                        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });

                    },
                    // callback function for error in http request
                    function error(response) {
                        // log errors
                    }
                    );
                }
                $scope.cancel();
            }
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            
        }
        
}




);



