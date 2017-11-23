var serviceId = 'umsFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', umsFactory]);



function umsFactory($http) {
    function addUms(_pid, _uid ) {
        var data = { ums_id: _pid, uid: _uid  };
        return $http.put('http://localhost:3208/api/ums/add', data);
    }

    function getUms( _uid) {
        return $http.get('http://localhost:3208/api/ums/' + _uid);
    }

    var service = {
        addUms: addUms,
        getUms: getUms
    }

    return service;


}