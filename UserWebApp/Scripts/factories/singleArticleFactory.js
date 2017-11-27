var serviceId = 'singleArticleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', singleArticleFactory]);

function singleArticleFactory($http) {

    function getArticle(_serial) {
        return $http.get('http://localhost:3208/api/user/article/' + _serial);
    }
    
   

    var service = {
        getArticle: getArticle


    };

    return service;
}

