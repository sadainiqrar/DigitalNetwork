
var controllerId = 'mainController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', 'Facebook', '$rootScope', '$cookies', 'articleFactory', 'sessionFactory', 'umsFactory', 'ModalService', mainController]);

function mainController($scope, Facebook, $rootScope, $cookies, articleFactory, sessionFactory, umsFactory, ModalService,) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.fullname;
    $scope.id = $scope.userdata.username;
    $scope.uid = $scope.userdata.uid;
   
    $scope.articles = [];
    $scope._category = 'premium';
    $scope._sub_category = 'Political';

    $scope.order = [{ label: 'Recent', value: 'modified_date' }, { label: 'Featured', value:'views'}, { label: 'Most Shared', value: 'shares'}];

    $scope.selectedOrder = $scope.order[0].value;
    $scope.addedUms = [];
    $scope.ums = [];
    $scope.isLoading = true;
    $scope.monthlyIsLoading = true;
    $scope.dailyIsLoading = true;
    $scope.monthlyTrafficIsLoading = true;
    $scope.umsLoading = true;
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
                    $scope.umsLoading = false;
                    angular.forEach($scope.ums, function (value, key) {
                        if ($scope.dbUms.indexOf(value.id) !== -1) {
                            $scope.addedUms.push(value);
                        }
                    }
                    );
                } else {
                    //FlashService.Error(response.message);
                    $scope.umsLoading = false;

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
                            $scope.umsLoading = false;
                            angular.forEach($scope.ums, function (value, key) {
                                if ($scope.dbUms.indexOf(value.id) !== -1) {
                                    $scope.addedUms.push(value);
                                   
                                }
                            }
                            );
                        } else {
                            //FlashService.Error(response.message);
                            $scope.umsLoading = false;

                        }

                    });

                } else {
                    //FlashService.Error(response.message);
                    $scope.umsLoading = false;

                }
            }, { scope: 'manage_pages,pages_show_list,publish_actions' });
        };
    }
    );

    articleFactory.getArticles($scope.uid, $scope._category, null).then(
        // callback function for successful http request
        function success(response) {
            $scope.articles = response.data;
            angular.forEach($scope.articles, function (value,key) {
                articleFactory.getViewShares(value.site_url, value.modified_date, value.url).then(
                    // callback function for successful http request
                    function success(response) {
                        value.views = response.data;

                        $scope.isLoading = false;
                    },
                    // callback function for error in http request
                    function error(response) {
                        value.views = "-1";
                        $scope.isLoading = false;
                        //// log errors
                    }

                );
                }
            );

            $scope.isLoading = false;

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    
    );




    sessionFactory.getCurrentMonthSession($scope.uid, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.sessions = response.data.premium + response.data.non_premium;
            $scope.monthlyTrafficIsLoading = false;
            $scope.monthly_earned = 0.0;
            var premium = response.data.premium;
            var non_premium = response.data.non_premium;
            sessionFactory.getRate("premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.monthly_earned = $scope.monthly_earned + ((premium/1000) * response.data[0].rate);
                    

                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                    $scope.monthlyIsLoading = false;
                    $scope.monthlyTrafficIsLoading = false;
                }
            );
            sessionFactory.getRate("non-premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.monthly_earned = $scope.monthly_earned + ((non_premium/1000) * response.data[0].rate);
                    $scope.monthlyIsLoading = false;

                },
                // callback function for error in http request
                function error(response) {

                    $scope.monthlyIsLoading = false;
                    $scope.monthlyTrafficIsLoading = false;
                    // log errors
                }
            );

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    sessionFactory.getCurrentDaySession($scope.uid, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.today_earned = 0.0;
            var premium = response.data.premium;
            var non_premium = response.data.non_premium;
            sessionFactory.getRate("premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.today_earned = $scope.today_earned + ((premium/1000) * response.data[0].rate);
                   

                },
                // callback function for error in http request
                function error(response) {
                    $scope.dailyIsLoading = false;
                    // log errors
                }
            );
            sessionFactory.getRate("non-premium").then(
                // callback function for successful http request
                function success(response) {
                    $scope.today_earned = $scope.today_earned + ((non_premium/1000) * response.data[0].rate);
                    $scope.dailyIsLoading = false;

                },
                // callback function for error in http request
                function error(response) {
                    // log errors

                    $scope.dailyIsLoading = false;
                }
            );

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );


    $scope.openModal = function (id) {
        $scope.current = this.article;
        ModalService.Open(id);
    }
    $scope.closeModal = function (id) {
        ModalService.Close(id);
    }



    $scope.insertShared = function () {

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

    $scope.insertCopied = function () {
        articleFactory.insertCopiedArticles($scope.uid , this.article.serial_no).then(
            // callback function for successful http request
            function success(response) {
                articleFactory.getArticles($scope.uid, $scope._category, null).then(
                    // callback function for successful http request
                    function success(response) {
                        $scope.articles = response.data;

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
    //$scope.premium = function () {
    //    $scope.category = 'premium';
    //    articleFactory.getArticles($scope.uid, $scope.category, null).then(
    //        // callback function for successful http request
    //        function success(response) {
    //            $scope.articles = response.data;

    //        },
    //        // callback function for error in http request
    //        function error(response) {
    //            // log errors
    //        }
    //    );
    //}
    //$scope.non_premium = function () {

    //    $scope.category = 'non_premium';
    //    articleFactory.getArticles($scope.uid, $scope.category, null).then(
    //        // callback function for successful http request
    //        function success(response) {
    //            $scope.articles = response.data;

    //        },
    //       //  callback function for error in http request
    //        function error(response) {
    //            // log errors
    //        }
    //    );
    //}

    $scope.active = 'Political';
    $scope.makeActive = function (item) {
        $scope.active = item;
    }

}