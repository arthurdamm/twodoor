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
  $('.bttn--algo').on('click', function() {
    $(this)[0].clicked = !$(this)[0].clicked
    $(this).toggleClass('bttn--algo-red');
    $('[name=text-answer]').focus();
  });
  $('.deck-container').find('.deck-selector').click(function() {
    if ($(this).attr('deck') === 'custom')
      showBuild();
    else {
      $('.game-component')[0].deckType = $(this).attr('deck');
      showGame();
    }
  })
  $('.logo').on('click', showHome);
});

/**
 * Displays Home Component
 */
const showHome = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.build-component').hide();
  $('.home-component').show();

};

/**
 * Displays Build Component
 */
const showBuild = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.home-component').hide();
  $('.build-component').show();
  $('.bttn--build').click(() => {
    $('.game-component')[0].deckType = decks.CUSTOM;
    showGame();
  })
}

/**
 * Displays Game Component, sets up deck, toggles instructions.
 */
const showGame = () => {
  $('.timer').show();
  $('.home-component').hide();
  $('.build-component').hide();
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
