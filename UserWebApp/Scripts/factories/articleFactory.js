var serviceId = 'articleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http',   articleFactory]);

function articleFactory($http) {

    function getArticles() {
        var data = { uid: '12345', category: null, sub_category: null};
        return $http.post('http://localhost:3208/api/user/articles',data);
    }

    function insertSharedArticles(_uid,_serial) {
        var data = { uid: _uid, serial_no:_serial, copied: false, shared: true };
        return $http.put('http://localhost:3208/api/user/insert/shared_article', data);
    }
    function insertCopiedArticles(_uid,_serial) {
        var data = { uid: _uid, serial_no: _serial, copied: true, shared: false };
        return $http.put('http://localhost:3208/api/user/insert/shared_article', data);
    }

    function getSharedArticles() {
        var data = { uid: '12345', category: null, sub_category: null };
        return $http.post('http://localhost:3208/api/user/shared_articles', data);
    }
    function updateSharedArticles(_uid, _serial, _copied) {
        var data = { uid: _uid, serial_no: _serial, shared: true, copied: _copied };
        return $http.put('http://localhost:3208/api/user/update/shared_article', data);
    }
    function updateCopiedArticles(_uid, _serial, _shared) {
        var data = { uid: _uid, serial_no: _serial,shared:_shared, copied: true };
        return $http.put('http://localhost:3208/api/user/update/shared_article', data);
    }
   
    var service = {
        getArticles: getArticles,
        insertCopiedArticles: insertCopiedArticles,
        insertSharedArticles: insertSharedArticles,
        getSharedArticles: getSharedArticles,
        updateSharedArticles: updateSharedArticles,
        updateCopiedArticles: updateCopiedArticles


    };

    return service;
}

