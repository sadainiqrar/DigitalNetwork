var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope',  '$rootScope', '$cookies','articleFactory', 'updateArticleFactory', articlesController]);

function articlesController($scope, $rootScope, $cookies, articleFactory, updateArticleFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.uid = $scope.userdata.uid;
    $scope.message = 'Articles Controller';
    $scope.shared_articles = [];
    articleFactory.getSharedArticles($scope.uid, null, null).then(
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
        articleFactory.updateCopiedArticles($scope.uid , this.article.serial_no, this.article.shared).then(
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
        articleFactory.updateSharedArticles($scope.uid , this.article.serial_no, this.article.copied).then(
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