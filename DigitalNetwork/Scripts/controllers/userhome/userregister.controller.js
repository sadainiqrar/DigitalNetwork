(function () {
    'use strict';

    angular
        .module('DigitalMarket')
        .controller('UserRegisterController', UserRegisterController);

    UserRegisterController.$inject = ['UserUserService', '$location', '$state', '$rootScope', 'UserFlashService'];
    function UserRegisterController(UserUserService, $location, $state, $rootScope, UserFlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserUserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        UserFlashService.Success('Registration successful', true);
                        //$location.path('/');
                        $state.go('home.user.login');
                    } else {
                        UserFlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
