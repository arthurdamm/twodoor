const LearningGame = () => {
  let nextDoor;
  let currentDoor = $('#door2');
  let deck;
  let animating = false, answered = false;
  const animate = Animator();

  const nextDoorEvent = function() {
    if (animating) return;
    $('[name=text-answer]').val('');
    $('[name=text-answer]').focus();

    nextDoor = $(currentDoor.attr('id') === 'door1' ? '#door2' : '#door1');
    const card = getNextCard(currentDoor, deck);
    nextDoor.html(card.html)
    nextDoor.attr('card-id', card.id);
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

  $('[name=text-answer]').keydown(function (e) {
    if (e.which == 13 && !animating && !answered) {
      answered = true;
      if (matchAnswer($('[name=text-answer]').val(), getCard(currentDoor, deck))) {
        let userAnswer = currentDoor.children('.success')[0];
        if (getComputedStyle(userAnswer).visibility == 'hidden') {
          currentDoor.children('.success').css('visibility', 'visible');
          animate(currentDoor.children('.success')[0]);
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

  $(document).on('keydown', function(e) {
    let tag = e.target.tagName.toLowerCase();
    if (e.which === 39)  // right arrow
      nextDoorEvent();
    else if (e.which == 37)  // left arrow
      currentDoor.toggleClass('flipme');
    else if (e.which == 40)  // down arrow
      endDeckSession(deck, 'successes')
  });

  $(".flippable").click(function() {
    $(this).toggleClass('flipme');
    $('[name=text-answer]').focus();
  });

  $('.btn--next').click(() => endDeckSession(deck, 'successes'));
  $('.card-bar-chart--btn-successes').click(() => endDeckSession(deck, 'successes'));
  $('.card-bar-chart--btn-failures').click(() => endDeckSession(deck, 'failures'));
  $('.card-bar-chart--btn-percentage').click(() => endDeckSession(deck, 'percentage'));
  $('.card-bar-chart--btn-demo').click(() => endDeckSession(deck, 'demo'));
  $('.game-component')[0].changeDeck = (newDeck) => {
    console.log("changeDeck()", newDeck);
    deck = newDeck;
    nextDoorEvent();
  }
};

const getNextCard = (currentDoor, deck) => {
  if (!deck) return {};
  return selectNextCard(deck, deck[parseInt(currentDoor.attr('card-id'))]);
  let cardId = (parseInt(currentDoor.attr('card-id')) + 1) % deck.length;
  for (const card of deck)
    if (card.id === cardId)
      return card;
  return deck[0];  // default
}

const getCard = (currentDoor, deck) =>
  deck[parseInt(currentDoor.attr('card-id'))];

const Animator = () => {
  let zPos = 0;
  let zDelta = 0;
  let element;
  const increment = Math.PI / 100;

  const animate = () => {
    element.style.transform = `translate3d(0, 0, ${zPos}px)`;
    zPos = Math.sin(1.55 * zDelta) * 155;
    zDelta += increment;
    if (zDelta >= 2) {
      zPos = 0; zDelta = 0;
      return;
    } else
      requestAnimationFrame(animate);
  };

  return (_element) => {
    element = _element;
    animate();
  }
};

function resetTimer() {
  document.getElementById('timer').innerHTML =
    005 + ":" + 00;
}

function startTimer() {
  var currentTime = document.getElementById('timer').innerHTML;
  var timeArray = currentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if (s == 59) 
    m = m - 1;
  console.log("minute=" + m, "second=" + s);
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  if (s > 0 || m > 0)
    setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0)
    sec = "0" + sec; // add zero in front of numbers < 10
  if (sec < 0)
    sec = "59";
  return sec;
}
