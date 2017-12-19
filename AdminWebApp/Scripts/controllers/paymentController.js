var controllerId = 'paymentController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope','$state', '$rootScope', '$cookies', 'paymentFactory', paymentController]);

function paymentController($scope,$state,$rootScope,$cookies, paymentFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    var d = new Date()
    $scope.to = new Date();
    d.setDate(d.getDate() - 7);
    $scope.from = d;
    $scope.totalTraffic = 0;
    $scope.totalEarned = 0;
    $scope.lastPayment = 0;
    $scope.availablePayment = 0;
    $scope.unpaidTraffic = 0;
    $scope.history = [];

    $scope.changeClass = function ()
    {
        $scope.$parent.active = "/statistics";
        $state.go('dashboard.statistics');
    }

   


}

angular.module('DigitalMarket').filter('dateFilter', function () {
    return function (items, fromDate, toDate) {
        var filtered = [];
        var from_date = Date.parse(fromDate);
        var to_date = Date.parse(toDate);
        // If time is with the range
        angular.forEach(items, function (value, key) {
            if (Date.parse(value.payment_date) >= from_date && Date.parse(value.payment_date) <= to_date) {
                filtered.push(value);
            }
        });
        return filtered;
    };
});