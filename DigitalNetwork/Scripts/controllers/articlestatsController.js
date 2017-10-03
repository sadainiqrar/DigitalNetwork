var controllerId = 'articlestatsController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope','$routeParams', 'singleArticleFactory','updateArticleFactory', articlestatsController]);

function articlestatsController($scope, $routeParams, singleArticleFactory, updateArticleFactory) {
    var id = $routeParams.id;
    $scope.message = 'Articles Stats Controller';
    singleArticleFactory.getArticle(id).then(
        // callback function for successful http request
        function success(response) {
            $scope.article = response.data;
            $scope.status = $scope.article[0].status;
            $scope.serial = $scope.article[0].serial_no;
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