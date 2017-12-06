var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', 'Facebook', 'clipboard', '$state', '$rootScope', '$cookies', 'articleFactory', 'umsFactory' ,'ModalService', 'sessionFactory', articlesController]);

function articlesController($scope, Facebook, clipboard, $state, $rootScope, $cookies, articleFactory, umsFactory, ModalService, sessionFactory) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.message = 'Articles Controller';
    $scope.shared_articles = [];
    $scope.addedUms = [];
    $scope.ums = [];

    $scope.trafficloading = true;
    $scope.earnedloading = true;
    $scope.umsloading = true;


    $scope.order = [{ label: 'Recent', value: 'modified_date' }, { label: 'Top Articles', value: 'views' }];

    $scope.selectedOrder = $scope.order[1].value;

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
                fields: 'id,name,category,picture.type(large),fan_count,rating_count,access_token'
            }, function (response) {
                if (response) {
                    $scope.ums = response.data;
                    angular.forEach($scope.ums, function (value, key) {
                        if ($scope.dbUms.indexOf(value.id) !== -1) {
                            $scope.addedUms.push(value);
                        }
                    }
                        
                    );
                    
                    $scope.umsloading = false;
                } else {
                    //FlashService.Error(response.message);
                    $scope.umsloading = false;

                }

            });

        } else {
            Facebook.login(function (response) {
                if (response.status === 'connected') {

                    $scope.loginStatus = response.status;
                    Facebook.api('/me/accounts', {
                        fields: 'id,name,category,picture.type(large),fan_count,rating_count,access_token'
                    }, function (response) {
                        if (response) {
                            $scope.ums = response.data;
                            angular.forEach($scope.ums, function (value, key) {
                                if ($scope.dbUms.indexOf(value.id) !== -1) {
                                    $scope.addedUms.push(value);
                                }
                            }
                            );
                            
                            $scope.umsloading = false;
                        } else {
                            //FlashService.Error(response.message);
                            
                            $scope.umsloading = false;

                        }

                    });

                } else {
                    //FlashService.Error(response.message);
                    $scope.umsloading = false;;

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
                        value.views = response.data.sessions;
                        value.shares = response.data.earned;
                        $scope.trafficloading = false;
                        $scope.earnedloading = false;
                    },
                    // callback function for error in http request
                    function error(response) {
                        value.views = "0";
                        value.shares = 0;
                        $scope.trafficloading = false;
                        $scope.earnedloading = false;
                        //// log errors
                    }

                );
            });
        },
        // callback function for error in http request
        function error(response) {
                                $scope.trafficloading = false;
                                $scope.earnedloading = false;
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

    $scope.updateStatusCopied = function ($event) {
        $scope.current = this.article;
        this.article.copied = true;

        var url = $scope.current.url;

        $event.stopPropagation();

        umsFactory.urlShortner($scope.current.url, $scope.id).then(
            // callback function for successful http request
            function success(response) {
                url = response.data;

                articleFactory.updateCopiedArticles($scope.uid, $scope.current.serial_no, $scope.current.shared).then(
                    // callback function for successful http request
                    function success(response) {
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

        clipboard.copyText(url);

    }
    $scope.updateStatusShared = function () {
        var page = this.s;
        var url = $scope.current.url;

        umsFactory.urlShortner($scope.current.url, $scope.id).then(
            // callback function for successful http request
            function success(response) {
                url = response.data;

            

                Facebook.api("/me/feed?access_token=" + page.access_token,
            "POST",
            {
                "link": url
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

            },
            // callback function for error in http request
            function error(response) {
                // log errors
            }
        );


        
    }

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = item;
    }
    $scope.reroute = function ()
    {
        $state.go('dashboard.articlestats', { serial: this.article.serial_no });
    }
}