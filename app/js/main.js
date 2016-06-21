"use strict";
;(function(){
	var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch']);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
	      	templateUrl: 'pages/home.html',
	      	activetab: 'home',
	      	controller: 'mainController'
	    }).otherwise({ redirectTo: '/' });
    }]);
    app.controller('mainController', ['$scope', require('./controllers/mainController')]);

    app.directive('map', require('./directives/map'));
})();