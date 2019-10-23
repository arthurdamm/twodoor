$(() => {
  showHome();
  LearningGame();

  $('.game-component')[0].deckType = "dino";
  $('.bttn--deck1').on('click', () => {
    $('.bttn--deck1').addClass('bttn--animated');
    $('.game-component')[0].deckType = "dino";
    showGame();
  });
  $('.bttn--deck2').on('click', () => {
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
