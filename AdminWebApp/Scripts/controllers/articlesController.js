var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', 'Facebook', 'clipboard', '$state', '$rootScope', '$cookies', 'articleFactory', 'umsFactory' ,'ModalService', 'sessionFactory', articlesController]);

function articlesController($scope, Facebook, clipboard, $state, $rootScope, $cookies, articleFactory, umsFactory, ModalService, sessionFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.message = 'Articles Controller';
    $scope.shared_articles = [];
    $scope.addedUms = [];
    $scope.ums = [];

    $scope.trafficloading = true;
    $scope.earnedloading = true;
    $scope.umsloading = true;


    $scope.order = [{ label: 'Recent', value: 'modified_date' }, { label: 'Top Articles', value: 'views' }];

    $scope.selectedOrder = $scope.order[1].value;

    $scope._category = 'premium';
    $scope._sub_category = 'Political';

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = item;
    }
    $scope.reroute = function ()
    {
        $state.go('dashboard.articlestats', { serial: this.article.serial_no });
    }
}