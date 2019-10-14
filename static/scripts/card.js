// import * as datastore from "./datastore.js";

$(function() {
  let nextDoor;
  let currentDoor = $('#door2');
  let animating = false;
  const deck = getDeck()

  console.log("getDeck():", deck);

  currentDoor.html(deck[1].html);
  currentDoor.attr('door-id', deck[1].id);
  
  $('[name=text-answer]').focus();
  $('[name=text-answer]').keydown(function (e) {
    if (e.which == 13) {
      // if (currentDoor.children('.success').values('visibility', 'visible')) {
        let succStyle = document.querySelector('.success');
        // console.log("computed style is " + getComputedStyle(succStyle).visibility);
        if(getComputedStyle(succStyle).visibility == 'hidden') {
          currentDoor.children('.front').hide();
          currentDoor.children('.success').css('visibility', 'visible');
          $('.success').fadeOut(3000, "swing");
          $('.front').fadeIn(3000);
          currentDoor.children('.front')
          .css('border', '20px solid #b8fc79');
          // currentDoor.children('.text-box').css('background', 'green');
          // win = false;
      }
      currentDoor.children('.back').css('visibility', 'visible');
      currentDoor.children('.back').css('position', 'relative');
      $('.btn--next').css('visibility', 'visible');
    }
  });

  
  $(".flippable").click(function() {
    $(this).toggleClass('flipme');
  });

  const nextDoorEvent = function() {
    if (animating) return;
    $('.btn--next').css('visibility', 'hidden');
    $('[name=text-answer]').val('');
    $('[name=text-answer]').focus();
    nextDoor = $(currentDoor.attr('id') === 'door1' ? '#door2' : '#door1');
    const door = getNextDoor(currentDoor, deck);
    nextDoor.html(door.html)
    nextDoor.attr('door-id', door.id);
    nextDoor.fadeIn(1);
    console.log("nextDoor:", nextDoor[0]);

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
    if (e.which === 39)
      nextDoorEvent();
  });
  $('.btn--next').click(nextDoorEvent);
});

function getNextDoor(currentDoor, deck) {
  let doorId = (parseInt(currentDoor.attr('door-id')) + 1) % deck.length;

  for (const door of deck)
    if (door.id === doorId)
      return door;
}
// var i = 500;
// setInterval(function () {
//     $("#stopWatch").html(i);
//         i--;
//     }, 1000);
 