
var locations = [
    ['Dubai', 24.926976, 55.164529, 5],
    ['Lauterbrunnen', 46.589938, 7.920474, 4],
    ['Livingstone', -17.619177, 25.803556, 3],
    ['Key West', 24.961141, -81.744068, 2],
    ['Queenstown', -44.953772, 168.645954, 1]
];

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < locations.length; i++) {
        (function (i) {
            var marker = new google.maps.Marker({
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
            // Listener event functtion to display nearby skydiving locations when user cick on city
            google.maps.event.addListener(marker, 'click', (function () {

                var cityName = infowindow.getContent();
                console.log("City is " + cityName);

                // Zoom map closer to city
                map.setZoom(9);
                map.panTo(marker.position);

                if (cityName == "Queenstown") {
                    searchLocation = new google.maps.LatLng(locations[4][1], locations[4][2]);
                } else if (cityName == "Key West") {
                    searchLocation = new google.maps.LatLng(locations[3][1], locations[3][2]);
                } else if (cityName == "Livingstone") {
                    searchLocation = new google.maps.LatLng(locations[2][1], locations[2][2]);
                } else if (cityName == "Rio de Janeiro") {
                    searchLocation = new google.maps.LatLng(locations[1][1], locations[1][2]);
                } else if (cityName == "Dubai") {
                    searchLocation = new google.maps.LatLng(locations[0][1], locations[0][2]);
                }

                //Parameters for our places request
                console.log("search location is " + searchLocation);
                var request = {
                    location: searchLocation,
                    radius: 50000,
                    // title: ['skydiving'],
                    // types: ['skydiving']
                    keyword: ['skydiving centers']
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
                    console.log(results);
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
        })(i);

    }


}

$(document)
    .ready(function () {
        initMap();
    });

// var locations = [
//     ['Dubai', 24.926976, 55.164529, 5],
//     ['Lauterbrunnen', 46.589938, 7.920474, 4],
//     ['Livingstone', -17.619177, 25.803556, 3],
//     ['key west', 24.961141, -81.744068, 2],
//     ['Queenstown', -44.953772, 168.645954, 1]
// ];

// var marker, i;

// function initMap() {

//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 2,
//         center: new google.maps.LatLng(-33.92, 151.25),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });

//     var infowindow = new google.maps.InfoWindow();

//     for (i = 0; i < locations.length; i++) {
//         marker = new google.maps.Marker({
//             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//             map: map
//         });

//         google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
//             return function () {

//                 infowindow.setContent(locations[i][0]);
//                 infowindow.open(map, marker);
//             }
//         })(marker, i));
//         marker.addListener('mouseout', function () {
//             infowindow.close();
//         });

//     }

//     // Listener event functtion to display nearby skydiving locations when user cick on city
//     google.maps.event.addListener(marker, 'click', (function () {

//         var cityName = infowindow.getContent();
//         console.log("City is " + cityName);

//         // Zoom map closer to city
//         map.setZoom(9);
//         map.panTo(marker.position);

//         if (cityName == "Queenstown") {
//             searchLocation = new google.maps.LatLng(locations[4][1], locations[4][2]);
//         } else if (cityName == "key west") {
//             searchLocation = new google.maps.LatLng(locations[3][1], locations[3][2]);
//         } else if (cityName == "Livingstone") {
//             searchLocation = new google.maps.LatLng(locations[2][1], locations[2][2]);
//         } else if (cityName == "Rio de Janeiro") {
//             searchLocation = new google.maps.LatLng(locations[1][1], locations[1][2]);
//         } else if (cityName == "Dubai") {
//             searchLocation = new google.maps.LatLng(locations[0][1], locations[0][2]);
//         }

//         //Parameters for our places request
//         console.log("search location is " + searchLocation);
//         var request = {
//             location: searchLocation,
//             radius: 50000,
//             // title: ['skydiving'],
//             // types: ['skydiving']
//             keyword: ['skydiving centers']
//         };
//         //Make the service call to google
//         var callPlaces = new google.maps.places.PlacesService(map);
//         // var icon = 'assets/images/skydiving.png'
//         var iconImage = {
//             url: 'assets/images/skydiving.png', // image is 200 x 200
//             scaledSize: new google.maps.Size(32, 32),
//         };
//         callPlaces.search(request, function (results, status) {
//             //trace what Google gives us back
//             console.log(results);
//             $.each(results, function (i, place) {
//                 var placeLoc = place.geometry.location;
//                 var thisplace = new google.maps.Marker({
//                     map: map,
//                     position: place.geometry.location,
//                     icon: iconImage,
//                     title: place.name
//                 });
//             })
//         });
//     }));
// }

// $(document).ready(function () {
//     initMap();
// });
