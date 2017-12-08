



angular.module('DigitalMarket')

    .controller('LoginController', function ($scope, GoogleSignin, $state, AuthenticationService, FlashService) {

        $scope.auth = false;
        $scope.googleUser = null;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        $scope.googleLogin = function () {

            $scope.auth = GoogleSignin.isSignedIn();
            if (!$scope.auth) {
                GoogleSignin.signIn().then(function (user) {
                    // $scope.googleUser = user;
                }, function (err) {
                    console.log(err);
                });
            }
            $scope.googleUser = GoogleSignin.getBasicProfile();

            AuthenticationService.Login($scope.googleUser.email, $scope.googleUser.name, $scope.googleUser.photo, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials();
                    $state.go('dashboard.home');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };


       


        //$scope.api = function () {
        //    Facebook.api('/me', {
        //        fields: 'name'
        //    }, function (response) {
        //        if (response) {
        //            $scope.user = response;
        //            //$scope.loginStatus = response.status;
        //            //$state.go('dashboard.home');
        //        } else {
        //            //FlashService.Error(response.message);

        //        }

        //    });
        //};


    });

