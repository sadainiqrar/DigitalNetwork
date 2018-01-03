
var controllerId = 'sourcesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', 'Facebook', '$rootScope', '$cookies', 'umsFactory', 'ModalService', 'AuthenticationService', '$mdDialog','$mdToast', sourcesController]);

function sourcesController($scope, Facebook, $rootScope, $cookies, umsFactory, ModalService, AuthenticationService, $mdDialog, $mdToast) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.dbUms = [];
    $scope.addedUms = [];
    $scope.fbUms = [];
    $scope.ums = [];
    $scope.loginStatus = 'disconnected';
    $scope.bodyText = 'This text can be updated in modal 1';
    $scope.$parent.active = "/marketingsources"


   

    AuthenticationService.GetStatus($rootScope.globals.currentUser.uid).then(
        // callback function for successful http request
        function success(response) {
            if (response.data == 'incomplete') {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Status: Incomplete')
                        .textContent('Please Add a Marketing Source to Start Verification Process')
                        .ariaLabel('Offscreen Demo')
                        .ok('Got it!')
                        // Or you can specify the rect to do the transition from
                        .openFrom({
                            top: -50,
                            width: 30,
                            height: 80
                        })
                        .closeTo({
                            left: 1500
                        })
                );
            } else if (response.data == 'pending') {

                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Status: Pending')
                        .textContent('Your Verification is in Progress')
                        .ariaLabel('Offscreen Demo')
                        .ok('Got it!')
                        // Or you can specify the rect to do the transition from
                        .openFrom({
                            top: -50,
                            width: 30,
                            height: 80
                        })
                        .closeTo({
                            left: 1500
                        })
                );
            }


        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    Facebook.getLoginStatus(function (response) {
        if (response.status === 'connected') {

            $scope.loginStatus = response.status;
            Facebook.api('/me/accounts', {
                fields: 'id,name,category,picture.type(large),fan_count,overall_star_rating,link'
            }, function (response) {
                if (response) {
                    $scope.ums = response.data;
                    angular.forEach($scope.ums, function (value, key) {
                        if ($scope.dbUms.indexOf(value.id) !== -1) {
                            $scope.addedUms.push(value);
                        }
                        else {
                            $scope.fbUms.push(value);
                        }
                    }
                    );
                } else {
                    //FlashService.Error(response.message);

                }

            });
           
        } else {
            Facebook.login(function (response) {
                if (response.status === 'connected') {

                    $scope.loginStatus = response.status;
                    Facebook.api('/me/accounts', {
                        fields: 'id,name,category,picture.type(large),fan_count,overall_star_rating,link'
                    }, function (response) {
                        if (response) {
                            $scope.ums = response.data;
                            angular.forEach($scope.ums, function (value, key) {
                                if ($scope.dbUms.indexOf(value.id) !== -1) {
                                    $scope.addedUms.push(value);
                                }
                                else {
                                    $scope.fbUms.push(value);
                                }
                            }
                            );
                        } else {
                            //FlashService.Error(response.message);

                        }

                    });

                } else {
                    //FlashService.Error(response.message);

                }
            }, { scope: 'manage_pages,pages_show_list,publish_actions' });
        };
        }
    );
    
   

    umsFactory.getUms($scope.uid).then(
        // callback function for successful http request
        function success(response) {
            $scope.dbUms = response.data;
            

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.addPage = function () {
        var obj = this.s;
        umsFactory.addUms(obj.id, obj.link, $scope.uid).then(
            // callback function for successful http request
            function success(response) {
                $scope.addedUms.push(obj);
                var index = $scope.fbUms.indexOf(obj);
                $scope.fbUms.splice(index, 1);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Marketing Source Added')
                        .action('CLOSE')
                        .position('bottom left')
                        .theme('success-toast')
                        .hideDelay(3000)
                );
                
            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    };
    $scope.deletePage = function () {
        var obj = this.source;
        umsFactory.deleteUms(obj.id, $scope.uid).then(
            // callback function for successful http request
            function success(response) {
                if (response.data === -1) {
                    $scope.fbUms.push(obj);
                    var index = $scope.addedUms.indexOf(obj);
                    $scope.addedUms.splice(index, 1);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Marketing Source Removed')
                            .action('CLOSE')
                            .position('bottom left')
                            .theme('success-toast')
                            .hideDelay(3000)
                    );
                }
                else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Cannot Delete Only Marketing Source')
                            .action('CLOSE')
                            .position('bottom left')
                            .theme('error-toast')
                            .hideDelay(3000)
                    );

                }

            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    };


    $scope.openModal = function (id) {
      
        ModalService.Open(id);
    }

    $scope.closeModal = function (id) {
        ModalService.Close(id);
    }
}