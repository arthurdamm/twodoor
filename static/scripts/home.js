$(() => {
  showHome();
  LearningGame();
  $('.bttn--algo').on('click', function() {
    $(this)[0].clicked = !$(this)[0].clicked
    $(this).toggleClass('bttn--algo-red');
    $('[name=text-answer]').focus();
  });
  $('.deck-container').find('.deck-selector').click(function() {
    $('.game-component')[0].deckType = $(this).attr("deck");
    showGame();
  })
  $('.logo').on('click', showHome);
});

const showHome = () => {
  $('.timer').hide();
  $('.game-component').hide();
  $('.home-component').show();
};

const showGame = () => {
  $('.timer').show();
  $('.home-component').hide();
  $('.game-component').show();
  $('[name=text-answer]').focus();
  $('.game-component')[0].changeDeck(loadDeck($('.game-component')[0].deckType));
  if ($('.game-component')[0].deckType !== "tutorial") {
    startTimer();
    $('.instruction-component').hide();
  }
  else {
    stopTimer();
    $('.instruction-component').show();
  }
};

const showSummary = () => {
  location.href = "#summary-overlay";
};
