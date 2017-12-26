﻿(function () {
    'use strict';

    angular
        .module('DigitalMarket')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'apiUrl'];
    function UserService($http, apiUrl) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetUser = GetUser;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetUser(_uid, _fullname) {
        
            var data = { uid: _uid, fullname:_fullname };
            return $http.post(apiUrl + 'api/user/login',data).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
