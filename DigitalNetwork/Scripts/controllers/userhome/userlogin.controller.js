(function () {
    'use strict';

    angular
        .module('DigitalMarket')
        .controller('UserLoginController', UserLoginController);

    UserLoginController.$inject = ['$location', '$state', 'UserAuthenticationService', 'UserFlashService'];
    function UserLoginController($location, $state, UserAuthenticationService, UserFlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            UserAuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            UserAuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    UserAuthenticationService.SetCredentials(vm.username, vm.password);
                    $state.go('userDashboard.home');
                } else {
                    UserFlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
