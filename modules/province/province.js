'use strict';
define(['angular'],
       function (angular) {
   return angular.module('myApp.province', [])
    .controller('provinceCtrl', provinceCtrl)
    


    function provinceCtrl($scope,$http) {
        let vm=this;
        console.log("provinceCtrl");
        
       
        
       // vm.churches=[];
        this.findall = function()
        {
            console.log("add");
            console.log(this.church);
             $http.get('http://localhost:3000/province/findall').success( function(provinceList) {
        	   vm.provinces = provinceList;

           });
        }

    }
    
    
     


});