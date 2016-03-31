'use strict';
define(['angular','province'],
       function (angular) {
    angular.module('myApp.registerUser', ['myApp.province'])
    .controller('registerUserCtrl', registerUserCtrl)


    function registerUserCtrl($scope,$http,provinceList) {
        
      let vm=this;
      vm.provinces=[];
      vm.parent1={};
      vm.parent1.contactdetails=[];
      vm.medicalinfo={};
      vm.medicalinfo.allergies=[];  
      vm.medicalinfo.histories=[];
      vm.medicalinfo.medications=[];
     
  
      //vm.provinces = provinceList.provincelist() ;
      // getProvince($http,vm);
       getProv(vm,provinceList) ;
        
        
        
        console.log("registerUserCtrl");
       // vm.churches=[];
        this.add = function()
        {
            console.log("add");
            console.log(this.church);
             $http.post('http://localhost:3000/registeruser/add',this).success( function(regiserUser) {
               vm.regiserUser = regiserUser;

           });
        }
        
        
         this.addContactno = function()
        {
            console.log("addContactno");
            console.log(vm.parent1.contacttype);
            console.log(vm.parent1.contactnum);
             
             var contactdetail = {'contacttype':vm.parent1.contacttype,'contactno':vm.parent1.contactnum};
             vm.parent1.contactdetails.push(contactdetail);

        }
         
         
         this.addAllergies = function()
         {
              var allergy={};
             if(vm.allergy == "Other" || vm.allergy == "Food")
                 {
                     var lb = vm.allergy +":" +vm.allergiesother ;
                     allergy={'allergy':lb}; 
                 }else{
                      allergy={'allergy':vm.allergy};
                 }

             vm.medicalinfo.allergies.push(allergy);
             
         }
         
         this.addMedication =function()
         {
              var medication={};
            
              medication={'medicationname':vm.medication};
        
             vm.medicalinfo.medications.push(medication);
             
         }
         
         
         this.addMedicalhistory = function()
         {
              var medicalhistory={};
             
             if (vm.medicalhistory == "Other")
                 {
                     var medicalhistory={'history':vm.medicalother};
                 }else{
                      var medicalhistory={'history':vm.medicalhistory};
                 }
             
            
             
             vm.medicalinfo.histories.push(medicalhistory);
             
         }
        
        
         this.getChurchListByProvince = function(province)
        {
               console.log("get Churches"); 
             var provinceSelected = province;
             var provinceid = provinceSelected['@rid'].substring(1,provinceSelected['@rid'].length)
              $http.get('http://localhost:3000/church/findByProvince/'+provinceid).success( function(churchlist) {
                vm.churchlist= churchlist;  
              });             
        }
    }
    
    function getProvince($http,vm) {
        
            console.log("get Province"); 
             $http.get('http://localhost:3000/province/findAll').success( function(provinceList) {
        	   vm.provinces= provinceList;  
       });
         
      }
    
    
    
    
    function getProv(vm,provinceList) {
        
            console.log("get Province"); 
         provinceList.getPovinceList().then(function(response){
             vm.provinces = response.data;
             
         }) ;
         
      }
    
  


  
});



