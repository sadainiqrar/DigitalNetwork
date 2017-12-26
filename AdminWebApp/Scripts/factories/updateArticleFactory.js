var serviceId = 'umsFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http','apiUrl', umsFactory]);



function umsFactory($http, apiUrl) {
    function addUms(_pid, _uid ) {
        var data = { ums_id: _pid, uid: _uid  };
        return $http.put(apiUrl + 'api/ums/add', data);
    }

    function urlShortner(_url, _uid) {
       
       var data = { ums_id: _url, uid : _uid };
       return $http.post(apiUrl + 'api/url/shorten', data);
    }

    function getUms( _uid) {
        return $http.get(apiUrl + 'api/ums/' + _uid);
    }

    function deleteUms(_pid, _uid) {
        var data = { ums_id: _pid, uid: _uid };
        return $http.post(apiUrl + 'api/ums/delete', data);
    }

    var service = {
        addUms: addUms,
        getUms: getUms,
        deleteUms: deleteUms,
        urlShortner: urlShortner
    }

    return service;


}