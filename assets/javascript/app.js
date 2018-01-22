
var locations = [
    ['Rio de Janeiro', -22.463857, -42.605267, 4],
    ['Dubai', 24.926976, 55.164529, 5],
    ['Livingstone', -17.619177, 25.803556, 3],
    ['key west', 24.961141, -81.744068, 2],
    ['Queenstown', -44.953772, 168.645954, 1]
];

var marker, i;

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    // Cities pinned with marker on Google map
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
        marker.addListener('mouseout', function () {
            infowindow.close();
        });

    }

    // Listener Functtion to display near skydiving locations when user cick on city
    google.maps.event.addListener(marker, 'click', (function () {
        // Zoom map to city
        map.setZoom(12);
        map.panTo(marker.position);

        //Parameters for our places request (To be updated instead of hardcoding the value)
        var searchLocation = new google.maps.LatLng(locations[4][1], locations[4][2]);

        console.log("search location is " + searchLocation);
        var request = {
            location: searchLocation,
            radius: 5000,
            types: ['skydiving']
        };
        //Make the service call to google
        var callPlaces = new google.maps.places.PlacesService(map);
        // var icon = 'assets/images/skydiving.png'
        var iconImage = {
            url: 'assets/images/skydiving.png', // image is 200 x 200
            scaledSize: new google.maps.Size(32, 32),
        };
        callPlaces.search(request, function (results, status) {
            //trace what Google gives us back
            $.each(results, function (i, place) {
                var placeLoc = place.geometry.location;
                var thisplace = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    icon: iconImage,
                    title: place.name
                });
            })
        });
    }));
}

$(document).ready(function () {
    initMap();
});


// =============================================================================================================================
// Google map using geolocation
// =============================================================================================================================

// var map, infoWindow;

// function initMap() {

//     // HTML5 geolocation
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };

//             map = new google.maps.Map(document.getElementById('map'), {
//                 // center: { lat: -34.397, lng: 150.644 },
//                 center: pos,
//                 zoom: 5
//             });
//             infoWindow = new google.maps.InfoWindow;

//             // infoWindow.setPosition(pos);
//             // // infoWindow.setContent('Location found.');
//             // infoWindow.open(map);
//             // map.setCenter(pos);

//             // Place the initial marker
//             var marker = new google.maps.Marker({
//                 position: pos,
//                 map: map,
//                 title: "Your current location!"
//             });

//             var service = new google.maps.places.PlacesService(map);

//         }, function () {
//             handleLocationError(true, infoWindow, map.getCenter());
//         });
//     } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//     }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
// }

// $(document).ready(function () {
//     initMap();
// });

// ==================================================================================================================================