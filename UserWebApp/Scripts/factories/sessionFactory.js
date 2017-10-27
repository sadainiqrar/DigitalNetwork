var serviceId = 'sessionFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http',  sessionFactory]);

function sessionFactory($http) {

    function getCurrentMonthSession() {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var fromYear = firstDay.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = lastDay.toISOString();
        var to = toDate.split('T');
        var t = to[0];
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: t, extra: 'ga:campaign==zuraiz' };
      
        return $http.post('http://localhost:3208/api/sessions', data);
    }
    function getCurrentDaySession() {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var fromYear = firstDay.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
    
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: f, extra: 'ga:campaign==zuraiz' };

        return $http.post('http://localhost:3208/api/sessions', data);
    }

    function Session(_from_date,_to_date) {

        var fromYear = _from_date.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to_date.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: t, extra: null };

        return $http.post('http://localhost:3208/api/sessions', data);
    }
    function getSession_campaign() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post('http://localhost:3208/api/campaign/sessions', data);
    }

    function Session_campaign(_from_date, _to_date) {

        var fromYear = _from_date.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to_date.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: t, extra: null };
        

        return $http.post('http://localhost:3208/api/campaign/sessions', data);
    }

    function getSession_page() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post('http://localhost:3208/api/pages/sessions', data);
    }


    function getSessionRate(s,r) {
        var session = parseFloat(s);
     
        var earned = (r / 1000) * session;
        return earned;
    }
    function getRate() {

        return $http.get('http://localhost:3208/api/rate/non-premium')

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