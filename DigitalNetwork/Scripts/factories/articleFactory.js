var serviceId = 'articleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', articleFactory]);

function articleFactory($http) {

    function getArticles() {
        return $http.get('/api/admin/articles');
    }


    var service = {
        getArticles: getArticles
    };

    return service;
}

