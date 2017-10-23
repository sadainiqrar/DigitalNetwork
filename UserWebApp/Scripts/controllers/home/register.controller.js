(function () {
    'use strict';

    angular
        .module('DigitalMarket')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$state', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $state,$rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        //$location.path('/');
                        $state.go('home.login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
