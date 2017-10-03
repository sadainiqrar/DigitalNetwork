var serviceId = 'updateArticleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', updateArticleFactory]);



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