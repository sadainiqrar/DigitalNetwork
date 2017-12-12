var serviceId = 'articleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http',   articleFactory]);

function articleFactory($http) {

    function getArticles(_uid,_category,_sub_category) {
        var data = { uid: _uid, category: _category, sub_category: _sub_category};
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

    function getSharedArticles(_uid, _category, _sub_category) {
        var data = { uid: _uid, category: _category, sub_category: _sub_category };
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
    function getViewShares( _url, _date,_article_url) {
        var data = {site_url: _url, modified_date: _date, url: _article_url};
    
    
        return $http.post('http://localhost:3208/api/user/views_shares', data);
    }
    function getUserViews(_url, _date, _article_url, _username) {
        var data = { site_url: _url, modified_date: _date, url: _article_url, username: _username };


        return $http.post('http://localhost:3208/api/user/shared/views_shares', data);
    }
   
    var service = {
        getArticles: getArticles,
        insertCopiedArticles: insertCopiedArticles,
        insertSharedArticles: insertSharedArticles,
        getSharedArticles: getSharedArticles,
        updateSharedArticles: updateSharedArticles,
        updateCopiedArticles: updateCopiedArticles,
        getViewShares: getViewShares,
        getUserViews: getUserViews


    };

    return service;
}




