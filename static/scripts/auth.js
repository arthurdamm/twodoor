/**
 * @fileoverview Module for User Authentication and Data
 * @package
 */


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
    signInSuccessUrl: 'http://www.arthurdamm.com/main.html',
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
      loadCustomDecks();
    }
    
  });

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

  return firebase;
}

/**
 * Returns currently authenticated user or null
 * @return {Object} currently authenticated user or null
 */
const user = () => firebase.auth().currentUser;

/**
 * Loads user's custom decks and populates them into the home component
 * deck container.
 */
const loadCustomDecks = () => {
  console.log("loadCustomDecks()");
  if (user()) {
    let userData = db.collection("users").doc(user().uid);
    userData.get().then(function(doc) {
        if (doc.exists) {
            console.log("Found document:", doc.data());
            $('.custom-deck').remove();
            for (let [i, deck] of doc.data().decks.entries()) {
              let parsed = JSON.parse(deck);
              if (parsed.deckName == "") {
                const div = `
                  <div class="deck-selector custom-deck custom-deck-${++i}" deck="builder">
                  <h2 class="deckText">Custom Deck ${i}</h2>
                  </div>`;
                $('.deck-container').append(div);
              } else {
                const div = `
                  <div class="deck-selector custom-deck custom-deck-${++i}" deck="builder">
                  <h2 class="deckText">${parsed.deckName}</h2>
                  </div>`;
                $('.deck-container').append(div);
              }
              console.log("THIS DECK: ", deck);
              $(`.custom-deck-${i}`).attr('text', deck);
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
}