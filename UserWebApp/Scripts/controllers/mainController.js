
var controllerId = 'mainController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', 'articleFactory', 'sessionFactory', mainController]);

function mainController($scope, $rootScope, $cookies, articleFactory, sessionFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
   
    $scope.articles = [];
    $scope._category = 'premium';
    $scope._sub_category = 'Political';


  
    articleFactory.getArticles($scope.uid, $scope._category, null).then(
        // callback function for successful http request
        function success(response) {
            $scope.articles = response.data;
            angular.forEach($scope.articles, function (value,key) {
                articleFactory.getViewShares(value.site_url, value.modified_date, value.url).then(
                    // callback function for successful http request
                    function success(response) {
                        value.views = response.data;
                    },
                    // callback function for error in http request
                    function error(response) {
                        value.views = "-1";
                        //// log errors
                    }

                );
                }
            );

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    
    );


    sessionFactory.getCurrentMonthSession($scope.uid, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.sessions = response.data.premium + response.data.non_premium;
            $scope.monthly_earned = 0.0;
            var premium = response.data.premium;
            var non_premium = response.data.non_premium;
            sessionFactory.getRate("premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.monthly_earned = $scope.monthly_earned + ((premium/1000) * response.data[0].rate);


                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );
            sessionFactory.getRate("non-premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.monthly_earned = $scope.monthly_earned + ((non_premium/1000) * response.data[0].rate);


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
    sessionFactory.getCurrentDaySession($scope.uid, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.today_earned = 0.0;
            var premium = response.data.premium;
            var non_premium = response.data.non_premium;
            sessionFactory.getRate("premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.today_earned = $scope.today_earned + ((premium/1000) * response.data[0].rate);


                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );
            sessionFactory.getRate("non-premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.today_earned = $scope.today_earned + ((non_premium/1000) * response.data[0].rate);


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

    $scope.insertShared = function () {
        articleFactory.insertSharedArticles($scope.uid , this.article.serial_no).then(
            // callback function for successful http request
            function success(response) {
                articleFactory.getArticles($scope.uid, $scope._category, null).then(
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
        articleFactory.insertCopiedArticles($scope.uid , this.article.serial_no).then(
            // callback function for successful http request
            function success(response) {
                articleFactory.getArticles($scope.uid, $scope._category, null).then(
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
    //$scope.premium = function () {
    //    $scope.category = 'premium';
    //    articleFactory.getArticles($scope.uid, $scope.category, null).then(
    //        // callback function for successful http request
    //        function success(response) {
    //            $scope.articles = response.data;

    //        },
    //        // callback function for error in http request
    //        function error(response) {
    //            // log errors
    //        }
    //    );
    //}
    //$scope.non_premium = function () {

    //    $scope.category = 'non_premium';
    //    articleFactory.getArticles($scope.uid, $scope.category, null).then(
    //        // callback function for successful http request
    //        function success(response) {
    //            $scope.articles = response.data;

    //        },
    //       //  callback function for error in http request
    //        function error(response) {
    //            // log errors
    //        }
    //    );
    //}

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = $scope.active === item ? item : item;
    }

}