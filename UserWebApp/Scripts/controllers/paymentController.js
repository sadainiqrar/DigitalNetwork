var controllerId = 'paymentController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$state', '$rootScope', '$cookies', 'paymentFactory','$mdToast', paymentController]);

function paymentController($scope, $state, $rootScope, $cookies, paymentFactory, $mdToast) {
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

    paymentFactory.get_payment_details($scope.uid,$scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.totalTraffic = response.data.total_traffic;
            $scope.totalEarned = response.data.total_earned;
            $scope.lastPayment = response.data.last_paid;
            $scope.availablePayment = response.data.available;

            $scope.unpaidTraffic = response.data.unpaid_traffic;
       
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    paymentFactory.payment_history($scope.uid).then(
        // callback function for successful http request
        function success(response) {
            $scope.history = response.data;
          

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    $scope.makePayment = function () {
        if ($scope.availablePayment >= 10) {
            paymentFactory.make_payment($scope.uid, $scope.unpaidTraffic, $scope.availablePayment).then(
                // callback function for successful http request
                function success(response) {



                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );
        }
        else
        {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Withdrawal Must be atleast $10')
                    .action('CLOSE')
                    .position('bottom left')
                    .theme('error-toast')
                    .hideDelay(3000)
            );
        }
    }
    $scope.abbreviate = function (n) {
        n =  parseInt(n);
        n = n * 541231587;
        var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
        var suffix = 'KMBT'[base - 1];
        return suffix ? roundWithPrecision(n / Math.pow(1000, base), 2) + suffix : '' + n;
    }
    function roundWithPrecision(n, precision) {
        var prec = Math.pow(10, precision);
        return Math.round(n * prec) / prec;
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