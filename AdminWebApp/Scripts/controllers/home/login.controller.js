



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
                            if (response.user.data.sites.length === 0)
                            {
                                $mdDialog.show({

                                    locals: { data: response.user.data.email},
                                    controller: DialogController,
                                    templateUrl: 'addsite.tmpl.html',
                                    parent: angular.element(document.body),
                                    targetEvent: ev,
                                    clickOutsideToClose: false
                                })
                                    .then(function (answer) {
                                        if (answer === "Submited") {
                                            $mdDialog.show({
                                                locals: { data: "Your Website is Successfully Connected" },
                                                controller: SuccessDialogController,
                                                templateUrl: 'SuccessAdded.tmpl.html',
                                                parent: angular.element(document.body),
                                                targetEvent: ev,
                                                clickOutsideToClose: true
                                            });
                                            AuthenticationService.Login($scope.googleUser.email, $scope.googleUser.name, $scope.googleUser.image, function (response) {
                                                if (response.success) {
                                                    AuthenticationService.SetCredentials();
                                                    $state.go('dashboard.home');
                                                }
                                            });
                                            
                                        }
                                    }, function () {
                                        $scope.status = 'You cancelled the dialog.';
                                    });
                            }
                            else {

                                AuthenticationService.Login($scope.googleUser.email, $scope.googleUser.name, $scope.googleUser.image, function (response) {
                                    if (response.success) {
                                       
                                          
                                     AuthenticationService.SetCredentials();
                                      $state.go('dashboard.home');
                                    }
                                });
                            }
                            
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



        function DialogController($scope, $rootScope, $cookies, $mdDialog,data, sitesFactory) {

            $scope.ischecked = false;
            $scope.selectedSite;
            $scope.sites = [];
            sitesFactory.getAvailable(data).then(
                // callback function for successful http request
                function success(response) {
                    $scope.sites = response.data;


                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );

            $scope.add = function () {
                if ($scope.selectedSite) {
                    sitesFactory.addSite($scope.selectedSite.site_url, $scope.selectedSite.site_name, $scope.selectedSite.ga_id, $scope.ischecked, data).then(
                        // callback function for successful http request
                        function success(response) {
                            $mdDialog.hide("Submited");

                        },
                        // callback function for error in http request
                        function error(response) {
                            // log errors
                        }
                    );
                }
            }
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

        }



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

