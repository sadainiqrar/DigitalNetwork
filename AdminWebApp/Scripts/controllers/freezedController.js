var controllerId = 'freezedController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$state', '$rootScope', '$cookies', 'articleFactory', '$mdDialog' , 'sessionFactory', articlesController]);

function articlesController($scope, $state, $rootScope, $cookies, articleFactory, $mdDialog,  sessionFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.email;
    $scope.ga_id = $scope.userdata.currentSite.ga_id;

    $scope.site_url = $scope.userdata.currentSite.site_url;
    $scope.message = 'Articles Controller';
    $scope.freezed_articles = [];
    
    
    $scope.selectedOrder = 'modified_date';
    
    $scope._sub_category = 'Political';


    articleFactory.getDeadArticles($scope.id, $scope.site_url).then(
        // callback function for successful http request
        function success(response) {
            $scope.freezed_articles = response.data;
            angular.forEach($scope.freezed_articles, function (value, key) {
                articleFactory.Article_Traffic(value.site_url, value.modified_date, value.url, $scope.id, $scope.ga_id).then(
                    // callback function for successful http request
                    function success(response) {
                        value.views = response.data.sessions;
                        value.shares = response.data.earned;
                    },
                    // callback function for error in http request
                    function error(response) {
                        value.views = "0";
                        value.shares = 0;
                        //// log errors
                    }

                );
            });
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }

    );
    

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = item;
    }
    


    
}