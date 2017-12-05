var serviceId = 'statisticsFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', statisticsFactory]);

function statisticsFactory($http) {

    function get_statistics(_uid,_from,_to,_extra) {
        var fromYear = _from.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { uid: _uid, from_date: f, to_date: t, extra: _extra };
        return $http.post('http://localhost:3208/api/user/statistics', data);
    }

    function get_top() {
        return $http.get('http://localhost:3208/api/user/topusers');
    }


    var service = {
        get_statistics: get_statistics,
        get_top: get_top
    };

    return service;
}