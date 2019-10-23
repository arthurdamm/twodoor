$(() => {
  showHome();
  LearningGame();

  $('.game-component')[0].deckType = "dino";
  $('.btn--deck1').on('click', () => {
    $('.btn--deck1').addClass('btn--animated');
    $('.game-component')[0].deckType = "dino";
    showGame();
  });
  $('.btn--deck2').on('click', () => {
    $('.btn--deck2').addClass('btn--animated');
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
