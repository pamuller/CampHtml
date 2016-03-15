'use strict';
define(['angular','ngMessages','datatables'],
       function (angular){
    angular.module('myApp.churchcreate', ['datatables'])
    .controller('ChurchCtrl', ChurchcreateCtrl)
    
    
  //  ChurchcreateCtrl.$inject = ['$scope','$http'];
             
                
    function ChurchcreateCtrl($scope,$http,DTOptionsBuilder,DTColumnDefBuilder) {
        var vm=this;
        vm.provinces = [];
        vm.churchlist = [];
        vm.church = null;
        
        vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('responsive', true);
       
         vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];
        
        
       /* vm.dtColumnDefs = [
              DTColumnDefBuilder.newColumnDef(0),
              DTColumnDefBuilder.newColumnDef(1),
              DTColumnDefBuilder.newColumnDef(2),
              DTColumnDefBuilder.newColumnDef(3).notSortable()
          ];*/
         
         /*$http.get('http://localhost:3000/province/findall').success( function(provinceList) {
        	    vm.provinces  = provinceList;
           });*/
        
       getProvince($http,vm);
       getChurchlist($http,vm);
    
      // vm.church.province = provinceCtrl.findall();
        
        
        console.log("ChurchcreateCtrl");  
       // vm.churches=[];
        this.add = function()
        {
            console.log("add"); 
            console.log(this.church);
            var obj =angular.toJson(this.church);
             $http.post('http://localhost:3000/church/add',obj).success( function(church) {
        	   vm.churchlist.push(church[0]);
               vm.church = null;
        	 // console.log("Added:" +church);
           }).error(function(data, status)
                     {
                 console.log(data +" " +status);
             });
            
        } 
        
        
         this.showCompanyView =function()
        {
           vm.church =vm.churchlist[index];
        }
         
           this.modifyChurch =function(index)
        {
             //vm.church =vm.churchlist[index];
               var churchid=vm.churchlist[index]['rid'].substring(1);
             $http.get('http://localhost:3000/church/find/'+churchid).success( function(church) {
        	   vm.church  = church[0]
             });   
               
               
        }
           
          this.removeChurch =function(index)
        {
           
               var churchid=vm.churchlist[index]['rid'].substring(1);
                   $http.delete('http://localhost:3000/church/add/'+churchid,{})
	                    .then(function(response) {
	                  	vm.churchlist.splice(index, 1);
	                    	vm.church= null;
	                      // assumes if ok, response is an object with some data, if not, a string with error
	                      // customize according to your api
	       
	                    });
        }   
        
        
    }            
    
    
      function getProvince($http,vm) {
        
            console.log("get Province"); 
             $http.get('http://localhost:3000/province/findAll').success( function(provinceList) {
        	   vm.provinces= provinceList;  
       });
         
      }
          
     function getChurchlist($http,vm) {
        
            console.log("get Churches"); 
             $http.get('http://localhost:3000/church/findAll').success( function(churclist) {
        	   vm.churchlist= churclist;  
       });          
            
     }
    
    
   
        
     
    

});



