var serviceId = 'sitesFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http','apiUrl', sitesFactory]);


function sitesFactory($http, apiUrl) {

    function getAvailable(_email) {
        var data = { email: _email };
        return $http.post(apiUrl + 'api/admin/avaiableSites', data);
    }

    function addSite(_url,_name,_gid,_custom,_email) {
        var data = { site_url:_url,site_name:_name,ga_id: _gid,custom: _custom,email: _email };
        return $http.post(apiUrl + 'api/admin/addSite', data);
    }
    
    var service = {
        getAvailable: getAvailable,
        addSite: addSite


    };

    return service;
}