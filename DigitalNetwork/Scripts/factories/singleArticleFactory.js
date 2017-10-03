var serviceId = 'singleArticleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', singleArticleFactory]);

angular.module('DigitalMarket').factory('updateArticleFactory',
    ['$http', updateArticleFactory]);

function singleArticleFactory($http) {
    //function getArticle(id) {
    //    return $http.post('/api/admin/articles/:id', data);
    //}


    //var service = {
    //    getArticle: getArticle(:id)
    //};

    return {
        getArticle: function getArticle(id) {
            var data = { email: 'zuraiz.com' };
            return $http.post('/api/admin/articles/' + id, data);
        }
    }
       

}


function updateArticleFactory($http) {
    //function getArticle(id) {
    //    return $http.post('/api/admin/articles/:id', data);
    //}


    //var service = {
    //    getArticle: getArticle(:id)
    //};

    return {
        updateArticle: function updateArticle(id) {
            return $http.post('/api/admin/articles/' + id + '/update');
        }
    }


}