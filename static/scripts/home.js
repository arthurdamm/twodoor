$(function() {
  $('.game-component').hide();
  $('.summary-component').hide();
  $('.btn.btn--deck1').on('click', function(){
    $('.btn.btn--deck1').addClass('btn--animated');
      setTimeout(backHome, 800);
      startTimer();
  });
  $('.btn.btn--deck2').on('click', function(){
    $('.btn.btn--deck2').addClass('btn--animated');
  });
  $('.logo').on('click', function(){
    $('.game-component').hide();
    $('.summary-component').hide()
    $('.home-component').show();
  })
})
function backHome() {
  $('.home-component').hide();
  $('.summary-component').hide();
  $('.game-component').show();
  $('[name=text-answer]').focus();
}