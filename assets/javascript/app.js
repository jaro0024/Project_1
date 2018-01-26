

// Array to hold city name and corresponding latitude and logitude
var locations = [
    ['Dubai', 25.0657005, 55.1712799],
    // ['Interlaken', 46.5956802, 7.90765],
    // ['Lauterbrunnen', 46.9480896, 7.4474401],
    // ['Kathmandu', 27.7016907, 85.3206024],
    // ['Cape Town', -33.9258385, 18.4232197],
    ['Foz do Iguaçu', -25.5477791, -54.5880585],
    ['Empuriabrava', 42.2469101, 3.12059],
    ['Key West', 24.5552406, -81.7816315],
    ['Waialua', 21.5768795, -158.131546]
    // ['Fox Glacier', -43.46448, 170.017588] // 2 locations
    // ['Queensland', -20.7252293, 139.4972687]
    // ['Livingstone', -17.8419399, 25.85425] // Only one location and no location details
    // ['Queenstown', -45.0302315, 168.6627045] // Many locations
];

// Variable to store latitude of city for weatherInfo function
var searchLat;
// Variable to store longitude of city search for weatherInfo function
var searchLong;

// To store location place_id for Google Places API Web Services search
var locationPlaceID = [];



// Function that initializes and adds the map when the web page loads
function initMap() {

    // Variable for map
    var map;
    // variable for infoWindow
    var infowindow;
    // new google.maps.Map() creates a new Google maps object
    //  getElementById() function to find the map div on the web page
    map = new google.maps.Map(document.getElementById('map'), {
        // Zoom property specifies the zoom level for the map
        zoom: 3,
        // Center property tells the API where to center the map. The map coordinates are set in the order: latitude, longitude.Given below are latitude and logitude of Kenya so that user can see all pinned cities when map loads. 
        center: new google.maps.LatLng(-0.023559, 37.906193),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // InfoWindow displays content (usually text or images) in a popup window above the map, at a given location when user click or mouseover
    infowindow = new google.maps.InfoWindow();

    // For loop to mark/pin each cities from the array with marker based on latitude and longitude
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

                // Assiging the latitude and longitude to variables when user click on the city
                if (cityName == "Waialua") {
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
                } else if (cityName == "Foz do Iguaçu") {
                    searchLocation = new google.maps.LatLng(locations[1][1], locations[1][2]);
                    searchLat = locations[1][1];
                    searchLong = locations[1][2];
                } else if (cityName == "Dubai") {
                    searchLocation = new google.maps.LatLng(locations[0][1], locations[0][2]);
                    searchLat = locations[0][1];
                    searchLong = locations[0][2];
                }

                //Parameters for our places request
                var request = {
                    location: searchLocation,
                    radius: 25000,
                    keyword: ['skydiving center']
                };
                //Make the service call to google
                var callPlaces = new google.maps.places.PlacesService(map);
                var iconImage = {
                    url: 'assets/images/skydiving.png', // image is 200 x 200
                    scaledSize: new google.maps.Size(32, 32),
                };
                callPlaces.search(request, function (results, status) {

                    locationPlaceID = results[0].place_id;

                    $.each(results, function (i, place) {
                        var placeLoc = place.geometry.location;
                        var thisplace = new google.maps.Marker({
                            map: map,
                            position: placeLoc,
                            icon: iconImage,
                            title: place.name
                        });
                    })
                    // Call skydivingLocationDetails function to get skydiving location details
                    skydivingLocationDetails();
                });
                // Call wetherInfo function to get weather details of city when user click on city icon
                weatherInfo();
            }));

        })(i);
    }
}


// Function to get current weather info of each city
function weatherInfo() {

    /// API key for weather
    var APIKey = "999df4c3925000e8f0fcd5765a05caf2";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + searchLat + "&lon=" + searchLong + "&units=imperial&appid=" + APIKey;
    // console.log("Query url is: " + queryURL);
    // Here we run our AJAX call to the OpenWeatherMap API and store all of the retrieved data inside of an object called "response"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        // Log the queryURL
        // console.log(queryURL);

        // Log the resulting object
        // console.log(response);

        // Transfer content to HTML
        $(".city").html("<strong>" + response.name + " Weather Details:</strong>");
        $(".temp").text("Current Temperature(F): " + response.main.temp + "\xB0");
        $(".desc").text("Weather Descritption:  " + response.weather[0].description);
        $(".humidity").text("Humidity: " + response.main.humidity + "\xB0");
        $(".wind").text("Wind Speed: " + response.wind.speed + " m/s ");
        $(".max").text("Maximum Temperature(F): " + response.main.temp_max + "\xB0");
        $(".min").text("Minimum Temperature(F): " + response.main.temp_min + "\xB0");

    });
}


// Function to get weather info from city
function skydivingLocationDetails() {

    /// API key for Google Places API Web Service
    var googleWebServiceAPIKey = "AIzaSyCopXFH0eqDJPzFsLPyq27LHvsVcWwQk9s";
    // Query URL
    var locationQueryURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + locationPlaceID + "&key=" + googleWebServiceAPIKey;
    console.log("Query url is: " + locationQueryURL);
    // Here we run our AJAX call to the OpenWeatherMap API and store all of the retrieved data inside of an object called "response"

    // Code to fix CORS issue
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    // ajax call
    $.ajax({
        url: locationQueryURL,
        method: "GET"
    }).done(function (locationResponse) {

        var searchResults = locationResponse.result;
        // console.log(searchResults);

        // Transfer content to web page
        $(".locationDetails").html("<strong>Skydiving Location Details: </strong>");
        $(".locationName").text("Name: " + searchResults.name);
        $(".locationAddress").text("Address: " + searchResults.formatted_address);
        $(".locationPhone").text("International Phone Number: " + searchResults.international_phone_number);
        $(".locationWebsite").text("Website: ")
        $(".locationWebsite").append("<a href='" + searchResults.website + "' target='_blank'>" + searchResults.website + "</a>");
        $(".locationRating").text("Rating: " + searchResults.rating);

        // Location Operating Hours
        var locationOpHours = searchResults.opening_hours;
        if (locationOpHours != undefined) {
            var locationHours = searchResults.opening_hours.weekday_text;
            for (var i = 0; i < locationHours.length; i++) {
                var hourDiv = $("<div>");
                var testHour = $("<p>");
                testHour = locationHours[i];
                hourDiv.append(testHour);
                hourDiv.append($("<br>"));
                $(".locationHours").append(testHour);
                $(".locationHours").append($("<br>"));
            }
        }

        // Location Photos
        var pictures = searchResults.photos;
        for (var i = 0; i < pictures.length; i++) {
            var imageDiv = $("<div class='image-div'>");
            var testImage = $("<img>");
            var imgRef = pictures[i].photo_reference;
            var photoURL = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + imgRef + "&sensor=false&maxheight=500&maxwidth=500&key=" + googleWebServiceAPIKey;
            testImage.attr("src", photoURL);
            imageDiv.append(testImage);
            $(".locationPhotos").append(imageDiv);
        }

    });
}


$(document)
    .ready(function () {
        initMap();
    });
