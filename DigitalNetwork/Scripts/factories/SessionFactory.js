var serviceId = 'sessionFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', sessionFactory]);

function sessionFactory($http) {

    function getSession() {


        var data = { ga_id: 'ga:162220485' ,from_date:'2017-10-01',to_date:'2017-10-16',extra:null};
      
        return $http.post('/api/sessions', data);
    }

    function Session(_from_date,_to_date) {

        var fromYear = _from_date.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to_date.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: t, extra: null };

        return $http.post('/api/sessions', data);
    }
    function getSession_campaign() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post('/api/campaign/sessions', data);
    }

    function Session_campaign(_from_date, _to_date) {

        var fromYear = _from_date.toISOString();

        var from = fromYear.split('T');
        var f = from[0];
        var toDate = _to_date.toISOString();
        var to = toDate.split('T');

        var t = to[0];
        var data = { ga_id: 'ga:162220485', from_date: f, to_date: t, extra: null };
        

        return $http.post('/api/campaign/sessions', data);
    }

    function getSession_page() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post('api/pages/sessions', data);
    }

    var service = {
        getSession: getSession,
        Session: Session,
        getSession_campaign: getSession_campaign,
        Session_campaign: Session_campaign,
        getSession_page: getSession_page
    };

    return service;
}