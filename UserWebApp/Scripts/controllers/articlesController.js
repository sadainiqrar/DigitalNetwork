var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope',  '$rootScope', '$cookies','articleFactory', 'sessionFactory', articlesController]);

function articlesController($scope,  $rootScope, $cookies, articleFactory, sessionFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.message = 'Articles Controller';
    $scope.shared_articles = [];

    $scope._category = 'premium';
    $scope._sub_category = 'Political';

    articleFactory.getSharedArticles($scope.uid, $scope._category, null).then(
        // callback function for successful http request
        function success(response) {
            $scope.shared_articles = response.data;
            angular.forEach($scope.shared_articles, function (value, key) {
                articleFactory.getUserViews(value.site_url, value.modified_date, value.url, $scope.id).then(
                    // callback function for successful http request
                    function success(response) {
                        value.views = response.data;
                        sessionFactory.getRate(value.category).then(
                            // callback function for successful http request
                            function success(response) {
                                value.shares = (response.data[0].rate / 1000) * parseFloat(value.views);

                            },
                            // callback function for error in http request
                            function error(response) {
                                // log errors
                            }
                        );
                    },
                    // callback function for error in http request
                    function error(response) {
                        value.views = "0";
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
    //$scope.premium = function () {
    //    $scope.category = 'premium';
    //    articleFactory.getSharedArticles($scope.uid, $scope.category, null).then(
    //        // callback function for successful http request
    //        function success(response) {
    //            $scope.shared_articles = response.data;

    //        },
    //        // callback function for error in http request
    //        function error(response) {
    //            // log errors
    //        }
    //    );
    //}
    //$scope.non_premium = function () {
    //    $scope.category = 'non_premium';
    //    articleFactory.getSharedArticles($scope.uid, $scope.category, null).then(
    //        // callback function for successful http request
    //        function success(response) {
    //            $scope.shared_articles = response.data;

    //        },
    //        //  callback function for error in http request
    //        function error(response) {
    //            // log errors
    //        }
    //    );
    //}

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = $scope.active === item ? item : item;
    }
}