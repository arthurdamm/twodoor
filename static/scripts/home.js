$(() => {
  showHome();
  LearningGame();

  $('.game-component')[0].deckType = "color";
  $('.deck-selector-1').on('click', () => {
    console.log('click1');
    $('.game-component')[0].deckType = "face";
    showGame();
  });
  $('.deck-selector-2').on('click', () => {
    console.log('click1');
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
  $('.logo').on('click', showHome);
});

const showHome = () => {
  $('.game-component').hide();
  $('.home-component').show();
};

const showGame = () => {
  $('.home-component').hide();
  $('.game-component').show();
  $('[name=text-answer]').focus();
  $('.game-component')[0].changeDeck(loadDeck($('.game-component')[0].deckType));
  startTimer();
};

const showSummary = () => {
  location.href = "#summary-overlay";
};
