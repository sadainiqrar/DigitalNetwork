	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('trafficController',function($scope,sessionFactory) {
    // create a message to display in our view
    var d=new Date()
    $scope.to = new Date();
    d.setDate(d.getDate() - 7);
    $scope.from = d;
 
    $scope.message = 'traffic controller!';

    $scope.check = function () {
        sessionFactory.Session($scope.from, $scope.to).then(
            // callback function for successful http request
            function success(response) {
                $scope.session = response.data;
            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );

        sessionFactory.Session_campaign($scope.from, $scope.to).then(
            // callback function for successful http request
            function success(response) {
                $scope.sessions = response.data;
            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    }

    $scope.check();


	});