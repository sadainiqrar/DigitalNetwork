	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope, Facebook,  AuthenticationService,  $rootScope,$state, $cookies, $location) {
    $rootScope.globals = $cookies.getObject('globals') || {};

   $scope.userdata = $rootScope.globals.currentUser;
   $scope.username = $scope.userdata.fullname;
   


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
   $scope.logout = function () {

       Facebook.logout(function (response) {
           if (response) {
               
                   AuthenticationService.ClearCredentials();
                   $state.go('home.login');
          

           } else {
               //FlashService.Error(response.message);

           }
       });
   };

   $scope.messages = [];

   $scope.message = "";
   $scope.socket = io.connect("http://localhost:3000");
    function initChat(userName) {
        

        $scope.socket.on("connect", function () {
            $scope.socket.emit('join', { username: userName });
        });

        $scope.socket.on("join", function (data) {
            alert("joined");

        });

        $scope.socket.on("message", function (data) {

            $scope.messages.push("<b>" + data.username + "</b> : " + data.message);
        });

        $scope.socket.on("unjoin", function (data) {
            alert(data.username + " has left")
        });


   }

    
    initChat($scope.userdata.username);


    $scope.send = function ()
    {
        if ($scope.socket)
        {
            var data = { username: $scope.userdata.username, message: $scope.message}
            $scope.socket.emit('message', data );
        }

        $scope.message = '';
    }

    $scope.discon = function ()
    {
        if ($scope.socket) {
            $scope.socket.emit('disconnect');
        }
    }
    

   $scope.active = $location.$$path;
   $scope.makeActive = function (item) {
       $scope.active = $scope.active == item ? '' : item;
   }
  
   
});


