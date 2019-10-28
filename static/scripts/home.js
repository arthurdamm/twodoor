$(() => {
  showHome();
  LearningGame();

  $('.deck-selector-0').on('click', () => {
    console.log('click0');
    $('.bttn--deck1').addClass('bttn--animated');
    $('.game-component')[0].deckType = "tutorial";
    showGame();
  });
  $('.game-component')[0].deckType = "color";
  $('.deck-selector-1').on('click', () => {
    console.log('click1');
    $('.bttn--deck1').addClass('bttn--animated');
    $('.game-component')[0].deckType = "face";
    showGame();
  });
  $('.deck-selector-2').on('click', () => {
    console.log('click1');
    $('.bttn--deck2').addClass('bttn--animated');
    $('.game-component')[0].deckType = "dino";
    showGame();
  });
  $('.deck-selector-3').on('click', () => {
    $('.bttn--deck3').addClass('bttn--animated');
    $('.game-component')[0].deckType = "color";
    showGame();
  });
  $('.logo').on('click', showHome);
});

const showHome = () => {
  $('.game-component').hide();
  // $('.summary-overlay').hide()
  $('.home-component').show();
};

const showGame = () => {
  $('.home-component').hide();
  // $('.summary-overlay').hide();
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
  // $('.home-component').hide();
  // $('.game-component').hide();
  // $('.summary-overlay').show();
  location.href = "#summary-overlay";
};
