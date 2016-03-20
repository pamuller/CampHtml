'use strict';
define(['angular'],
       function (angular) {
    angular.module('myApp.registerUser', [])
    .controller('registerUserCtrl', registerUserCtrl)


    function registerUserCtrl($scope,$http) {
        $scope.myDate = new Date();
        $scope.minDate = new Date(
          $scope.myDate.getFullYear(),
          $scope.myDate.getMonth() - 2,
          $scope.myDate.getDate());
        
   // var province = require('../province/province') ;

        let vm=this;
        
        
        
        console.log("registerUserCtrl");
       // vm.churches=[];
        this.add = function()
        {
            console.log("add");
            console.log(this.church);
             $http.post('http://localhost:3000/church/add',this.church).success( function(church) {
        	   vm.churches = church;

           });
        }

    }


  
});



