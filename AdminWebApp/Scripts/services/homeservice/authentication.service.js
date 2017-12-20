(function () {
    'use strict';

    angular
        .module('DigitalMarket')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        var authdata = {};
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(email, name,photo, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetUser(email, name, photo)
                    .then(function (user) {
                        if (user !== null && user.data !== null) {

                            authdata = user;
                            response = { success: true };
                        } else {
                            authdata = {};
                            response = { success: false, message: 'Cannot Sign In' };
                        }
                        callback(response);
                    });
            }, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        function SetCredentials() {

                    $rootScope.globals = {
                        currentUser: {
                            username: authdata.data.adminname,
                            email: authdata.data.email,
                            photo_url: authdata.data.photo_url,
                            sites: authdata.data.sites,
                            currentSite: null
                        }
            };
            

                    // set default auth header for http requests
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

                    // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
                    var cookieExp = new Date();
                    cookieExp.setDate(cookieExp.getDate() + 7);
                    $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
                }
            

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }
    

})();