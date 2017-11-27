var controllerId = 'articlestatsController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope','$stateParams', 'singleArticleFactory', articlestatsController]);

function articlestatsController($scope, $stateParams, singleArticleFactory) {
    var serial = $stateParams.serial;
    singleArticleFactory.getArticle(serial).then(
        // callback function for successful http request
        function success(response) {
            $scope.article = response.data;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.chart = {
    "chart2": {
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

            axisType: 'linear',
                min: 1,
                    max: 32
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
            collectionAlias: 'Traffic and revenue generated',
            data: [100, 320, 453, 234, 553, 665, 345, 123, 432, 545, 654, 345, 332, 456, 234, 100, 320, 453, 234, 553, 665, 345, 123, 432, 545, 654, 345, 332, 456, 234, 400, 300]
        }]
    },
    "chart3": {
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
            categoricalValues: ["AMERICA", "UK", "ITALY", "TURKEY", "FRANCE"]
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
            data: [3000, 2020, 1453, 1234, 553]
        }]
    }
}
    

}
angular.module('DigitalMarket')
    .directive('myCustomChartControl', function () {
        return {
            restrict: 'E',
            template: '',
            controller: function ($scope, $element, $attrs) {
                $('<div id="' + $attrs.id + '"></div>')
                    .appendTo($element)
                    .shieldChart($scope.chart[$attrs.id]);
            }
        };
    });