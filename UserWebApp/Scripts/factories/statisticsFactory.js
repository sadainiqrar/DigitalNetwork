var serviceId = 'statisticsFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', statisticsFactory]);

function statisticsFactory($http) {

    function get_statistics(_uid, _username,_from,_to,_extra) {

        var data = { uid: _uid, from_date: _from, to_date: _to, extra: _extra };
        return $http.post('http://localhost:3208/api/user/statistics', data);
    }

 


    var service = {
        get_statistics: get_statistics
    };

    return service;
}