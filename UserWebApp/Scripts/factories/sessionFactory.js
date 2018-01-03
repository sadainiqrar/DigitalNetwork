var serviceId = 'sessionFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http','apiUrl',  sessionFactory]);

function sessionFactory($http, apiUrl) {

    function getSession(_uid , _username) {

        var data = { uid: _uid,  extra: _username };
        return $http.post(apiUrl + 'api/user/sessions', data);
    }
   
       

    var service = {
        getSession: getSession,
    };

    return service;
}