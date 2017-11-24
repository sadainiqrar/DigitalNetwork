var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', 'Facebook', '$rootScope', '$cookies', 'articleFactory', 'umsFactory' ,'ModalService', 'sessionFactory', articlesController]);

function articlesController($scope, Facebook, $rootScope, $cookies, articleFactory, umsFactory, ModalService, sessionFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.message = 'Articles Controller';
    $scope.shared_articles = [];
    $scope.addedUms = [];
    $scope.ums = [];

    $scope._category = 'premium';
    $scope._sub_category = 'Political';

    umsFactory.getUms($scope.uid).then(
        // callback function for successful http request
        function success(response) {
            $scope.dbUms = response.data;


        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    Facebook.getLoginStatus(function (response) {
        if (response.status === 'connected') {

            $scope.loginStatus = response.status;
            Facebook.api('/me/accounts', {
                fields: 'id,name,category,picture,fan_count,rating_count,access_token'
            }, function (response) {
                if (response) {
                    $scope.ums = response.data;
                    angular.forEach($scope.ums, function (value, key) {
                        if ($scope.dbUms.indexOf(value.id) !== -1) {
                            $scope.addedUms.push(value);
                        }
                    }
                    );
                } else {
                    //FlashService.Error(response.message);

                }

            });

        } else {
            Facebook.login(function (response) {
                if (response.status === 'connected') {

                    $scope.loginStatus = response.status;
                    Facebook.api('/me/accounts', {
                        fields: 'id,name,category,fan_count,rating_count,access_token'
                    }, function (response) {
                        if (response) {
                            $scope.ums = response.data;
                            angular.forEach($scope.ums, function (value, key) {
                                if ($scope.dbUms.indexOf(value.id) !== -1) {
                                    $scope.addedUms.push(value);
                                }
                            }
                            );
                        } else {
                            //FlashService.Error(response.message);

                        }

                    });

                } else {
                    //FlashService.Error(response.message);

                }
            }, { scope: 'manage_pages,pages_show_list,publish_actions' });
        };
    }
    );

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


    $scope.openModal = function (id)
    {
        $scope.current = this.article;
        ModalService.Open(id);
    }
    $scope.closeModal = function (id) {
        ModalService.Close(id);
    }

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

        var page = this.s;

        Facebook.api("/me/feed?access_token=" + page.access_token,
            "POST",
            {
                "message": "Test Share",
                "link": $scope.current.url
            }, function (response) {
            if (response) {
                $scope.current.shared = true;
                articleFactory.updateSharedArticles($scope.uid, $scope.current.serial_no, $scope.current.copied).then(
                    // callback function for successful http request
                    function success(response) {
                        $scope.closeModal('custom-modal-2');
                    },
                    // callback function for error in http request
                    function error(response) {
                        // log errors
                    }
                );
            } else {
                //FlashService.Error(response.message);

            }

        });

       


        
    }

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = $scope.active === item ? item : item;
    }
}