var serviceId = 'graphFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', graphFactory]);

function graphFactory($http) {

    function getTotal(_id, _uid, _site_url,_url) {
        var data = { id: _id, uid: _uid, site_url: _site_url, url: _url};
        return $http.post('http://localhost:3208/api/user/graph/total', data);
    }
    function getTrafficGraph(_uid, _site_url, _url, _fromDate, _toDate, _extra) {
        var data = { uid: _uid, site_url: _site_url, url:_url, fromDate:_fromDate, toDate:_toDate, extra:_extra };
        return $http.post('http://localhost:3208/api/user/graph/traffic', data);
    }
    function getCountryGraph(_uid, _site_url, _url, _fromDate, _toDate) {
        var data = { uid: _uid, site_url: _site_url, url: _url, fromDate: _fromDate, toDate: _toDate};
        return $http.post('http://localhost:3208/api/user/graph/country', data);
    }
    function getArticle(_serial) {
        return $http.get('http://localhost:3208/api/user/article/' + _serial);
    }


    var service = {
        getTotal: getTotal,
        getTrafficGraph: getTrafficGraph,
        getCountryGraph: getCountryGraph,
        getArticle: getArticle
     


    };

    return service;
}

