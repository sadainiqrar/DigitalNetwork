
// 'use strict'// create the module and name it scotchApp
// var loginApp = angular.module('loginApp',['ui-router']);
var scotchApp = angular.module('DigitalMarket', ['ui.router', 'ngRoute', 'ngCookies', 'ngSanitize', 'ngMaterial', 'google-signin']);
// configure our routes


scotchApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'GoogleSigninProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, GoogleSigninProvider) {


    GoogleSigninProvider.init({
        client_id: '122077380940-vn0cl0ece9gk4bcc40nrnlhpki93dsc5.apps.googleusercontent.com',

    });


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

        .state('dashboard.traffic', {
            url: '/traffic',
            templateUrl: 'Views/Dashboard/traffic.html',
            controller: 'trafficController'
        })
        .state('dashboard.articles', {
            url: '/articles',
            templateUrl: 'Views/Dashboard/articles.html',
            controller: 'articlesController'
        })
        .state('dashboard.userdata', {
            url: '/userdata',
            templateUrl: 'Views/Dashboard/userdata.html',
            controller: 'userdataController'
        })
        .state('dashboard.payment', {
            url: '/payment',
            templateUrl: 'Views/Dashboard/payment.html',
            controller: 'paymentController'
        })

        .state('dashboard.articlestats', {
            url: '/articlestats/:id',
            templateUrl: 'Views/Dashboard/articlestats.html',
            controller: 'articlestatsController'
        })


        .state('home', {
            abstract: true,
            templateUrl: 'Views/Dashboard/Home/login.html'
        })
        // route for the home page
        .state('home.login', {
            url: '/',
            templateUrl: 'Views/Dashboard/Home/login.view.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'Views/Dashboard/Home/register.view.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        });


}]);

scotchApp.run(run);

run.$inject = ['$rootScope', '$location', '$state', '$cookies', '$http'];
function run($rootScope, $location, $state, $cookies, $http) {

    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/');
        }
        else if (!restrictedPage && loggedIn) {

            $location.path("/dashboard");
        }


    });
}




