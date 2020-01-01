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
  $('.main-container').css("display", "flex");
  populateDeckSelectors();
  LearningGame();
  const firebase = authenticate();
  $('.bttn--signin').on('click', function() {
    console.log('bttn--signin click');
    if ($(this).text() == 'Sign In')
    {
      showHolbie();
    }
    else
    {
      showHolbie(true);
      firebase.auth().signOut().then(function() {
        $('.bttn--signin').text('Sign In');
        $('.signin-welcome').text('Welcome Holbie!');
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
      if (getSetting("holbie-theme")) {
        putSetting("holbie-theme", false);
        saveUserData();
      } else {
        putSetting("holbie-theme", true);
        saveUserData();
      }
      holbieTheme(getSetting("holbie-theme"));
  });

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
  keyboardDeck();
  $(document).on('click', function (e) {
    if (e.target == document.querySelector('.app-settings-icon')) {
      $('.app-settings-dropdown').toggleClass('app-settings-dropdown-out');
    } else if (!isDescendant(document.querySelector('.app-settings'), e.target)) {
      $('.app-settings-dropdown').removeClass('app-settings-dropdown-out');
    }
  });
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
const showHolbie = (expireAuthToken) => {
  console.log("showHolbie()", authToken);
  $('.timer').hide();
  $('.game-component').hide();
  $('.home-component').hide();
  $('.timer').hide();
  $('.build-component').hide();
  $('#firebaseui-auth-container').hide();
  if (expireAuthToken) {
    authToken = undefined;
    $('.holbie-status').html('Please Sign In!');
    saveUserData();
  }
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

const holbieTheme = (on) => {
  if (on) {
    $('header').addClass('hb-theme--header');
    $('body').addClass('hb-theme--body');
    $('.deck-selector').addClass('hb-theme--deck-selector');
    $('.holbie-logo').addClass('hb-theme--logo');
    $('.logo').addClass('hb-theme--td-logo');
    $('.bttn--summary').addClass('hb-theme--bttn--summary');
    $('.bttn--deck').addClass('hb-theme--bttn--deck');
  } else {
    $('header').removeClass('hb-theme--header');
    $('body').removeClass('hb-theme--body');
    $('.deck-selector').removeClass('hb-theme--deck-selector');
    $('.holbie-logo').removeClass('hb-theme--logo');
    $('.logo').removeClass('hb-theme--td-logo');
    $('.bttn--summary').removeClass('hb-theme--bttn--summary');
    $('.bttn--deck').removeClass('hb-theme--bttn--deck');
  }
};
