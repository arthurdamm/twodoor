import * as datastore from "./datastore.js";

$(function() {
  let nextDoor;
  let currentDoor = $('#door2');
  const deck = datastore.getDeck()
  console.log("getDeck():", deck);

  currentDoor.html(deck[3].html);
  currentDoor.attr('door-id', deck[3].id);
  
  $('[name=text-answer]').focus();
  $('[name=text-answer]').keydown(function (e) {
    console.log("Enter Answer event");
    if (e.which == 13) {
      currentDoor.children('.front').hide();
      currentDoor.children('.success').css('visibility', 'visible');
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
    nextDoor = $(currentDoor.attr('id') === 'door1' ? '#door2' : '#door1');
    const door = getNextDoor(currentDoor, deck);
    nextDoor.html(door.html)
    nextDoor.attr('door-id', door.id);
    nextDoor.fadeIn(1);
    console.log("nextDoor:", nextDoor[0]);

    currentDoor.addClass('slide');
    currentDoor.fadeOut(500);
    setTimeout(function () {
      currentDoor.removeClass('slide');
      currentDoor.removeClass('flipme');
      nextDoor.after(currentDoor);
      currentDoor = nextDoor;
    }, 500);

  });
});

function getNextDoor(currentDoor, deck) {
  let doorId = (parseInt(currentDoor.attr('door-id')) + 1) % deck.length;

  for (const door of deck)
    if (door.id === doorId)
      return door;
  console.log("NO NEXT DOOR!");
}
