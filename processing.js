angular.module('processing', [])
 .controller("ProcessingController", function(){
    this.first = 1;
    this.second = 2;
    this.listing = [1,2,3,4];
    this.lookup = {
      name: "Eric",
      age: "29",
      company: "Syncano"
     };

    this.getFirst = function getFirst(){
       return this.first; 
    };
	
	this.setFirst = function setFirst(val){
		this.first = val;
	};
	
   });
