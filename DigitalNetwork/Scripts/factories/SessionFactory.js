var serviceId = 'sessionFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', sessionFactory]);

function sessionFactory($http) {

    function getSession() {


        var data = { ga_id: 'ga:162220485' ,from_date:'2017-10-01',to_date:'2017-10-16',extra:null};
      
        return $http.post('/api/sessions', data);
    }
    function getSession_campaign() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post('/api/campaign/sessions', data);
    }
    function getSession_page() {


        var data = { ga_id: 'ga:162220485', from_date: '2017-10-01', to_date: '2017-10-16', extra: null };

        return $http.post('api/pages/sessions', data);
    }

    var service = {
        getSession: getSession,
        getSession_campaign: getSession_campaign,
        getSession_page: getSession_page
    };

    return service;
}