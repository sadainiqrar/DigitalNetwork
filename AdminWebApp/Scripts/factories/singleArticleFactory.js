var serviceId = 'singleArticleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http','apiUrl', singleArticleFactory]);

function singleArticleFactory($http, apiUrl) {

    function getArticle(_serial) {
        return $http.get(apiUrl + 'api/user/article/' + _serial);
    }
    

    var service = {
        getArticle: getArticle


    };

    return service;
}

