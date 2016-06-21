(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./controllers/aboutController":2,"./controllers/mainController":3}],2:[function(require,module,exports){
/**
 * Created by @jose_farias on 19/05/16.
 * main controller
 */
 'use strict';
module.exports = function($scope){
	console.log("I am doing something in controller about");
};

},{}],3:[function(require,module,exports){
/**
 * Created by @jose_farias on 19/05/16.
 * main controller
 */
 'use strict';
module.exports = function($scope){
	console.log("I am doing something");
};

},{}]},{},[1]);
