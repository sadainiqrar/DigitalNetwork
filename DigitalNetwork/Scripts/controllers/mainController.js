	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('mainController', function ($scope, sessionFactory, articleFactory, $rootScope, $cookies) {
    $rootScope.globals = $cookies.getObject('globals') || {};
		// create a message to display in our view
    $scope.userdate = $rootScope.globals.currentUser;
    $scope.email = $scope.userdate.email;
    $scope.csession = [];
    $scope.psession = [];
    sessionFactory.getSession().then(
        // callback function for successful http request
        function success(response) {
            $scope.sessions = response.data;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    sessionFactory.getSession_campaign().then(
        // callback function for successful http request
        function success(response) {
            $scope.csessions = response.data;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    
    sessionFactory.getSession_page().then(
        // callback function for successful http request
        function success(response) {
            $scope.psessions = response.data;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    
        $scope.articles = [];
        articleFactory.getArticles().then(
            // callback function for successful http request
            function success(response) {
                $scope.articles = response.data;

            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
	});