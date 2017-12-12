
var controllerId = 'mainController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', 'articleFactory', 'sessionFactory', 'umsFactory', 'ModalService', mainController]);

function mainController($scope,  $rootScope, $cookies, articleFactory, sessionFactory, umsFactory, ModalService,) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
   
    $scope.articles = [];
    $scope._category = 'premium';
    $scope._sub_category = 'Political';

    $scope.order = [{ label: 'Recent', value: 'modified_date' }, { label: 'Featured', value:'views'}, { label: 'Most Shared', value: 'shares'}];

    $scope.selectedOrder = $scope.order[0].value;

  
    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = item;
    }

}