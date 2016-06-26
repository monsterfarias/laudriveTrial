"use strict";
;(function(){
	var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngStorage']);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
	      	templateUrl: 'pages/home.html',
	      	activetab: 'home',
	      	controller: 'mainController'
	    }).otherwise({ redirectTo: '/' });
    }]);
    app.controller('mainController', ['$scope', '$http', '$httpParamSerializerJQLike', require('./controllers/mainController')]);
    app.controller('menuController', ['$scope', '$http', '$httpParamSerializerJQLike', '$localStorage', require('./controllers/menuController')]);
    app.controller('storageController', ['$scope', '$localStorage', require('./controllers/storageController')]);
    app.directive('map', require('./directives/map'));
    app.directive('routes', require('./directives/routes'));
})();