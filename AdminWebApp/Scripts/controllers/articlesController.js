var controllerId = 'publishedController';

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
    $scope.published_articles = [];
    
    $scope.currentArticle;
    
    $scope.selectedOrder = 'modified_date';
    
    $scope._sub_category = 'Political';


    articleFactory.getAdminArticles($scope.id, $scope.site_url, true).then(
        // callback function for successful http request
        function success(response) {
            $scope.published_articles = response.data;
            angular.forEach($scope.published_articles, function (value, key) {
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


    $scope.Switch = function (ev)
    {
        $scope.currentArticle = this.article;
        $mdDialog.show({
            controller: confirmDialogController,
            templateUrl: 'confirmmessage.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                if (answer === "Submited") {

                    articleFactory.updateArticle($scope.currentArticle.serial_no, false, null, null).then(
                        // callback function for successful http request
                        function success(response) {

                            $mdDialog.show({
                                locals: { data: "Your Article is Successfully Paused" },
                                controller: SuccessDialogController,
                                templateUrl: 'successmessage.tmpl.html',
                                parent: angular.element(document.body),
                                targetEvent: ev,
                                clickOutsideToClose: true
                            });

                            articleFactory.getAdminArticles($scope.id, $scope.site_url, true).then(
                                // callback function for successful http request
                                function success(response) {
                                    $scope.published_articles = response.data;



                                },
                                // callback function for error in http request
                                function error(response) {
                                    // log errors
                                }

                            );
                        },
                        // callback function for error in http request
                        function error(response) {
                            // log errors
                        }

                    );
                    
                }
            }, function () {
                
                $scope.currentArticle.status = true;
            });
       
    }

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = item;
    }
    $scope.reroute = function ()
    {
        $state.go('dashboard.articlestats', { serial: this.article.serial_no });
    }



    function confirmDialogController($scope, $rootScope, $cookies, $mdDialog) {

        
        $scope.answer = function () {
            $mdDialog.hide("Submited");
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }

    function SuccessDialogController($scope, $mdDialog, data) {

        $scope.Response = data;
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }
}