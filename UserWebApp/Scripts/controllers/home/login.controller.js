



  angular.module('DigitalMarket')

    .controller('LoginController', function ($scope, Facebook,$state) {

        $scope.loginStatus = 'disconnected';
        $scope.facebookIsReady = false;
        $scope.user = null;

 
        $scope.login = function () {

            Facebook.login(function (response) {
                if (response.success) {
                 
                    $scope.loginStatus = response.status;
                    $state.go('dashboard.home');
                } else {
                    //FlashService.Error(response.message);

                }
            });
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

        $scope.api = function () {
            Facebook.api('/me', function (response) {
                $scope.user = response;
            });
        };

        $scope.$watch(function () {
            return Facebook.isReady();
        }, function (newVal) {
            if (newVal) {
                $scope.facebookIsReady = true;
            }
        });
    });

