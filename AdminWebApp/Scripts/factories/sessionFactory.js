var serviceId = 'sessionFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http','apiUrl',  sessionFactory]);

function sessionFactory($http, apiUrl) {

    function getCurrentMonthSession(_gid , _email) {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var fromYear = firstDay.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = lastDay.toISOString();
        var to = toDate.split('T');
        var t = to[0];
        var data = { ga_id: _gid, from_date: f, to_date: t, extra: _email };
      
        return $http.post(apiUrl + 'api/admin/sessions', data);
    }
    function getCurrentDaySession(_gid, _email) {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var fromYear = firstDay.toISOString();
        var from = fromYear.split('T');
        var f = from[0];
        
        var data = { ga_id: _gid, from_date: f, to_date: f, extra: _email };

        return $http.post(apiUrl + 'api/admin/sessions', data);
    }





    function getSessionRate(s, c) {
        return getRate(c).then(
            // callback function for successful http request
            function success(response) {
               return (response.data[0].rate ) * s;

            },
            // callback function for error in http request
            function error(response) {
                // log errors
                return 0;
            }
        );
    }
    function getRate(category) {

        return $http.get(apiUrl + 'api/rate/' + category);

    }

    var service = {
        getCurrentMonthSession: getCurrentMonthSession,
        getSessionRate: getSessionRate,
        getCurrentDaySession: getCurrentDaySession,
        getRate: getRate
    };

    return service;
}