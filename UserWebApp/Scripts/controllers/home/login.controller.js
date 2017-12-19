



  angular.module('DigitalMarket')

      .controller('LoginController', function ($scope, Facebook, $state, AuthenticationService, FlashService) {
          (function (d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_EN/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));

        $scope.loginStatus = 'disconnected';
        $scope.facebookIsReady = false;
        $scope.user = null;
     
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
        $scope.login = function () {

            Facebook.login(function (response) {
                if (response.status === 'connected') {
                   
                    $scope.loginStatus = response.status;
                    

                    Facebook.api('/me', {
                        fields: 'name'
                    }, function (response) {
                        if (response) {
                            $scope.user = response;
                            AuthenticationService.Login($scope.user.id, $scope.user.name, function (response) {
                                if (response.success) {
                                    AuthenticationService.SetCredentials();
                                    $state.go('dashboard.home');
                                } else {
                                    FlashService.Error(response.message);
                                    vm.dataLoading = false;
                                }
                            });
                            //$scope.loginStatus = response.status;
                            //$state.go('dashboard.home');
                        } else {
                            //FlashService.Error(response.message);

                        }

                    });
                 
                } else {
                    //FlashService.Error(response.message);

                }
            }, { scope: 'manage_pages,pages_show_list,publish_actions' });
        };
   
        $scope.removeAuth = function () {
            Facebook.api({
                method: 'Auth.revokeAuthorization'
            }, function (response) {
                Facebook.getLoginStatus(function (response) {
                    $scope.loginStatus = response.status;
                });
            });
        };

        var api = function () {
        };
       

        $scope.$watch(function () {
            return Facebook.isReady();
        }, function (newVal) {
            if (newVal) {
                $scope.facebookIsReady = true;
            }
        });
    });

