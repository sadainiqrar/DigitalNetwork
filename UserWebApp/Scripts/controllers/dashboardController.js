	// create the controller and inject Angular's $scope
angular.module('DigitalMarket').controller('dashboardController', function ($scope,$document, $anchorScroll, socket, Facebook, AuthenticationService, $rootScope, $state, $cookies, $location, statisticsFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};

   $scope.userdata = $rootScope.globals.currentUser;
   $scope.username = $scope.userdata.fullname;
   $scope.tempData = [];

   $scope.chat = true;
   $scope.chattext = 'Turn On Chat';


   
   $scope.top_users = [];
   $scope.$parent.abbreviate = function (n) {
       n = parseInt(n);
       n = n * 541231587;
       var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
       var suffix = 'KMBT'[base - 1];
       return suffix ? roundWithPrecision(n / Math.pow(1000, base), 2) + suffix : '' + n;
   }
   function roundWithPrecision(n, precision) {
       var prec = Math.pow(10, precision);
       return Math.round(n * prec) / prec;
   }
   statisticsFactory.get_top().then(
       // callback function for successful http request
       function success(response) {
           $scope.top_users = response.data;
       },
       // callback function for error in http request
       function error(response) {
           // log errors
       }
   );

   $scope.anchor = function () {
       $anchorScroll('bottom');
   }

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
            $scope.anchor();
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
       $scope.active = item;

   }
  
   
});


angular.module('DigitalMarket').filter('articlefilter', function () {

    // Create the return function and set the required parameter as well as an optional paramater
    return function (articles, params) {
        
            // If the input data is not a number, perform the operations to capitalize the correct letter.
           
            var out = [];
            if (params._sub_category === 'Political') {
                for (article in articles) {

                    if (articles[article].category === params._category) {
                        out.push(articles[article]);
                    }
                }
            }

            else {
                for (article in articles) {

                    if (articles[article].category === params._category && articles[article].sub_category === params._sub_category) {
                        out.push(articles[article]);
                    }
                }
            }

            return out;

        } 

    }

);



