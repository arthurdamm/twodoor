import * as datastore from "./datastore.js";

$(function() {
  let currentDoor = $('.door2');

  const deck = datastore.getDeck()
  console.log("getDeck():", deck);
  $('#door1').html(deck[1]);
  $('#door2').html(deck[0]);
  
  $('.success').hide();
  $('[name=text-answer]').focus();
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
    if (currentDoor.hasClass('door'))
      currentDoor = $('.door2');
    else
      currentDoor = $('.door');
  });
});
