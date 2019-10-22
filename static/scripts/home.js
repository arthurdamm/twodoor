$(function() {
  $('.game-component').hide();
  $('.summary-component').hide();
  $('.btn.btn--deck1').on('click', function(){
    $('.btn.btn--deck1').addClass('btn--animated');
    // startTimer();
    $('.game-component')[0].deckType = "dino";
    setTimeout(showGame, 1);
  });
  $('.btn.btn--deck2').on('click', function(){
    $('.btn.btn--deck2').addClass('btn--animated');
    $('.game-component')[0].deckType = "color";
    setTimeout(showGame, 1);
  });
  $('.logo').on('click', function(){
    $('.game-component').hide();
    $('.summary-component').hide()
    $('.home-component').show();
  })
})

const showGame = () => {
  $('.home-component').hide();
  $('.summary-component').hide();
  $('.game-component').show();
  $('[name=text-answer]').focus();
  $('.game-component')[0].changeDeck(loadDeck($('.game-component')[0].deckType));
}
