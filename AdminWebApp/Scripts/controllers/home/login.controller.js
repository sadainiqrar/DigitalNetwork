



angular.module('DigitalMarket')

    .controller('LoginController', function ($scope, GoogleSignin, $state, AuthenticationService, FlashService) {

        $scope.auth = false;
        $scope.googleUser = null;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        $scope.googleLogin = function () {

          
        
                GoogleSignin.signIn().then(function (user) {

                    $scope.googleUser = GoogleSignin.getBasicProfile();
                    // $scope.googleUser = user;
                    AuthenticationService.Login($scope.googleUser.email, $scope.googleUser.name, $scope.googleUser.image, function (response) {
                        if (response.success) {
                            AuthenticationService.SetCredentials();
                            $state.go('dashboard.home');
                        } else {
                            FlashService.Error(response.message);
                            vm.dataLoading = false;
                        }
                    });
                }, function (err) {
                    console.log(err);
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

