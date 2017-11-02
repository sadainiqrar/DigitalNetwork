var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope','articleFactory', 'updateArticleFactory', articlesController]);

function articlesController($scope, articleFactory, updateArticleFactory) {
    $scope.message = 'Articles Controller';
    $scope.shared_articles = [];
    articleFactory.getSharedArticles().then(
        // callback function for successful http request
        function success(response) {
            $scope.shared_articles = response.data;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.updateStatusCopied = function () {
        this.article.copied = true;
        articleFactory.updateCopiedArticles('12345', this.article.serial_no, this.article.shared).then(
            // callback function for successful http request
            function success(response) {
              
            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    }
    $scope.updateStatusShared = function () {
        this.article.shared = true;
        articleFactory.updateSharedArticles('12345', this.article.serial_no, this.article.copied).then(
            // callback function for successful http request
            function success(response) {
               
            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    }

}