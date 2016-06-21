"use strict";
;(function(){
	var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch']);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
	      	templateUrl: 'pages/home.html',
	      	activetab: 'home',
	      	controller: 'mainController'
	    }).when('/acerca-de', {
	      	templateUrl: 'pages/about.html',
	      	activetab: 'about',
	      	controller: 'aboutController'
	    }).otherwise({ redirectTo: '/' });
    }]);
    app.controller('mainController', ['$scope', require('./controllers/mainController')]);
    app.controller('aboutController', ['$scope', require('./controllers/aboutController')]);
})();