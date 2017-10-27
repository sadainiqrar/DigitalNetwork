var serviceId = 'articleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http',   articleFactory]);

function articleFactory($http) {

    function getArticles() {
        var data = { uid: '12345', category: null, sub_category: null};
        return $http.post('http://localhost:3208/api/user/articles',data);
    }


    var service = {
        getArticles: getArticles
    };

    return service;
}

