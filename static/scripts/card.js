// import * as datastore from "./datastore.js";

$(function() {
  let nextDoor;
  let currentDoor = $('#door2');
  let animating = false;
  const deck = getDeck()
  console.log("getDeck():", deck);

  $('[name=text-answer]').focus();
  $('[name=text-answer]').keydown(function (e) {
    if (e.which == 13 && !animating) {  // enter key
      if (currentDoor.children('.success').css('visibility') === 'visible')
        return nextDoorEvent();
      if (matchAnswer($('[name=text-answer]').val(), getCard(currentDoor, deck))) {
        currentDoor.children('.front').hide();
        currentDoor.children('.success').css('visibility', 'visible');
        currentDoor.children('.back').css('visibility', 'visible');
        currentDoor.children('.back').css('position', 'relative');
        $('.btn--next').css('visibility', 'visible');
      } else
        nextDoorEvent();
    }
  });

  $('.flippable').click(function() {
    $(this).toggleClass('flipme');
    $('[name=text-answer]').focus();
  });

  const nextDoorEvent = function() {
    if (animating) return;
    $('.btn--next').css('visibility', 'hidden');
    $('[name=text-answer]').val('');
    $('[name=text-answer]').focus();

    nextDoor = $(currentDoor.attr('id') === 'door1' ? '#door2' : '#door1');
    const door = getNextCard(currentDoor, deck);
    nextDoor.html(door.html)
    nextDoor.attr('card-id', door.id);
    nextDoor.fadeIn(1);

    currentDoor.addClass('slide');
    currentDoor.fadeOut(500);
    animating = true;
    setTimeout(function () {
      currentDoor.removeClass('slide');
      currentDoor.removeClass('flipme');
      nextDoor.after(currentDoor);
      currentDoor = nextDoor;
      animating = false;
    }, 500);
  }

  $(document).on('keydown', function(e) {
    let tag = e.target.tagName.toLowerCase();
    if (e.which === 39)  // right arrow
      nextDoorEvent();
    else if (e.which == 37)  // left arrow
      currentDoor.toggleClass('flipme');
  });
  $('.btn--next').click(nextDoorEvent);

  nextDoorEvent();  // gets first card
});

function getNextCard(currentDoor, deck) {
  let cardId = (parseInt(currentDoor.attr('card-id')) + 1) % deck.length;
  for (const card of deck)
    if (card.id === cardId)
      return card;
  return deck[0];  // default
}

function getCard(currentDoor, deck) {
  return deck[parseInt(currentDoor.attr('card-id'))];
}
