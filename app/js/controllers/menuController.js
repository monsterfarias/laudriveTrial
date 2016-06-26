
'use strict';

module.exports = function($scope, $http,$httpParamSerializerJQLike, $localStorage){

    $scope.searchActive = 'active';
    $scope.historyActive = '';

    $scope.routes = localStorage.getItem('routes');
    $scope.list = JSON.parse($scope.routes);


    $scope.open = function open(e, className, section){
        e.preventDefault();
        switch(section) {
            case 'searchActive':
                $scope.historyActive = '';
                $scope.searchActive = 'active';
                //console.log(JSON.parse(localStorage.getItem('routes')));
                $scope.routes = localStorage.getItem('routes');
                $scope.list = JSON.parse($scope.routes);
                break;
            case 'historyActive':
                $scope.historyActive = 'active';
                $scope.searchActive = '';
                //console.log(JSON.parse(localStorage.getItem('routes')));
                $scope.routes = localStorage.getItem('routes');
                $scope.list = JSON.parse($scope.routes);
                break;
        }
        $(".menu").removeClass("active");
        $("."+className).addClass("active");
    };
    $scope.close = function close(e, className, section){
        switch(section) {
            case 'searchActive':
                $scope.historyActive = '';
                $scope.searchActive = '';
                //console.log(JSON.parse(localStorage.getItem('routes')));
                $scope.routes = localStorage.getItem('routes');
                $scope.list = JSON.parse($scope.routes);
                break;
            case 'historyActive':
                $scope.historyActive = '';
                $scope.searchActive = '';
                //console.log(JSON.parse(localStorage.getItem('routes')));
                $scope.routes = localStorage.getItem('routes');
                $scope.list = JSON.parse($scope.routes);
                break;
        }
        $("."+className).removeClass("active");
    };
    
};
