

var controllerId = 'trafficController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', 'sessionFactory', 'statisticsFactory', trafficController]);

function trafficController($scope, $rootScope, $cookies, sessionFactory, statisticsFactory) {
   

    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;

    $scope.id = $scope.userdata.email;
    $scope.custom = $scope.userdata.currentSite.custom;
    $scope.site = $scope.userdata.currentSite.site_url;


    var d = new Date()
    $scope.to = new Date();
    d.setDate(d.getDate() - 7);
    $scope.from = d;
    $scope.adminStats = [];
    $scope.MonthTraffic = '0';
    $scope.TodayTraffic = '0';
    $scope.MonthExpense = 0;

    $scope.trafficData = [];
    $scope.trafficDate = [];
    $scope.isLoading = true;
    $scope.monthlyIsLoading = true;
    $scope.dailyIsLoading = true;
    $scope.monthlyTrafficIsLoading = true;

    var element = angular.element(document.getElementById('parha'));
    $scope.width = element[0].clientWidth - 15;
    $scope.graph;
    $scope.chart = {};
  
    $scope.MapSource = {
        chart: {
            animation: "0",
            showbevel: "0",
            usehovercolor: "1",
            canvasbordercolor: "FFFFFF",
            theme: "fint",
            bordercolor: "000000",
            showlegend: "1",
            showshadow: "0",
            caption: "Traffic for Last 30 Days",
            connectorcolor: "000000",
            fillalpha: "80",
            showlabels: "0",
            showborder: "1"
        },
        colorrange: {
            minvalue: "0",
            startlabel: "Low",
            endlabel: "High",
            code: "e40000",
            gradient: "0",
            color: [
                {
                    maxvalue: "10",
                    displayvalue: "Average",
                    code: "0ad60e"
                },
                {
                    
                    maxvalue: "50",
                    code: "0700e4"
                }
            ],
            maxvalue: 0
        },
        data: []
    }


    sessionFactory.getCurrentMonthSession($scope.userdata.currentSite.ga_id, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.MonthTraffic = response.data.sessions;
            $scope.MonthExpense = response.data.earned;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    sessionFactory.getCurrentDaySession($scope.userdata.currentSite.ga_id, $scope.id).then(
        // callback function for successful http request
        function success(response) {

            $scope.TodayTraffic = response.data.sessions;


        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );


    statisticsFactory.get_graph_statistics($scope.userdata.currentSite.ga_id, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.graph = response.data;
            angular.forEach(response.data.graph, function (value, key) {
                $scope.trafficDate.push(value.dateTime);
                $scope.trafficData.push(parseInt(value.sessions));
            });
            $scope.chart["chart3"] = {
                theme: 'light',
                backgroundColor: 'transparent',
                primaryHeader: {
                    text: 'Traffic overview'
                },
                exportOptions: {
                    image: false,
                    print: false
                },

                axisX: {
                    axisTickText: {
                        step: 5
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
                    seriesType: 'line',
                    collectionAlias: 'Traffic generated',
                    data: $scope.trafficData
                }]
            }


            $scope.$broadcast('success');
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }

    );




    statisticsFactory.get_statistics($scope.userdata.currentSite.ga_id, $scope.from, $scope.to , $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.adminStats = response.data;
  
         


        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }

    );






    statisticsFactory.get_map($scope.id, $scope.userdata.currentSite.ga_id).then(
        // callback function for successful http request
        function success(response) {
            $scope.MapSource.data = response.data.mapData;
            $scope.MapSource.colorrange.color[0].maxvalue = response.data.avg;
            $scope.MapSource.colorrange.color[1].maxvalue = response.data.max;
            $scope.MapSource.colorrange.minvalue = response.data.min

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }

    );
    function dateParser(str) {
    
        var day = str.slice(6, 8);
        var month = str.slice(4, 6);
        var year = str.slice(0, 4);
        return new Date(year + '/' + month + '/' + day).toDateString();
     
    }
    $scope.getStats = function()
    {
        statisticsFactory.get_statistics($scope.userdata.currentSite.ga_id, $scope.from, $scope.to, $scope.id).then(
            // callback function for successful http request
            function success(response) {
                $scope.adminStats = response.data;




            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }

        );
    }

}

