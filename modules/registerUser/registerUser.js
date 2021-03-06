'use strict';
define(['angular','province'],
       function (angular) {
    angular.module('myApp.registerUser', ['myApp.province'])
    .controller('registerUserCtrl', registerUserCtrl)


    function registerUserCtrl($scope,$http,provinceList) {
        
      let vm=this;
      vm.provinces=[];
      vm.parent={};
      vm.parent.contactdetails=[];
      vm.perantGardians=[];
      vm.medicalinfo={};
      vm.medicalinfo.allergies=[];  
      vm.medicalinfo.histories=[];
      vm.medicalinfo.medications=[];
     
  
      //vm.provinces = provinceList.provincelist() ;
      // getProvince($http,vm);
       vm.showInstructions=true;
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
            console.log(vm.parent.contacttype);
            console.log(vm.parent.contactnum);
             
             var contactdetail = {'contacttype':vm.parent.contacttype,'contactno':vm.parent.contactnum};
             vm.parent.contactdetails.push(contactdetail);

        }
         
         
        this.removeContactno = function(index){
            console.log("remove called");
            console.log(vm.parent.contactdetails.indexOf(index));
            var rmindex = vm.parent.contactdetails.indexOf(index)
            if (rmindex > -1)
                {
                    vm.parent.contactdetails.splice(rmindex,1);
                }
        }     
        
        this.addPerent = function (){
            console.log("addParent entered");
            var perantGardian = {'name':vm.parent.name, 
                                 'surname': vm.parent.surname,
                                 'relation':vm.parent.relation,
                                 'codtactdetails':vm.parent.contactdetails
                                };
            vm.perantGardians.push(perantGardian);
        }
        
        this.removePerent = function(index){
            vm.perantGardians.splice(index,1);
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
         
    
          this.addEmergincyContact = function(){
            console.log("add emergincy contact");
            var emergencyContact={'name':vm.emerigency.name,
                                  'telephone':vm.emerigency.telephone
                                 };
            vm.emergencyContacts.push(emergencyContact);
        }
          
        this.removeEmergencycontact = function(index){
            vm.emergencyContacts.splice(index,1);
        }
        
        this.changeTab = function ()
        {
            console.log("change tab called");
            vm.showCamper=false;
            vm.showMedical=false;
            vm.showOther=false;
            vm.showParent=false;
            vm.showUpload=false;
             vm.showInstructions=false;
            
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



