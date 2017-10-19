var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope','articleFactory', 'updateArticleFactory', articlesController]);

function articlesController($scope, articleFactory, updateArticleFactory) {
    $scope.message = 'Articles Controller';
    $scope.articles = [];
    articleFactory.getArticles().then(
        // callback function for successful http request
        function success(response) {
            $scope.articles = response.data;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.updateStatus = function () {
        updateArticleFactory.updateArticle(this.article.serial_no).then(
            // callback function for successful http request
            function success(response) {
                this.article.status = response.data;
            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    }
}