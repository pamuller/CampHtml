define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider) {
        $stateProvider.state('churchState',{
            url: '/church',
            templateUrl: 'modules/church/churchcreate.html',
            controller:'ChurchCtrl'
        }),
       $stateProvider.state('registerUserState',{
            url: '/register',
            templateUrl: 'modules/registerUser/registerUser.html',
            controller:'registerUserCtrl'
        })
        
    })
});