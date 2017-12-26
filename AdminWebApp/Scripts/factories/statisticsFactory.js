var serviceId = 'statisticsFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http','apiUrl', statisticsFactory]);

function statisticsFactory($http, apiUrl) {

    function get_statistics(_ga_id,_from,_to,_email) {
        var fromYear = _from.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { ga_id: _ga_id, from_date: f, to_date: t, extra: _email };
        return $http.post(apiUrl + 'api/admin/statistics', data);
    }

    function get_map(_email, _ga_id) {

        var data = { ga_id: _ga_id, extra: _email };
        return $http.post(apiUrl + 'api/admin/mapdata', data);
    }

    function get_graph_statistics(_ga_id, _email) {
     
        var data = { ga_id: _ga_id, extra: _email };
        return $http.post(apiUrl + 'api/admin/stats/traffic', data);
    }

    

    var service = {
        get_statistics: get_statistics,
        get_map: get_map,
        get_graph_statistics: get_graph_statistics
       
    };

    return service;
}