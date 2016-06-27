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
      var markers = [];
      if(document.getElementById('map-canvas')){
        google.load("maps", "3",{other_params:'key=AIzaSyCn68DbULt9MIlczwMuRWVWCju7jmAID7w&libraries=places',callback:function(){loadMap();}});  
      }
      function loadMap(){
        map = new google.maps.Map(document.getElementById('map-canvas'), {
          center: {lat:19.3905191, lng:-99.4238161},
          styles: style,
          zoom: 5
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

        var origen = {lat:19.3905191, lng:-99.4238161};
        var destino = {};


        // CCrea un Serach box.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        /*map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });*/

        

        // [START region_getplaces]
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          if (places.length == 0) {
            return;
          }
          // Clear out the old markers.
          /*markers.forEach(function(marker) {
            marker.setMap(null);
          });*/
          markers = [];
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            // Create a marker for each place.
            destino.lat=place.geometry.location.lat();
            destino.lng=place.geometry.location.lng();
            //console.log(place.geometry.location.lat(), place.geometry.location.lng());
            //console.log(destino);
            markers.push(new google.maps.Marker({
              map: map,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();

        var routes = JSON.parse(localStorage.getItem('routes')) !== null? JSON.parse(localStorage.getItem('routes')): [];

        $("#generate-route").on("click", function(){
          //routes = JSON.parse(localStorage.getItem('routes'));
          //console.log(JSON.parse(localStorage.getItem('routes')));
          var hora = new Date();

          routes.push({
            origen: {
              lat:origen.lat, 
              lng:origen.lng
            },
            destino: {
              lat:destino.lat, 
              lng:destino.lng
            },
            hora:hora,
            lugar: $("#pac-input").val()
          });
          localStorage.setItem('routes', JSON.stringify(routes));


          setMapOnAll(null);
          var request = {
            origin: origen,
            destination: destino,
            travelMode: google.maps.DirectionsTravelMode['DRIVING'],
            unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
            provideRouteAlternatives: true
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel($(".description-route").get(0));
                directionsDisplay.setDirections(response);
            } else {
                    alert("No existen rutas entre ambos puntos");
            }
          });
        });

        $(".list-route").on("click", function(e){
          var currentDataContent= e.currentTarget;
          var origenLat = $(currentDataContent).data("latorigen");
          var origenLng= $(currentDataContent).data("lngorigen");
          var destinoLat = $(currentDataContent).data("latdestino");
          var destinoLng = $(currentDataContent).data("lngdestino");
          console.log(origenLat, origenLng, destinoLat, destinoLng);

          setMapOnAll(null);
          var request = {
            origin: {lat:origenLat,lng:origenLng},
            destination: {lat:destinoLat,lng:destinoLng},
            travelMode: google.maps.DirectionsTravelMode['DRIVING'],
            unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
            provideRouteAlternatives: true
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel($(".description-route").get(0));
                directionsDisplay.setDirections(response);
            } else {
                    alert("No existen rutas entre ambos puntos");
            }
          });

        });

        //var lastMarker = new google.maps.LatLng(19.3905191,-99.4238161);
        //placeMarker(lastMarker);

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            origen = pos;

            infowindow.setPosition(pos);
            var lastMarker = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            placeMarker(lastMarker);
            infowindow.setContent('Location found.');
            map.setCenter(pos);
            map.setZoom(17);
            }, function() {
              handleLocationError(true, infowindow, map.getCenter());
            });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infowindow, map.getCenter());
        }
          
      }
      var marker = null;
      function placeMarker(location) {
        marker = new google.maps.Marker({
          position: location,
          map: map
        });
      }

      function setMapOnAll(map) {
        if(marker != null){
          marker.setMap(map);
        }
        if (markers.length > 0) {
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      }
      /*

      
    */
    }
  };
};