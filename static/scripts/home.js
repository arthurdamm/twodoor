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
  $('.main-container').show();
  populateDeckSelectors();
  LearningGame();
  const firebase = authenticate();
  $('.bttn--signin').on('click', function() {
    console.log('bttn--signin click');
    if ($(this).text() == 'SIGN IN')
    {
      showHolbie();
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
  $(document).on('click', '.deck-selector', function (e) {
    if (["select", "input", "label", "button"].includes(e.target.tagName.toLowerCase()))
      return;
    $(this).toggleClass('flipme');
  });
  $('.logo').on('click', showHome);
  const holbieLogo = $('.holbie-logo');
  holbieLogo.state = "classic";
  $('.holbie-logo').on('click', function() {
      holbieTheme();
  });

  const holbieTheme = () => {
    $('header').toggleClass('hb-theme--header');
    $('body').toggleClass('hb-theme--body');
    $('.deck-selector').toggleClass('hb-theme--deck-selector');
    $('.holbie-logo').toggleClass('hb-theme--logo');
    $('.logo').toggleClass('hb-theme--td-logo');
    $('.bttn--summary').toggleClass('hb-theme--bttn--summary');
  };

  $('.bttn--play').click(() => {
    goPlay();
    showGame();
  })
  $('.bttn--select-left').click(goLeft);
  $('.bttn--select-right').click(goRight);
  $('.bttn--add-card').click(goPlus);
  $('.bttn--remove-card').click(goMinus);
  $('#holbie-signin').submit(function (e) {
    console.log("submit()")
    e.preventDefault();
    authenticateUserHB();
  });
  $(document).on('click', '.deck-selector .bttn--cancel', deckSelectorDelete);
  $(document).on('submit', '.deck-settings-form', deckSelectorSubmit);
  populateCohortSelectors();
});

/**
 * Displays Home Component
 */
const showHome = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.build-component').hide();
  $('#firebaseui-auth-container').hide();
  $('.holbie-signin-component').hide();
  $('.holbie-select-component').hide();
  $('.home-component').show();
};

/**
 * Displays Holbie Component
 */
const showHolbie = () => {
  console.log("showHolbie()");
  $('.timer').hide();
  $('.game-component').hide();
  $('.home-component').hide();
  $('.timer').hide();
  $('.build-component').hide();
  $('#firebaseui-auth-container').hide();
  if (authToken) {
    const cohort = $('#holbie-cohort-select').val();
    const numPeers = parseInt($('#holbie-size-select').val());
    const attempts = 0;
    repopulateRandomPeers(cohort, numPeers, attempts);
  } else {
    $('.holbie-select-component').hide();
    $('.holbie-signin-component').show();
  }
}

/**
 * Displays Build Component
 */
const showBuild = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.home-component').hide();
  $('.timer').hide();
  $('.holbie-signin-component').hide();
  $('.holbie-select-component').hide();
  $('.build-component').show();
  generateCustomDeckName();
}

/**
 * Displays Game Component, sets up deck, toggles instructions.
 */
const showGame = () => {
  if ($('.game-component').is(':visible')) return;
  $('.timer').show();
  $('.home-component').hide();
  $('.build-component').hide();
  $('#firebaseui-auth-container').hide();
  $('.holbie-signin-component').hide();
  $('.holbie-select-component').hide();
  $('.game-component').show();
  if (!isMobile()) $('[name=text-answer]').focus();
  else $('bttn--next').focus();
  checkGameFocus();
  $('.game-component')[0].changeDeck(loadDeck($('.game-component')[0].deckType));
  if ($('.game-component')[0].deckType !== DECKS.TUTORIAL) {
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
  $('.build-component').hide();
  $('.holbie-signin-component').hide();
  $('.holbie-select-component').hide();
  $('#firebaseui-auth-container').show();
};
