var serviceId = 'articleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', articleFactory]);

function articleFactory($http) {

    function getAdminArticles(_email, _url,_status) {

        var data = { email: _email, site_url: _url, status: _status };
        return $http.post('http://localhost:3208/api/admin/articles', data);
    }

    function updateArticle(_serial, _status,_cat,_subcat) {

        var data = { status: _status, serial_no: _serial, category: _cat, sub_category: _subcat };
        return $http.post('http://localhost:3208/api/admin/articles/update', data);
    }


    function deleteArticle(_serial) {

        return $http.get('http://localhost:3208/api/admin/articles/delete/' + _serial);
    }


    function getTrafficGraph(_email, _ga_id, _fromDate, _toDate, _extra) {
        var data = { uid: _email, id: _ga_id,  fromDate: _fromDate, toDate: _toDate, extra: _extra };
        return $http.post('http://localhost:3208/api/admin/graph/traffic', data);
    }

    function getArticleMeta(_url) {
        return $http.get('http://api.linkpreview.net/?key=5a30d766bac917df2a3f0d266869c59413708e4acdb01&q=' + _url);
    }

    function InsertArticle(_title, _url, _image, _summary, _site) {

        var data = { url: _url, title: _title, summary: _summary, photo_url: _image, site_url: _site };
        return $http.put('http://localhost:3208/api/admin/add/article', data);
    }

    ///////////////////////////////////////USER////////////////////////////////////////////




    var service = {
        getAdminArticles: getAdminArticles,
        getArticleMeta: getArticleMeta,
        InsertArticle: InsertArticle,
        updateArticle: updateArticle,
        deleteArticle: deleteArticle,
        getTrafficGraph: getTrafficGraph


    };

    return service;
}

