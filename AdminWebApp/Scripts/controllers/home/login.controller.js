



angular.module('DigitalMarket')

    .controller('LoginController', function ($scope, GoogleSignin, $state, AuthenticationService, FlashService, $mdDialog) {

        $scope.auth = false;
        $scope.googleUser = null;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        $scope.googleLogin = function (ev) {

          
        
                GoogleSignin.signIn().then(function (user) {

                    $scope.googleUser = GoogleSignin.getBasicProfile();
                    // $scope.googleUser = user;
                    AuthenticationService.Login($scope.googleUser.email, $scope.googleUser.name, $scope.googleUser.image, function (response) {
                        if (response.success) {
                            AuthenticationService.SetCredentials();
                            $state.go('dashboard.home');
                        } else {
                            $mdDialog.show({
                                locals: { data: "Sign Up With Google Analytics and Add a Site to Continue" },
                                controller: SuccessDialogController,
                                templateUrl: 'successmessage.tmpl.html',
                                parent: angular.element(document.body),
                                targetEvent: ev,
                                clickOutsideToClose: true
                            });
                        }
                    });
                }, function (err) {
                    console.log(err);
                });
          
           

           
        };


        function SuccessDialogController($scope, $mdDialog, data) {

            $scope.Response = data;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

        }


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

