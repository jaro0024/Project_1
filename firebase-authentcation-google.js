

//  ------------------------------------------------------------------------------------------------------------------------
//  Goes inside html file
//  <!-- You must include the Google Platform Library on your web pages that integrate Google Sign-In. -->
//  <script src="https://apis.google.com/js/platform.js" async defer></script>
//  <!-- Specify the client ID you created for your app in the Google Developers Console with the google-signin-client_id meta element. -->
//  <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com.apps.googleusercontent.com.apps.googleusercontent.com">
// -------------------------------------------------------------------------------------------------------------------------

// Google Authentication
var provider = new firebase.auth.GoogleAuthProvider();

$(document).on("click", ".signIn", function () {
    console.log("Sign In button clicked");
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log(token);
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        $(".trainSchedule").show();
        $(".addTrain").show();

        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    $(this).removeClass('signIn')
        .addClass('signOut')
        .html('Sign Out Of Google');
});

$(document).on('click', '.signOut', function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        $(".trainSchedule").hide();
        $(".addTrain").hide();
    }).catch(function (error) {
        // An error happened.
    });
    $(this).removeClass('signOut')
        .addClass('signIn')
        .html('Sign In with Google');
});
