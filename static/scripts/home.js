$(() => {
  showHome();
  LearningGame();
  $('.bttn--algo').on('click', () => {
    if ($('.bttn--algo')[0].clicked) {
      $('.bttn--algo')[0].clicked = 0;
      $('.bttn--algo').removeClass('bttn--algo-red');
    } else {
      $('.bttn--algo')[0].clicked = 1;
      $('.bttn--algo').addClass('bttn--algo-red');
    }
    $('[name=text-answer]').focus();
  });
  $('.deck-selector-0').on('click', () => {
    $('.game-component')[0].deckType = "tutorial";
    showGame();
  });
  $('.deck-selector-1').on('click', () => {
    $('.game-component')[0].deckType = "face";
    showGame();
  });
  $('.deck-selector-2').on('click', () => {
    $('.game-component')[0].deckType = "dino";
    showGame();
  });
  $('.deck-selector-3').on('click', () => {
    $('.game-component')[0].deckType = "color";
    showGame();
  });
  $('.deck-selector-4').on('click', () => {
    $('.game-component')[0].deckType = "trivia";
    showGame();
  });
  $('.deck-selector-5').on('click', () => {
    $('.game-component')[0].deckType = "presentation";
    showGame();
  });
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