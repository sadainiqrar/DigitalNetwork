var controllerId = 'articlestatsController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', '$stateParams', 'graphFactory', articlestatsController]);

function articlestatsController($scope, $rootScope, $cookies, $stateParams, graphFactory) {
    var serial = $stateParams.serial;
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.totalTraffic = 0;
    $scope.totalEarned = 0;

    var d = new Date()
    $scope.to = new Date();
    d.setDate(d.getDate() - 7);
    $scope.from = d;
    $scope.extra = 'week';
    $scope.step = 0;
    $scope.trafficData = [];
    $scope.trafficDate = [];
    $scope.earnedData = [];
    $scope.countryData = [];
    $scope.countrySessions = [];

    graphFactory.getArticle(serial).then(
        // callback function for successful http request
        function success(response) {
            $scope.article = response.data;
            graphFactory.getTotal($scope.uid, $scope.id, $scope.article.site_url, $scope.article.url).then(
                // callback function for successful http request
                function success(response) {
                    $scope.totalTraffic = response.data.sessions;
                    $scope.totalEarned = response.data.earned;
                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );
          

           

            graphFactory.getCountryGraph($scope.id, $scope.article.site_url, $scope.article.url, $scope.from, $scope.to).then(
                // callback function for successful http request
                function success(response) {
                    angular.forEach(response.data, function (value, key) {
                        $scope.countryData.push(value.country);
                        $scope.countrySessions.push(parseInt(value.sessions));
                    });

                    graphFactory.getTrafficGraph($scope.id, $scope.article.site_url, $scope.article.url, $scope.from, $scope.to, $scope.extra).then(
                        // callback function for successful http request
                        function success(response) {

                            angular.forEach(response.data, function (value, key) {
                                $scope.trafficDate.push(value.dateTime);
                                $scope.trafficData.push(parseInt(value.sessions));
                                $scope.earnedData.push(value.earned);
                            });

                            $scope.chart["chart3"] = {
                                theme: "light",
                                backgroundColor: '#f8f8f8',
                                primaryHeader: {
                                    text: "Traffic overview"
                                },
                                exportOptions: {
                                    image: false,
                                    print: false
                                },
                                isInverted: true,
                                axisX: {
                                    categoricalValues: $scope.countryData
                                },
                                tooltipSettings: {
                                    chartBound: true,
                                    axisMarkers: {
                                        enabled: true,
                                        mode: 'x'
                                    }
                                },
                                dataSeries: [{
                                    seriesType: 'bar',
                                    backgroundColor: '#f8f8f8',
                                    color: '#4587d9',
                                    collectionAlias: "Traffic from Country",
                                    data: $scope.countrySessions
                                }]
                            }
                            $scope.chart["chart2"] = {
                                theme: 'light',
                                backgroundColor: '#f8f8f8',
                                primaryHeader: {
                                    text: 'Earning overview'
                                },
                                exportOptions: {
                                    image: false,
                                    print: false
                                },

                                axisX: {
                                    axisTickText: {
                                        step: $scope.step
                                    },
                                    categoricalValues: $scope.trafficDate
                                },
                                tooltipSettings: {
                                    chartBound: true,
                                    axisMarkers: {
                                        enabled: true,
                                        mode: 'xy'
                                    }
                                },
                                dataSeries: [{
                                    seriesType: 'splinearea',
                                    color: '#9539ca',
                                    collectionAlias: 'Traffic generated',
                                    data: $scope.trafficData
                                }, {
                                    seriesType: 'splinearea',
                                    color: '#800000',
                                    collectionAlias: 'Revenue generated',
                                    data: $scope.earnedData
                                }]
                            }

                            $scope.$broadcast('success');
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
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.chart = {
}

    
    $scope.makeActive = function (item) {
        $scope.extra = $scope.extra === item ? item : item;
        var d = new Date();
        if ($scope.extra === 'week')
            {
        d.setDate(d.getDate() - 7);
        $scope.from = d;
        $scope.step = 0;
        }
        else if ($scope.extra === 'month')
        {
            d.setDate(d.getDate() - 30);
            $scope.from = d;

            $scope.step = 4;
        }
        else if ($scope.extra === 'year') {
            d.setDate(d.getDate() - 365);
            $scope.from = d;

            $scope.step = 1;
        }

        graphFactory.getCountryGraph($scope.id, $scope.article.site_url, $scope.article.url, $scope.from, $scope.to).then(
            // callback function for successful http request
            function success(response) {
                $scope.countryData = [];
                $scope.countrySessions = [];
                angular.forEach(response.data, function (value, key) {
                    $scope.countryData.push(value.country);
                    $scope.countrySessions.push(parseInt(value.sessions));
                });

                graphFactory.getTrafficGraph($scope.id, $scope.article.site_url, $scope.article.url, $scope.from, $scope.to, $scope.extra).then(
                    // callback function for successful http request
                    function success(response) {
                        $scope.trafficDate = [];
                        $scope.trafficData = [];
                        $scope.earnedData = [];
                        angular.forEach(response.data, function (value, key) {
                            $scope.trafficDate.push(value.dateTime);
                            $scope.trafficData.push(parseInt(value.sessions));
                            $scope.earnedData.push(value.earned);
                        });
                        $scope.chart["chart3"] = {
                            theme: "light",
                            backgroundColor: '#f8f8f8',
                            primaryHeader: {
                                text: "Traffic overview"
                            },
                            exportOptions: {
                                image: false,
                                print: false
                            },
                            isInverted: true,
                            axisX: {
                                categoricalValues: $scope.countryData
                            },
                            tooltipSettings: {
                                chartBound: true,
                                axisMarkers: {
                                    enabled: true,
                                    mode: 'x'
                                }
                            },
                            dataSeries: [{
                                seriesType: 'bar',
                                backgroundColor: '#f8f8f8',
                                color: '#4587d9',
                                collectionAlias: "Traffic from Country",
                                data: $scope.countrySessions
                            }]
                        }
                        $scope.chart["chart2"] = {
                            theme: 'light',
                            backgroundColor: '#f8f8f8',
                            primaryHeader: {
                                text: 'Earning overview'
                            },
                            exportOptions: {
                                image: false,
                                print: false
                            },

                            axisX: {
                                axisTickText: {
                                    step: $scope.step
                                },
                                categoricalValues: $scope.trafficDate,
                                offset: 4
                            },
                            tooltipSettings: {
                                chartBound: true,
                                axisMarkers: {
                                    enabled: true,
                                    mode: 'xy'
                                }
                            },
                            dataSeries: [{
                                seriesType: 'splinearea',
                                color: '#9539ca',
                                collectionAlias: 'Traffic generated',
                                data: $scope.trafficData
                            }, {
                                seriesType: 'splinearea',
                                color: '#800000',
                                collectionAlias: 'Revenue generated',
                                data: $scope.earnedData
                            }]
                        }

                        $scope.$broadcast('success1');
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