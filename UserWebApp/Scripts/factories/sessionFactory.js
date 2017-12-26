var serviceId = 'sessionFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http','apiUrl',  sessionFactory]);

function sessionFactory($http, apiUrl) {

    function getCurrentMonthSession(_uid , _username) {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var fromYear = firstDay.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = lastDay.toISOString();
        var to = toDate.split('T');
        var t = to[0];
        var data = { uid: _uid, from_date: f, to_date: t, extra: _username };
      
        return $http.post(apiUrl + 'api/user/sessions', data);
    }
    function getCurrentDaySession(_uid, _username) {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var fromYear = firstDay.toISOString();
        var from = fromYear.split('T');
        var f = from[0];

        var data = { uid: _uid, from_date: f, to_date: f, extra: _username };

        return $http.post(apiUrl + 'api/user/sessions', data);
    }




    function Session(_from_date,_to_date) {

        var fromYear = _from_date.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to_date.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: t, extra: null };

        return $http.post(apiUrl + 'api/sessions', data);
    }
    function getSession_campaign() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post(apiUrl + 'api/campaign/sessions', data);
    }

    function Session_campaign(_from_date, _to_date) {

        var fromYear = _from_date.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to_date.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: t, extra: null };
        

        return $http.post(apiUrl + 'api/campaign/sessions', data);
    }

    function getSession_page() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post(apiUrl + 'api/pages/sessions', data);
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
        Session: Session,
        getSession_campaign: getSession_campaign,
        Session_campaign: Session_campaign,
        getSession_page: getSession_page,
        getSessionRate: getSessionRate,
        getCurrentDaySession: getCurrentDaySession,
        getRate: getRate
    };

    return service;
}