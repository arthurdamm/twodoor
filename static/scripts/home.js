/**
 * @fileoverview Module for Home Component.
 * Application starting point and toggles visibility of other components.
 * @package
 */

/**
 * Main on $(document).ready() event & application start.
 * Displays Home Component, instantiates new Learning Game, and registers input
 * events.
 */
$(() => {
  showHome();
  LearningGame();
  const firebase = authenticate();
  $('.bttn--signin').on('click', function() {
    console.log('bttn--signin click');
    if ($(this).text() == 'SIGN IN')
    {
      showSignin();
    }
    else
    {
      firebase.auth().signOut().then(function() {
        $('.bttn--signin').text('SIGN IN');
        $('.signin-welcome').text('Welcome Guest!');
      }).catch(function(error) {
        console.log(error);
      });
    }
  });
  $('.bttn--algo').on('click', function() {
    $(this)[0].clicked = !$(this)[0].clicked
    $(this).toggleClass('bttn--algo-red');
    $('[name=text-answer]').focus();
  });
  $(document).on('click', '.deck-selector', function () {
    console.log("custom clicker");
    if ($(this).attr('deck') === 'custom')
      showBuild();
    else {
      $('.game-component')[0].deckType = $(this).attr('deck');
      $('.game-component')[0].deckText = $(this).attr('text');
      console.log("THIS TEXT: ", $(this).attr('text'));
      showGame();
    }
  });
  // $('.deck-container').find('.deck-selector').click(function() {
  //   if ($(this).attr('deck') === 'custom')
  //     showBuild();
  //   else {
  //     $('.game-component')[0].deckType = $(this).attr('deck');
  //     $('.game-component')[0].deckText = $(this).attr('text');
  //     showGame();
  //   }
  // })
  $('.logo').on('click', showHome);
  $('.bttn--play').click(() => {
    $('.game-component')[0].deckType = decks.CUSTOM;
    showGame();
  })
});

/**
 * Displays Home Component
 */
const showHome = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.build-component').hide();
  $('#firebaseui-auth-container').hide();
  $('.home-component').show();
  console.log("checking user...");
  if (user()) {
    console.log("found user...");
    let userData = db.collection("users").doc(user().uid);
    userData.get().then(function(doc) {
        if (doc.exists) {
            console.log("LOADING DECKS:", doc.data());
            let i = 0;
            $('.custom-deck').remove();
            for (deck of doc.data().decks) {
              const div = `
                <div class="deck-selector custom-deck custom-deck-${++i}" deck="builder">
                <a href="#" class="bttn--deck"></a>
                <h2 class="deckText">Custom Deck ${i}</h2>
                </div>`;
              $('.deck-container').append(div);
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
};

/**
 * Displays Build Component
 */
const showBuild = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.home-component').hide();
  $('.timer').hide();
  $('.build-component').show();
}

/**
 * Displays Game Component, sets up deck, toggles instructions.
 */
const showGame = () => {
  $('.timer').show();
  $('.home-component').hide();
  $('.build-component').hide();
  $('#firebaseui-auth-container').hide();
  $('.game-component').show();
  $('[name=text-answer]').focus();
  $('.game-component')[0].changeDeck(loadDeck($('.game-component')[0].deckType));
  if ($('.game-component')[0].deckType !== decks.TUTORIAL) {
    startTimer();
    $('.instruction-component').hide();
  }
  else {
    stopTimer();
    $('.instruction-component').css('visibility', 'visible');
    $('.instruction-component').show();
  }
};

/**
 * Displays Summary Component
 */
const showSummary = () => {
  location.href = '#summary-overlay';
};

/**
 * Displays FirebaseAuth Sign In Component
 */
const showSignin = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.home-component').hide();
  $('#firebaseui-auth-container').show();
};
