var serviceId = 'articleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http',   articleFactory]);

function articleFactory($http) {

    function getArticles() {
        return $http.get('http://localhost:3208/api/user/articles');
    }


    var service = {
        getArticles: getArticles
    };

    return service;
}

