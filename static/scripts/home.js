$(() => {
  showHome();
  LearningGame();

  $('.game-component')[0].deckType = "dino";
  $('.deck-selector-1').on('click', () => {
    console.log('click1');
    $('.bttn--deck1').addClass('bttn--animated');
    $('.game-component')[0].deckType = "dino";
    showGame();
  });
  $('.deck-selector-2').on('click', () => {
    $('.bttn--deck2').addClass('bttn--animated');
    $('.game-component')[0].deckType = "color";
    showGame();
  });
  $('.logo').on('click', showHome);
});

const showHome = () => {
  $('.game-component').hide();
  $('.summary-component').hide()
  $('.home-component').show();
};

const showGame = () => {
  $('.home-component').hide();
  $('.summary-component').hide();
  $('.game-component').show();
  $('[name=text-answer]').focus();
  $('.game-component')[0].changeDeck(loadDeck($('.game-component')[0].deckType));
  startTimer();
};

const showSummary = () => {
  $('.home-component').hide();
  $('.game-component').hide();
  $('.summary-component').show();
};
