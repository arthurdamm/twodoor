$(function() {
  $('.game-component').hide();
  $('.btn.btn--deck1').on('click', function(){
    $('.btn.btn--deck1').addClass('btn--animated');
      setTimeout(backHome, 800);
  });
  $('.btn.btn--deck2').on('click', function(){
    $('.btn.btn--deck2').addClass('btn--animated');
  });
  $('.logo').on('click', function(){
    $('.game-component').hide();
    $('.home-component').show();
  })
})
function backHome() {
  $('.home-component').hide();
  $('.game-component').show();
}