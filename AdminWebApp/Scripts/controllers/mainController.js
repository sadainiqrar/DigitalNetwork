
var controllerId = 'mainController';

angular.module('DigitalMarket').controller(controllerId,
    ['$scope', '$rootScope', '$cookies', 'articleFactory', 'sessionFactory', 'umsFactory', '$mdDialog', mainController]);

function mainController($scope, $rootScope, $cookies, articleFactory, sessionFactory, umsFactory, $mdDialog) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    $scope.userdata = $rootScope.globals.currentUser;
    $scope.username = $scope.userdata.name;
    $scope.id = $scope.userdata.email;
    $scope.custom = $scope.userdata.currentSite.custom;
    $scope.site = $scope.userdata.currentSite.site_url;
    $scope.articles = [];
    $scope._sub_category = 'Political';

    $scope.NoArticles = true;
    $scope.MonthTraffic = '0';
    $scope.TodayTraffic = '0';
    $scope.MonthExpense = 0;

    var d = new Date()
    $scope.to = new Date();
    d.setDate(d.getDate() - 7);
    $scope.from = d;
    $scope.extra = 'week';
    $scope.step = 0;
    $scope.trafficData = [];
    $scope.trafficDate = [];
    $scope.earnedData = [];
    $scope.chart = {
    }


    $scope.order = [{ label: 'Recent', value: 'modified_date' }, { label: 'status', value:'status'}];

    $scope.selectedOrder = $scope.order[0].value;

    articleFactory.getAdminArticles($scope.id, $scope.site).then(
        // callback function for successful http request
        function success(response) {
            $scope.articles = response.data;
            if ($scope.articles.length === 0)
            {
                $scope.NoArticles = true;
            }
            else {
                $scope.NoArticles = false;
            }
            

        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }

    );



    sessionFactory.getCurrentMonthSession($scope.userdata.currentSite.ga_id, $scope.id).then(
        // callback function for successful http request
        function success(response) {
            $scope.MonthTraffic = response.data.sessions;
            $scope.MonthExpense = response.data.earned;
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );
    sessionFactory.getCurrentDaySession($scope.userdata.currentSite.ga_id, $scope.id).then(
        // callback function for successful http request
        function success(response) {
        
            $scope.TodayTraffic = response.data.sessions;
         
         
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );


    articleFactory.getTrafficGraph($scope.id, $scope.userdata.currentSite.ga_id, $scope.from, $scope.to, $scope.extra).then(
           // callback function for successful http request
        function success(response) {

            angular.forEach(response.data, function (value, key) {
                $scope.trafficDate.push(value.dateTime);
                $scope.trafficData.push(parseInt(value.sessions));
                $scope.earnedData.push(value.earned);
            });
            
            $scope.chart["chart3"] = {
                theme: 'light',
                backgroundColor: '#f8f8f8',
                primaryHeader: {
                    text: 'Expense overview'
                },
                exportOptions: {
                    image: false,
                    print: false
                },

                axisX: {
                    axisTickText: {
                        step: $scope.step
                    },
                    categoricalValues: $scope.trafficDate
                },
                tooltipSettings: {
                    chartBound: true,
                    axisMarkers: {
                        enabled: true,
                        mode: 'xy'
                    }
                },
                dataSeries: [{
                    seriesType: 'splinearea',
                    color: '#9539ca',
                    collectionAlias: 'Traffic generated',
                    data: $scope.trafficData
                }, {
                    seriesType: 'splinearea',
                    color: '#800000',
                    collectionAlias: 'Expense',
                    data: $scope.earnedData
                }]
            }

            $scope.$broadcast('success');
        },
        // callback function for error in http request
        function error(response) {
            // log errors
        }
    );

    $scope.addArticle = function (ev) {
        $mdDialog.show({
            controller: AddArticleDialogController,
            templateUrl: 'addArticle.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {

                if (answer === "Submited") {

                    $mdDialog.show({
                        locals: { data: "Your Article is Successfully Added" },
                        controller: SuccessDialogController,
                        templateUrl: 'successmessage.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    });
                    articleFactory.getAdminArticles($scope.id, $scope.site).then(
                        // callback function for successful http request
                        function success(response) {
                            $scope.articles = response.data;
                            if ($scope.articles.length === 0) {
                                $scope.NoArticles = true;
                            }
                            else {
                                $scope.NoArticles = false;
                            }


                        },
                        // callback function for error in http request
                        function error(response) {
                            // log errors
                        }

                    );
                }
            }, function () {
                
            });
    }

    $scope.publishArticles = function (ev) {
        $scope.currentArticle = this.article;
        $mdDialog.show({
            locals: { data: $scope.currentArticle },
            controller: publishArticleDialogController,
            templateUrl: 'publishArticle.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                if (answer === "Submited")
                {
                    $mdDialog.show({
                        locals: { data: "Your Article is Successfully Published" },
                        controller: SuccessDialogController,
                        templateUrl: 'successmessage.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    });
                    articleFactory.getAdminArticles($scope.id, $scope.site).then(
                        // callback function for successful http request
                        function success(response) {
                            $scope.articles = response.data;
                            if ($scope.articles.length === 0) {
                                $scope.NoArticles = true;
                            }
                            else {
                                $scope.NoArticles = false;
                            }


                        },
                        // callback function for error in http request
                        function error(response) {
                            // log errors
                        }

                    );
                }
            }, function () {
                
            });
    }

    

    $scope.deleteArticle = function (ev) {
        $scope.currentArticle = this.article;
        $mdDialog.show({
            locals: { data: $scope.currentArticle },
            controller: confirmDialogController,
            templateUrl: 'confirmmessage.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                if (answer === "Submited") {
                    $mdDialog.show({
                        locals: { data: "Your Article is Successfully Deleted" },
                        controller: SuccessDialogController,
                        templateUrl: 'successmessage.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    });
                    articleFactory.getAdminArticles($scope.id, $scope.site).then(
                        // callback function for successful http request
                        function success(response) {
                            $scope.articles = response.data;
                            if ($scope.articles.length === 0) {
                                $scope.NoArticles = true;
                            }
                            else {
                                $scope.NoArticles = false;
                            }


                        },
                        // callback function for error in http request
                        function error(response) {
                            // log errors
                        }

                    );
                }
            }, function () {

            });
    }

    $scope.dateActive = function (item) {
        $scope.extra = $scope.extra === item ? item : item;
        var d = new Date();
        if ($scope.extra === 'week') {
            d.setDate(d.getDate() - 7);
            $scope.from = d;
            $scope.step = 0;
        }
        else if ($scope.extra === 'month') {
            d.setDate(d.getDate() - 30);
            $scope.from = d;

            $scope.step = 4;
        }
        else if ($scope.extra === 'year') {
            d.setDate(d.getDate() - 365);
            $scope.from = d;

            $scope.step = 1;
        }

        articleFactory.getTrafficGraph($scope.id, $scope.userdata.currentSite.ga_id, $scope.from, $scope.to, $scope.extra).then(
            // callback function for successful http request
            function success(response) {
                $scope.trafficDate = [];
                $scope.trafficData = [];
                $scope.earnedData = [];
                angular.forEach(response.data, function (value, key) {
                    $scope.trafficDate.push(value.dateTime);
                    $scope.trafficData.push(parseInt(value.sessions));
                    $scope.earnedData.push(value.earned);
                });

                $scope.chart["chart3"] = {
                    theme: 'light',
                    backgroundColor: '#f8f8f8',
                    primaryHeader: {
                        text: 'Expense overview'
                    },
                    exportOptions: {
                        image: false,
                        print: false
                    },

                    axisX: {
                        axisTickText: {
                            step: $scope.step
                        },
                        categoricalValues: $scope.trafficDate
                    },
                    tooltipSettings: {
                        chartBound: true,
                        axisMarkers: {
                            enabled: true,
                            mode: 'xy'
                        }
                    },
                    dataSeries: [{
                        seriesType: 'splinearea',
                        color: '#9539ca',
                        collectionAlias: 'Traffic generated',
                        data: $scope.trafficData
                    }, {
                        seriesType: 'splinearea',
                        color: '#800000',
                        collectionAlias: 'Expense',
                        data: $scope.earnedData
                    }]
                }
                $scope.$broadcast('success1');
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



    function AddArticleDialogController($scope, $rootScope, $cookies, $mdDialog, articleFactory) {

        $scope.haveArticle = false;

        $scope.url = "";
        $scope.article = { title: "", description: "", image: "", url: "", site_url: $rootScope.globals.currentUser.currentSite.site_url };
        $scope.getMeta = function ()
        {
            articleFactory.getArticleMeta($scope.url).then(
                // callback function for successful http request
                function success(response) {
                    $scope.article.title = response.data.title;
                    $scope.article.description = response.data.description;
                    $scope.article.image = response.data.image;
                    $scope.article.url = response.data.url;
                    if ($scope.article.url.indexOf($scope.article.site_url) !== -1)
                    {
                        $scope.haveArticle = true;
                    }
                    else {
                        
                        $scope.haveArticle = false;
                        alert("Errorrrr");
                    }

                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );

        }

        $scope.addArticle = function () {
            articleFactory.InsertArticle($scope.article.title, $scope.article.url, $scope.article.image, $scope.article.description, $rootScope.globals.currentUser.currentSite.site_url).then(
                    // callback function for successful http request
                    function success(response) {
                        $scope.article = { title: "", description: "", image: "", url: "", site_url: $rootScope.globals.currentUser.currentSite.site_url };

                        $mdDialog.hide("Submited");
                    },
                    // callback function for error in http request
                    function error(response) {
                        // log errors

                    }
                );
        }
        $scope.answer = function () {
            $mdDialog.hide("Submited");
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }




    function publishArticleDialogController($scope, $rootScope, $cookies, $mdDialog, data, articleFactory) {

        $scope.category = "premium";
        $scope.success = false;
        $scope.sub_category = [{ label: 'Political', value: 'Political' }, {label: 'News', value: 'News' }, { label: 'Entertainment', value: 'Entertainment' }
            , { label: 'Sports', value: 'Sports' } , { label: 'Health', value: 'Health' }, { label: 'Showbiz', value: 'Showbiz' }
            , { label: 'Motivation', value: 'Motivation' }];
        $scope.selected_sub = $scope.sub_category[0].value;
        $scope.publish = function () {
            articleFactory.updateArticle(data.serial_no, !data.status, $scope.category, $scope.selected_sub).then(
                // callback function for successful http request
                function success(response) {
                    if (response.data === -1)
                    {

                        $mdDialog.hide("Submited");
                    }
                    else {
                        

                        $mdDialog.cancel();
                    }

                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );

        }
        $scope.answer = function () {
            $mdDialog.hide("Submited");
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }


    function confirmDialogController($scope, $rootScope, $cookies, $mdDialog, data, articleFactory) {
        
        $scope.delete = function () {
            articleFactory.deleteArticle(data.serial_no).then(
                // callback function for successful http request
                function success(response) {
                    if (response.data === -1) {

                        $mdDialog.hide("Submited");
                    }
                    else {


                        $mdDialog.cancel();
                    }

                },
                // callback function for error in http request
                function error(response) {
                    // log errors
                }
            );

        }
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


angular.module('DigitalMarket')
    .directive('myCustomChartControl', function () {
        return {
            restrict: 'E',
            template: '',
            controller: function ($scope, $element, $attrs) {
                $scope.$on('success', function (event, msg) {
                    $('<div id="' + $attrs.id + '"></div>')
                        .appendTo($element)
                        .shieldChart($scope.chart[$attrs.id]);
                });
                $scope.$on('success1', function (event, msg) {
                    var el = document.getElementById($attrs.id),
                        ngEl = angular.element(el);
                    ngEl.remove();


                    $('<div id="' + $attrs.id + '"></div>')
                        .appendTo($element)
                        .shieldChart($scope.chart[$attrs.id]);
                });



            }
        };
    });