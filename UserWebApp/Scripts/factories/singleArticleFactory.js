var serviceId = 'singleArticleFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', '$rootScope', '$cookies', singleArticleFactory]);

angular.module('DigitalMarket').factory('updateArticleFactory',
    ['$http', updateArticleFactory]);

function singleArticleFactory($http, $rootScope, $cookies) {
    //function getArticle(id) {
    //    return $http.post('/api/admin/articles/:id', data);
    //}


    //var service = {
    //    getArticle: getArticle(:id)
    //};

    return {
        getArticle: function getArticle(id) {
            $rootScope.globals = $cookies.getObject('globals') || {};
            // create a message to display in our view
            var userdate = $rootScope.globals.currentUser;
            var admin_email =userdate.email;
            var data = { email: admin_email};
            return $http.post('http://localhost:3208/api/admin/articles/' + id, data);
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
            return $http.post('http://localhost:3208/api/admin/articles/' + id + '/update');
        }
    }


}