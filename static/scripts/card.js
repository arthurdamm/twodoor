$(function() {
  let currentDoor = $('.door2');

  $('.success').hide();
  // $('.door2').hide();
  $('[name=text-answer]').keydown(function (e) {
    console.log("Enter Answer event");
    if (e.which == 13) {
      currentDoor.children('.front').hide();
      currentDoor.children('.success').show();
      currentDoor.children('.back').css('visibility', 'visible');
      currentDoor.children('.back').css('position', 'relative');
      $('.btn--next').css('visibility', 'visible');
    }
  });
  
  $(".flippable").click(function() {
    $(this).toggleClass('flipme');
    currentDoor = $(this);
  });

  $('.btn--next').click(function() {
    console.log("Sliding:", currentDoor[0])
    currentDoor.addClass('slide');
    currentDoor.fadeOut(500);
  });
});
