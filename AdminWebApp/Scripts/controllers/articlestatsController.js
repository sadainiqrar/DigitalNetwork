var controllerId = 'articlestatsController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope','$stateParams', 'singleArticleFactory','updateArticleFactory', articlestatsController]);

function articlestatsController($scope, $stateParams, singleArticleFactory, updateArticleFactory) {
    var serial = $stateParams.serial;
    $scope.message = 'Articles Stats Controller';
    singleArticleFactory.getArticle(serial).then(
        // callback function for successful http request
        function success(response) {
            $scope.article = response.data;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.updateStatus = function () {
        updateArticleFactory.updateArticle($scope.serial).then(
            // callback function for successful http request
            function success(response) {
                $scope.status = response.data;
            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );
    }

}