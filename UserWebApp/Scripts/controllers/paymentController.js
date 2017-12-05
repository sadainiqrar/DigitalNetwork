var controllerId = 'paymentController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', 'paymentFactory', paymentController]);

function paymentController($scope,$rootScope,$cookies, paymentFactory) {
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
        if ($scope.availablePayment > 4) {
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
            alert("Error!:you can withdraw earned amount only greater than 5$.")
        }
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