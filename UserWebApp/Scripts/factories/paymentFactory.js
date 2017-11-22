var serviceId = 'paymentFactory';

angular.module('DigitalMarket').factory(serviceId,
    ['$http', paymentFactory]);

function paymentFactory($http) {

    function get_payment_details(_uid, _username) {
   
        var data = { uid: _uid, username: _username };
        return $http.post('http://localhost:3208/api/payment/details', data);
    }

    function payment_history(_uid){
        var data = { uid: _uid };
        return $http.post('http://localhost:3208/api/payment/history', data);
    
    }
    function make_payment(_uid, _traffic, _amount) {
        var data = { uid: _uid, traffic:_traffic, amount:_amount };
        return $http.put('http://localhost:3208/api/payment/make', data);

    }


    var service = {
        get_payment_details: get_payment_details,
        payment_history: payment_history,
        make_payment: make_payment
    };

    return service;
}