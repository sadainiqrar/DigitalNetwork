




var controllerId = 'mainController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', 'articleFactory', 'sessionFactory', mainController]);

function mainController($scope, $rootScope, $cookies, articleFactory, sessionFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    //// create a message to display in our view
    //  $scope.userdata = $rootScope.globals.currentUser;
    //  $scope.email = $scope.userdata.email;



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
    sessionFactory.getRate().then(
        // callback function for successful http request
        function success(response) {
            $scope.rate = response.data;

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );


    sessionFactory.getCurrentMonthSession().then(
        // callback function for successful http request
        function success(response) {
            $scope.sessions = response.data;

            $scope.monthly_earned = sessionFactory.getSessionRate($scope.sessions, $scope.rate[0].rate);

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    sessionFactory.getCurrentDaySession().then(
        // callback function for successful http request
        function success(response) {
            $scope.session = response.data;
            $scope.today_earned = sessionFactory.getSessionRate($scope.session, $scope.rate[0].rate);


        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.insertShared = function () {
        articleFactory.insertSharedArticles('12345', this.article.serial_no).then(
            // callback function for successful http request
            function success(response) {
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



            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    }
    $scope.insertCopied = function () {
        articleFactory.insertCopiedArticles('12345', this.article.serial_no).then(
            // callback function for successful http request
            function success(response) {
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



            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    }

}