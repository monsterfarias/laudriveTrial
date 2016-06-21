(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./controllers/mainController":2,"./directives/map":3}],2:[function(require,module,exports){
/**
 * Created by @jose_farias on 21/06/16.
 * main controller
 */
 'use strict';
module.exports = function($scope){
	console.log("I am doing something");
};

},{}],3:[function(require,module,exports){
/**
 * Created by @monster_farias on 21/06/16.
 * Directiva para Google maps
 */
 'use strict';

 module.exports = function() {
  return {
    restrict: 'A',
    scope : true,
    link: function (scope, element, attrs) {
      var style = [
          {
              "featureType": "all",
              "elementType": "all",
              "stylers": [
                  {
                      "invert_lightness": true
                  },
                  {
                      "saturation": 20
                  },
                  {
                      "lightness": 50
                  },
                  {
                      "gamma": 0.4
                  },
                  {
                      "hue": "#00ffee"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#405769"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#232f3a"
                  }
              ]
          }
      ];
      var map = "";
      var infowindow = "";
      if(document.getElementById('map-canvas')){
        google.load("maps", "3",{other_params:'sensor=[true]',callback:function(){loadMap();}});  
      }
      function loadMap(){
        map = new google.maps.Map(document.getElementById('map-canvas'), {
          center: {lat:19.318073, lng:-99.2217095},
          styles: style,
          zoom: 19
        });
        infowindow = new google.maps.InfoWindow();
        map.setOptions({
          scrollwheel: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false
        });
        var lastMarker = new google.maps.LatLng(19.318073,-99.2217095);
        placeMarker(lastMarker);
          
      }
      function placeMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
      }
      /*function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);

        document.getElementById('submit').addEventListener('click', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
      }*/

      /*function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var waypts = [];
        var checkboxArray = document.getElementById('waypoints');
        for (var i = 0; i < checkboxArray.length; i++) {
          if (checkboxArray.options[i].selected) {
            waypts.push({
              location: checkboxArray[i].value,
              stopover: true
            });
          }
        }
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if(status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
              '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }*/
    }
  };
};
},{}]},{},[1]);
