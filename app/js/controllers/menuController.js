
'use strict';

module.exports = function($scope, $http,$httpParamSerializerJQLike){

    $scope.searchActive = 'active';
    $scope.historyActive = '';
    $scope.perfilActive = '';


    $scope.open = function open(e, className){
        e.preventDefault();
         $scope.searchActive = 'active';
        $("."+className).addClass("active");
    };
    $scope.close = function close(e, className){
        $("."+className).removeClass("active");
    };
    
};
