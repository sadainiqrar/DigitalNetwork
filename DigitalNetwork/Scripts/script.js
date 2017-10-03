	// create the module and name it scotchApp
var scotchApp = angular.module('DigitalMarket', ['ngRoute','ngSanitize','ngMaterial']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'Views/Dashboard/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/realtime', {
                templateUrl: 'Views/Dashboard/realtime.html',
				controller  : 'realtimeController'
			})
			
			.when('/userdata', {
                templateUrl: 'Views/Dashboard/userdata.html',
				controller  : 'userdataController'
			})
        
            .when('/articlestats/:id', {
                templateUrl: 'Views/Dashboard/articlestats.html',
                controller  : 'articlestatsController'
            
            })
        
            .when('/userstats', {
                templateUrl: 'Views/Dashboard/userstats.html',
				controller  : 'userstatsController'
			})
        
            .when('/invoices', {
                templateUrl: 'Views/Dashboard/invoices.html',
                controller  : 'invoicesController'
            
            })
			
			.when('/articles', {
                templateUrl: 'Views/Dashboard/articles.html',
                controller: 'articlesController'
			})
          .when('/payment', {
              templateUrl: 'Views/Dashboard/payment.html',
                controller  : 'paymentController'
            
            })
           
        
          .when('/profile', {
              templateUrl: 'Views/Dashboard/profile.html',
				controller  : 'profileController'
			})
       

			// route for the contact page
			.when('/traffic', {
                templateUrl: 'Views/Dashboard/traffic.html',
				controller  : 'trafficController'
			});
			
			
	});


