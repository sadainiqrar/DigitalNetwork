
   // 'use strict'// create the module and name it scotchApp
   // var loginApp = angular.module('loginApp',['ui-router']);
var scotchApp = angular.module('DigitalMarket', ['ui.router', 'ngCookies','ngSanitize','ngMaterial']);
	// configure our routes
scotchApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$rootScopeProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $rootScopeProvider) {


    $rootScopeProvider.digestTtl(100);



    $stateProvider

			// route for the home page
			.state('dashboard', {                   
                abstract    : true,
                templateUrl: 'Views/Dashboard/dashboard.html' ,
                controller  : 'dashboardController'
			})
            .state('dashboard.home', {
                url         : '/dashboard',
                templateUrl: 'Views/Dashboard/home.html',
				controller  : 'mainController'
            })


            .state('userDashboard', {
                abstract: true,
                templateUrl: 'Views/Dashboard/UserDashboard/userdashboard.html',
                controller: 'userDashboardController'
            })
            .state('userDashboard.home', {
                url: '/user/dashboard',
                templateUrl: 'Views/Dashboard/UserDashboard/userhome.html',
                controller: 'userMainController'
            })


			// route for the about page
			.state('dashboard.realtime', {
                url         : '/realtime',
                templateUrl: 'Views/Dashboard/realtime.html',
				controller  : 'realtimeController'
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
                abstract    : true,
                templateUrl: 'Views/Dashboard/Home/login.html'
			})
			// route for the home page
			.state('home.login', {
                url         : '/',
                templateUrl: 'Views/Dashboard/Home/login.view.html',
				controller  : 'LoginController',
                controllerAs: 'vm'
			})
			.state('home.register', {
                url         : '/register',
                templateUrl: 'Views/Dashboard/Home/register.view.html',
				controller  : 'RegisterController',
                controllerAs: 'vm'
            })

           .state('home.user', {
            abstract: true,
            templateUrl: 'Views/Dashboard/UserHome/userlogin.html'
            })



            .state('dashboard.user.home', {
                abstract: true,
                templateUrl: 'Views/Dashboard/UserHome/userlogin.html'
            })
            // route for the home page
            .state('home.user.login', {
                url: '/user/login',
                templateUrl: 'Views/Dashboard/UserHome/userlogin.view.html',
                controller: 'UserLoginController',
                controllerAs: 'vm'
            })
            .state('home.user.register', {
                url: '/user/register',
                templateUrl: 'Views/Dashboard/UserHome/userregister.view.html',
                controller: 'UserRegisterController',
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
        if ($rootScope.globals.currentUserUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUserUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/', '/register', '/user/login', '/user/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            var userLoggedIn = $rootScope.globals.currentUserUser;
            if (restrictedPage) {
                if (!loggedIn && !userLoggedIn) {
                    $location.path('/');
                }
                else if (loggedIn && !userLoggedIn) {
                    $location.path("/dashboard");
                }
                else if (!loggedIn && userLoggedIn) {
                    $location.path("/user/dashboard");
                }
            }

            else if (!restrictedPage) {
                if (!loggedIn && !userLoggedIn) {
                    $location.path('/');
                }
                else if (loggedIn && !userLoggedIn) {
                    $location.path("/dashboard");
                }
                else if (!loggedIn && userLoggedIn) {
                    $location.path("/user/dashboard");
                }
            }
            
        });
    }

 


