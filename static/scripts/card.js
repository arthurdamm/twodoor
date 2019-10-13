$('.success').hide()
$(function() {
  $('[name=text-answer]').keydown(function (e) {
    console.log("Enter Answer event");
    if (e.which == 13) {
      $('.front').hide();
      $('.success').show();
      $('.back').css('visibility', 'visible');
      $('.back').css('position', 'relative');
      $('.btn--next').css('visibility', 'visible');
    }
  });
});
$(".flippable").click(function(){
  $(this).toggleClass("flipme");
});