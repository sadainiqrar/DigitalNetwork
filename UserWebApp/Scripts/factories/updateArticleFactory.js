var serviceId = 'umsFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', umsFactory]);



function umsFactory($http) {
    function addUms(_pid, _uid ) {
        var data = { ums_id: _pid, uid: _uid  };
        return $http.put('http://localhost:3208/api/ums/add', data);
    }

    function urlShortner(_url) {
        var data = { longUrl: _url };
        return $http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDvURFxjBImiFEEsJjNunfVSvbrRP1u9yA', data);
    }

    function getUms( _uid) {
        return $http.get('http://localhost:3208/api/ums/' + _uid);
    }

    function deleteUms(_pid, _uid) {
        var data = { ums_id: _pid, uid: _uid };
        return $http.post('http://localhost:3208/api/ums/delete', data);
    }

    var service = {
        addUms: addUms,
        getUms: getUms,
        deleteUms: deleteUms,
        urlShortner: urlShortner
    }

    return service;


}