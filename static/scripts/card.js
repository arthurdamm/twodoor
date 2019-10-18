$(function() {
  let nextDoor;
  let currentDoor = $('#door2');
  let animating = false, answered = false;
  const deck = getDeck();
  console.log("getDeck():", deck);
  $('[name=text-answer]').focus();
  // animating = true;

  $('[name=text-answer]').keydown(function (e) {
    if (e.which == 13 && !animating && !answered) {
      answered = true;
      if (matchAnswer($('[name=text-answer]').val(), getCard(currentDoor, deck))) {
        let userAnswer = currentDoor.children('.success')[0];
        if (getComputedStyle(userAnswer).visibility == 'hidden') {
          currentDoor.children('.success').css('visibility', 'visible');
          animate();
          setTimeout(nextDoorEvent, 700);
        } else
          nextDoorEvent();
        currentDoor.children('.back').css('visibility', 'visible');
        currentDoor.children('.back').css('position', 'relative');
        $('.btn--next').css('visibility', 'visible');
      } else {
        let userAnswer = currentDoor.children('.fail')[0];
        currentDoor.toggleClass('flipme');
        if (getComputedStyle(userAnswer).visibility == 'hidden')
          currentDoor.children('.fail').css('visibility', 'visible');
          setTimeout(nextDoorEvent, 1500);
      }
    }
  });

  let zPos = 0;
  let counter = 0;
  const increment = Math.PI / 100;
  function animate() {
      let zAnimate = currentDoor.children('.success')[0];
    zAnimate.style.transform = `translate3d(0, 0, ${zPos}px)`;
    zPos = Math.sin(1.55 * counter) * 155;
    counter += increment;
    if (counter >= 2) {
      zPos = 0; counter = 0;
      return;
    } else
      requestAnimationFrame(animate);
    }

  $(".flippable").click(function() {
    $(this).toggleClass('flipme');
    $('[name=text-answer]').focus();
  });

  const nextDoorEvent = function() {
    if (animating) return;
    // $('.btn--next').css('visibility', 'hidden');
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
      answered = false;
    }, 500);
  }

  $(document).on('keydown', function(e) {
    let tag = e.target.tagName.toLowerCase();
    if (e.which === 39)  // right arrow
      nextDoorEvent();
    else if (e.which == 37)  // left arrow
      currentDoor.toggleClass('flipme');
  });
  $('.btn--next').click(() => endDeckSession(deck));

  nextDoorEvent();  // gets first card
});

function getNextCard(currentDoor, deck) {
  return selectNextCard(deck, deck[parseInt(currentDoor.attr('card-id'))]);
  let cardId = (parseInt(currentDoor.attr('card-id')) + 1) % deck.length;
  for (const card of deck)
    if (card.id === cardId)
      return card;
  return deck[0];  // default
}

function getCard(currentDoor, deck) {
  return deck[parseInt(currentDoor.attr('card-id'))];
}
