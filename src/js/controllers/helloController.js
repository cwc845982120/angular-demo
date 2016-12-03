var myApp = angular.module('myApp');

myApp.controller('helloController',['$scope','helloService','toolService',function($scope,helloService,toolService){

    $scope.hello = "caowencheng";

    var params = {
    	'name':'caowencheng',
    	'age':'24'
    };

    $scope.getData = function(){
        helloService.getData("checkBlackList",params).then(function(data){
            console.log(data);
            return helloService.getData("applyEnCode",params);
        },function(data){
            //超时
        }).then(function(data){
            console.log(data);
        },function(data){
            //超时
        })
    }

 }]);
