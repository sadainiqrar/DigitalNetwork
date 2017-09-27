"use strict";

// create the module and name it scotchApp
var DigiApp = angular.module('DigitalMarket', ['ngRoute']);

	// configure our routes

DigiApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'Views/Dashboard/home.html',
                controller: 'dashboardController'
            })
            .when('/realtime', {
                templateUrl: 'Views/Dashboard/realtime.html',
                controller: 'realtimeController'
            })
            .when('/traffic', {
                templateUrl: 'Views/Dashboard/traffic.html',
                controller: 'trafficController'
            })
            .when('/userdata', {
                templateUrl: 'Views/Dashboard/userdata.html',
                controller: 'userdataController'
            })
            .when('/articles', {
                templateUrl: 'Views/Dashboard/articles.html',
                controller: 'articlesController'
            })
            .otherwise({ redirectTo: '/' });
    }]);
	// create the controller and inject Angular's $scope
//var mycontroller = function ($scope, $http, NgMap) {
//    $scope.message = "Hello World!";
//};

//scotchApp.controller('dashboardController', ['$scope', '$http', mycontroller]);
DigiApp.controller('dashboardController', function ($scope) {
    $scope.message = 'Look! I am an home page.';
});

DigiApp.controller('realtimeController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});
DigiApp.controller('userdataController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
    });
DigiApp.controller('trafficController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});
DigiApp.controller('articlesController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});
	