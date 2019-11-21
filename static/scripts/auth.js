const authenticate = () => {
  console.log('authenticate()');
  var uiConfig = {
    callbacks: {
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        console.log('uiShown()');
      },
    },
    signInSuccessUrl: 'http://localhost/main.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };

  firebase.auth().onAuthStateChanged(function(user) {
    console.log("AuthStateChanged:", user);
    if ($('#firebaseui-auth-container').css('display') != 'none')
      showHome();
    if (user) {
      $('.signin-welcome').text(`Hi ${user.displayName}!`);
      $('.bttn--signin').text('SIGN OUT');
    }
    
  });

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

  return firebase;
}
