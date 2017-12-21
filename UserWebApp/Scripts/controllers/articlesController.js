var controllerId = 'articlesController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', 'Facebook', 'clipboard', '$state', '$rootScope', '$cookies', 'articleFactory', 'umsFactory', 'ModalService', 'sessionFactory', '$mdToast','$mdDialog', articlesController]);

function articlesController($scope, Facebook, clipboard, $state, $rootScope, $cookies, articleFactory, umsFactory, ModalService, sessionFactory, $mdToast, $mdDialog) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
    $scope.message = 'Articles Controller';
    $scope.shared_articles = [];
    $scope.addedUms = [];
    $scope.ums = [];

    $scope.sharing = false;

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
                fields: 'id,name,category,picture.type(large),fan_count,overall_star_rating,access_token'
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
                        fields: 'id,name,category,picture.type(large),fan_count,overall_star_rating,access_token'
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

    articleFactory.getSharedArticles($scope.uid, null, null).then(
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

    $scope.updateStatusCopied = function (ev) {
        $scope.current = this.article;
        this.article.copied = true;

        var url = $scope.current.url;

        ev.stopPropagation();

        umsFactory.urlShortner($scope.current.url, $scope.id).then(
            // callback function for successful http request
            function success(response) {
                url = response.data;

                articleFactory.updateCopiedArticles($scope.uid, $scope.current.serial_no, $scope.current.shared).then(
                    // callback function for successful http request
                    function success(response) {
                        $mdDialog.show({
                            locals: { data: url},
                            controller: copyArticleDialogController,
                            templateUrl: 'copyArticle.tmpl.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true
                        }).then(function (answer) {

                            if (answer === "Submited") {

                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('Article Link Copied')
                                        .action('CLOSE')
                                        .position('bottom left')
                                        .theme('success-toast')
                                        .hideDelay(3000)
                                );
                               
                            }
                        }, function () {

                        });

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


    function copyArticleDialogController($scope, $rootScope, $cookies, $mdDialog, data, clipboard) {


        $scope.url = data;

        $scope.copy =  function()
        {

            clipboard.copyText($scope.url);
            $mdDialog.hide("Submited");
        }

        $scope.answer = function () {
            $mdDialog.hide("Submited");
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }




    $scope.updateStatusShared = function () {
        var page = this.s;
        var url = $scope.current.url;

        $scope.sharing = true;
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
                $scope.sharing = false;
                articleFactory.updateSharedArticles($scope.uid, $scope.current.serial_no, $scope.current.copied).then(
                    // callback function for successful http request
                    function success(response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Article Shared')
                                .action('CLOSE')
                                .position('bottom left')
                                .theme('success-toast')
                                .hideDelay(3000)
                        );
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