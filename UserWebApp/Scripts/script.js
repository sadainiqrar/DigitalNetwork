
   // 'use strict'// create the module and name it scotchApp
   // var loginApp = angular.module('loginApp',['ui-router']);
var scotchApp = angular.module('DigitalMarket', ['ui.router', 'ngRoute', 'ng.epoch', 'ngCookies', 'ngSanitize', 'ngMaterial', 'facebook', 'angular-clipboard','ngAvatar']);
	// configure our routes


scotchApp.config(['$stateProvider', 'FacebookProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function ($stateProvider, FacebookProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
  
        FacebookProvider.init('141614143143756');
      
        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.theme('success-toast');
        $stateProvider
        // route for the home page
        .state('dashboard', {
            abstract: true,
            templateUrl: 'Views/Dashboard/dashboard.html',
            controller: 'dashboardController'
        })
        .state('dashboard.home', {
            url: '/dashboard',
            templateUrl: 'Views/Dashboard/home.html',
            controller: 'mainController'
        })


        // route for the about page
        .state('dashboard.realtime', {
            url: '/realtime',
            templateUrl: 'Views/Dashboard/realtime.html',
            controller: 'realtimeController'
        })

        .state('dashboard.statistics', {
            url: '/statistics',
            templateUrl: 'Views/Dashboard/statistics.html',
            controller: 'trafficController'
        })
        .state('dashboard.articles', {
            url: '/articles',
            templateUrl: 'Views/Dashboard/articles.html',
            controller: 'articlesController'
        })
        .state('dashboard.marketingsources', {
            url: '/marketingsources',
            templateUrl: 'Views/Dashboard/sources.html',
            controller: 'sourcesController'
        })
        .state('dashboard.payment', {
            url: '/payment',
            templateUrl: 'Views/Dashboard/payment.html',
            controller: 'paymentController'
        })

        .state('dashboard.articlestats', {
            url: '/articlestats/:serial',
            templateUrl: 'Views/Dashboard/articlestats.html',
            controller: 'articlestatsController',
            
        })


        .state('home', {
            abstract: true,
            templateUrl: 'Views/Dashboard/Home/login.html'
        })
        // route for the home page
        .state('home.login', {
            url: '/',
            templateUrl: 'Views/Dashboard/Home/login.view.html',
            controller: 'LoginController'
           
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'Views/Dashboard/Home/register.view.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
            });

        $locationProvider.html5Mode(true).hashPrefix('#!/');
    
        

	}]);

scotchApp.constant('apiUrl', 'http://localhost:3208/');
scotchApp.constant('chatUrl', 'http://localhost:3000');
    scotchApp.run(run);

    run.$inject = ['$rootScope', 'Facebook', 'realtimeHubProxy', 'AuthenticationService', '$location', '$state', '$cookies', '$http'];
    function run($rootScope, Facebook, realtimeHubProxy, AuthenticationService, $location, $state, $cookies, $http) {
        
        $rootScope.realtimeDataHub = realtimeHubProxy("http://localhost:3208/", 'RealtimeHub');

        //$scope.realtimeLineFeed = entry;


        $rootScope.realtimeDataHub.on('broadcastData', function (data) {
            var timestamp = ((new Date()).getTime() / 1000) | 0;
            $rootScope.realtimeValue = data; 
        });


        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
             // redirect to login page if not logged in and trying to access a restricted page


            Facebook.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token 
                    // and signed request each expire
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                    AuthenticationService.ClearCredentials();
                    $state.go('home.login');
                } else {
                    // the user isn't logged in to Facebook.
                    AuthenticationService.ClearCredentials();
                    $state.go('home.login');
                }
            });


            var restrictedPage = $.inArray($location.path(), ['/']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
         
           
            if (restrictedPage && !loggedIn) {
                $location.path('/');
            }
            else if (loggedIn) {
                AuthenticationService.GetStatus($rootScope.globals.currentUser.uid).then(
                    // callback function for successful http request
                    function success(response) {
                        if (response.data != 'verified') {
                            $location.path("/marketingsources");
                        } 
                            
                       
                    },
                    // callback function for error in http request
                    function error(response) {
                        // log errors
                    }
                );
            }

            
        });
    }

 


