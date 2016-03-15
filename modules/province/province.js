'use strict';
define(['angular','ngMessages','ngMaterial'],
       function (angular) {
    angular.module('myApp.province', [])
    .controller('provinceCtrl', provinceCtrl)
    


    function provinceCtrl($scope,$http) {
        let vm=this;
        console.log("provinceCtrl");
        
        getChurches($http,vm);
        
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
    
    
     function getChurches($http,vm) {
        
            console.log("get Province"); 
             $http.get('http://localhost:3000/church/findall').success( function(churchList) {
        	   vm.churches= churchList;  
       });

     }


});