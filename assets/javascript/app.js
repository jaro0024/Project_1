
var locations = [
    ['Dubai', 25.0657005, 55.1712799, 5],
    ['Lauterbrunnen', 46.5956802, 7.90765, 4],
    ['Empuriabrava', 42.2469101, 3.12059, 3],
    ['Key West', 24.5552406, -81.7816315, 2],
    ['Queenstown', -45.0302315, 168.6627045, 1]
];

var searchLat;
var searchLong;

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
                var searchLocation;

                // Zoom map closer to city
                map.setZoom(9);
                map.panTo(marker.position);

                if (cityName == "Queenstown") {
                    searchLocation = new google.maps.LatLng(locations[4][1], locations[4][2]);
                    searchLat = locations[4][1];
                    searchLong = locations[4][2];
                } else if (cityName == "Key West") {
                    searchLocation = new google.maps.LatLng(locations[3][1], locations[3][2]);
                    searchLat = locations[3][1];
                    searchLong = locations[3][2];
                } else if (cityName == "Empuriabrava") {
                    searchLocation = new google.maps.LatLng(locations[2][1], locations[2][2]);
                    searchLat = locations[2][1];
                    searchLong = locations[2][2];
                } else if (cityName == "Lauterbrunnen") {
                    searchLocation = new google.maps.LatLng(locations[1][1], locations[1][2]);
                    searchLat = locations[1][1];
                    searchLong = locations[1][2];
                } else if (cityName == "Dubai") {
                    searchLocation = new google.maps.LatLng(locations[0][1], locations[0][2]);
                    searchLat = locations[0][1];
                    searchLong = locations[0][2];
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
                            // hours: place.operating_hours
                        });
                    })
                });
                // Call wetherInfo function to get weather details of city
                weatherInfo();
            }));

        })(i);
    }
}

// Function to get weather info from city
function weatherInfo() {

    /// API key for weather
    var APIKey = "999df4c3925000e8f0fcd5765a05caf2";
    // Here we are building the URL we need to query the database
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=24.926976&lon=55.164529&units=imperial&appid=" + APIKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + searchLat + "&lon=" + searchLong + "&units=imperial&appid=" + APIKey;
    console.log("Query url is: " + queryURL);
    // Here we run our AJAX call to the OpenWeatherMap API and store all of the retrieved data inside of an object called "response"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<strong>" + response.name + " Weather Details:</strong>");
        $(".temp").text("Current Temperature(F): " + response.main.temp + "\xB0");
        $(".desc").text("Weather Descritption:  " + response.weather[0].description);
        $(".humidity").text("Humidity: " + response.main.humidity + "\xB0");
        $(".wind").text("Wind Speed: " + response.wind.speed + " m/s ");
        $(".max").text("Maximum Temperature(F): " + response.main.temp_max + "\xB0");
        $(".min").text("Minimum Temperature(F): " + response.main.temp_min + "\xB0");

        // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Current Temperature (F): " + response.main.temp);
        // console.log("Weather Descritption: " + response.weather[0].description);
        // console.log("Max: " + response.main.temp_max + "\xB0");
        // console.log("Min: " + response.main.temp_min + "\xB0");
    });
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