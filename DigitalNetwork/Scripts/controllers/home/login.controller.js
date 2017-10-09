(function () {
    'use strict';

    angular
        .module('DigitalMarket')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','$state' ,'AuthenticationService', 'FlashService'];
    function LoginController($location, $state, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $state.go('dashboard.home');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
