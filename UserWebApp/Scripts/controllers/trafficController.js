

var controllerId = 'trafficController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', 'sessionFactory', 'statisticsFactory', trafficController]);

function trafficController($scope, $rootScope, $cookies, sessionFactory, statisticsFactory) {
   

    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    var d = new Date()
    $scope.to = new Date();
    d.setDate(d.getDate() - 7);
    $scope.from = d;
    $scope.userStat = [];
    $scope.isLoading = true;
    $scope.monthlyIsLoading = true;
    $scope.dailyIsLoading = true;
    $scope.monthlyTrafficIsLoading = true;

    statisticsFactory.get_statistics($scope.uid, $scope.from, $scope.to, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.userStat = response.data;
       
          
            angular.forEach($scope.userStat, function (value, key) {
                value.total_traffic = value.premium + value.non_premium;
                value.day = dateParser(value.day);
                sessionFactory.getRate("premium").then(
                    // callback function for successful http request
                    function success(response) {
                        value.total_earning = value.total_earning + ((value.premium / 1000) * response.data[0].rate);


                    },
                    // callback function for error in http request
                    function error(response) {
                        // log errors
                    }
                );
                sessionFactory.getRate("non-premium").then(
                    // callback function for successful http request
                    function success(response) {
                        value.total_earning = value.total_earning + ((value.non_premium / 1000) * response.data[0].rate);
                        $scope.isLoading = false;

                    },
                    // callback function for error in http request
                    function error(response) {
                        // log errors
                        $scope.isLoading = false;
                    }
                );

            });

            $scope.isLoading = false;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
            $scope.isLoading = false;
        }
    );


    sessionFactory.getCurrentMonthSession($scope.uid, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.sessions = response.data.premium + response.data.non_premium;
            $scope.monthlyTrafficIsLoading = false;
            $scope.monthly_earned = 0.0;
            var premium = response.data.premium;
            var non_premium = response.data.non_premium;
            sessionFactory.getRate("premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.monthly_earned = $scope.monthly_earned + ((premium / 1000) * response.data[0].rate);


                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );
            sessionFactory.getRate("non-premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.monthly_earned = $scope.monthly_earned + ((non_premium / 1000) * response.data[0].rate);
                   
                    $scope.monthlyIsLoading = false;
                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                    $scope.monthlyIsLoading = false;
                }
            );

        },
        // callback function for error in http request
        function error(response) {
            $scope.monthlyIsLoading = false;
            $scope.monthlyTrafficIsLoading = false;
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
                    $scope.today_earned = $scope.today_earned + ((premium / 1000) * response.data[0].rate);


                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );
            sessionFactory.getRate("non-premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.today_earned = $scope.today_earned + ((non_premium / 1000) * response.data[0].rate);

                    $scope.dailyIsLoading = false;
                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                    $scope.dailyIsLoading = false;
                }
            );

        },
        // callback function for error in http request
        function error(response) {
            // log errors
            $scope.dailyIsLoading = false;
        }
    );

    $scope.stats = function ()
    {
        $scope.isLoading = true;
        statisticsFactory.get_statistics($scope.uid, $scope.from, $scope.to, $scope.id).then(
            // callback function for successful http request
            function success(response) {
                $scope.userStat = response.data;

                angular.forEach($scope.userStat, function (value, key) {
                    value.total_traffic = value.premium + value.non_premium;
                    value.day = dateParser(value.day);

                    sessionFactory.getRate("premium").then(
                        // callback function for successful http request
                        function success(response) {
                            value.total_earning = value.total_earning + ((value.premium / 1000) * response.data[0].rate);


                        },
                        // callback function for error in http request
                        function error(response) {
                            // log errors
                        }
                    );
                    sessionFactory.getRate("non-premium").then(
                        // callback function for successful http request
                        function success(response) {
                            value.total_earning = value.total_earning + ((value.non_premium / 1000) * response.data[0].rate);
                            $scope.isLoading = false;

                        },
                        // callback function for error in http request
                        function error(response) {
                            // log errors
                            $scope.isLoading = false;
                        }
                    );

                });

                $scope.isLoading = false;
            },
            // callback function for error in http request
            function error(response) {
                $scope.isLoading = false;
                // log errors
            }
        );



    }


    function dateParser(str) {
    
        var day = str.slice(6, 8);
        var month = str.slice(4, 6);
        var year = str.slice(0, 4);
        return new Date(year + '/' + month + '/' + day).toDateString();
     
    }


}