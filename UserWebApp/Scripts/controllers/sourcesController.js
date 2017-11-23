
var controllerId = 'sourcesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', 'Facebook', '$rootScope', '$cookies','umsFactory', 'ModalService', sourcesController]);

function sourcesController($scope, Facebook, $rootScope, $cookies, umsFactory, ModalService) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.dbUms = [];
    $scope.addedUms = [];
    $scope.fbUms = [];
    $scope.ums = [];
    $scope.bodyText = 'This text can be updated in modal 1';


    Facebook.api('/me/accounts', {
        fields: 'id,name,category,fan_count,rating_count'
    }, function (response) {
        if (response) {
            $scope.ums = response.data;

        } else {
            //FlashService.Error(response.message);

        }

    });


    umsFactory.getUms($scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.dbUms = response.data;
            angular.forEach($scope.ums, function (value, key) {
                if ($scope.dbUms.indexOf(value.id) !== -1) {
                    $scope.addedUms.push(value);
                }
                else {
                    $scope.fbUms.push(value);
                }
            }
            );

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.addPage = function () {
        umsFactory.addUms(this.s.id, $scope.uid).then(
            // callback function for successful http request
            function success(response) {
                $scope.addedUms.push(this.s);
                var index = $scope.fbUms.indexOf(this.s);
                $scope.fbUms.splice(index, 1);
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