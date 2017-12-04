	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope, socket, Facebook,  AuthenticationService,  $rootScope,$state, $cookies, $location) {
    $rootScope.globals = $cookies.getObject('globals') || {};

   $scope.userdata = $rootScope.globals.currentUser;
   $scope.username = $scope.userdata.fullname;
   $scope.tempData = [];

   $scope.chat = true;
   $scope.chattext = 'Turn On Chat';
   
   $scope.hidechat = function ()
   {
       $scope.chat = !($scope.chat);
       if ($scope.chat)
       {
           $scope.chattext = 'Turn On Chat';
       }
       else {

           $scope.chattext = 'Turn Off Chat';
       }
   }
   if (socket) {
       socket.emit('disconnect', { username: $scope.userdata.username });
   }

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
        




        socket.on("connect", function () {
            socket.emit('join', { username: $scope.userdata.username });

            socket.emit('getmessages');
        });
        

        socket.on("initialize", function (data) {
            $scope.messages = data;
        });

        socket.on("message", function (data) {

            $scope.messages.push({ username: data.username, message: data.message });
        });

        socket.on("unjoin", function (data) {
            alert(data.username + " has left")
        });

        

    


    $scope.send = function ()
    {
        if (socket && $scope.message!='')
        {
            var data = { username: $scope.userdata.username, message: $scope.message}
            socket.emit('message', data );
        }

        $scope.message = '';
    }

    $scope.discon = function ()
    {
        if (socket) {
            socket.emit('disconnect', { username: $scope.userdata.username });
        }
    }
    
   $scope.active = $location.$$path;
   $scope.makeActive = function (item) {
       $scope.active = $scope.active == item ? '' : item;
   }
  
   
});


