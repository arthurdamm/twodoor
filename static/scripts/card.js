const LearningGame = () => {
  let currentDoor = $('#door2');
  let nextDoor;
  let deck;
  let animating = false, answered = false;
  const animate = Animator();

  const nextDoorEvent = () => {
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

  const answerEvent = () => {
    if (animating || answered) return;
    answered = true;
    if (matchAnswer($('[name=text-answer]').val(), getCard(currentDoor, deck))) {
      let userAnswer = currentDoor.children('.success')[0];
      if (getComputedStyle(userAnswer).visibility == 'hidden') {
        currentDoor.children('.success').css('visibility', 'visible');
        animate(userAnswer);
        setTimeout(nextDoorEvent, 700);
      } else
        nextDoorEvent();
      currentDoor.children('.back').css('visibility', 'visible');
      currentDoor.children('.back').css('position', 'relative');
      $('.bttn--next').css('visibility', 'visible');
    } else {
      let userAnswer = currentDoor.children('.fail')[0];
      currentDoor.toggleClass('flipme');
      if (getComputedStyle(userAnswer).visibility == 'hidden')
        currentDoor.children('.fail').css('visibility', 'visible');
        setTimeout(nextDoorEvent, 1500);
    }
  };

  $('[name=text-answer]').keydown((e) => {
    if (e.which == 13) answerEvent();
  });
  $(document).keydown((e) => {
    if (e.which == 27)  // escape key
      location.href = "#text-answer";
    else if (e.which == 38) // up key
      currentDoor.toggleClass('flipme');
    else if (e.which == 40) // down key
      nextDoorEvent();
  });
  $(".flippable").click(function() {
    const that = $(this);
    that.addClass('shakeme');
    setTimeout(() => that.removeClass('shakeme'), 500);
    $('[name=text-answer]').focus();
  });
  $('.bttn--next').click(() => answerEvent());
  $('.bttn--cancel').click(() => endDeckSession(deck, 'successes'));
  $('.card-bar-chart--bttn-successes').click(() => endDeckSession(deck, 'successes'));
  $('.card-bar-chart--bttn-failures').click(() => endDeckSession(deck, 'failures'));
  $('.card-bar-chart--bttn-percentage').click(() => endDeckSession(deck, 'percentage'));
  $('.card-bar-chart--bttn-demo').click(() => endDeckSession(deck, 'demo'));
  $('.game-component')[0].changeDeck = (newDeck) => {
    deck = newDeck;
    nextDoorEvent();
  }
  document.querySelector('.game-component').queryDeck = () => deck;
};

const getNextCard = (currentDoor, deck) => {
  if (!deck) return {};
  if (!$('.bttn--algo')[0].clicked)
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

const startTimer = () => {
  document.querySelector('.timer').time = 60 * 3;
  clearTimeout(document.querySelector('.timer').timeoutID)
  printTimer(); 
}

const stopTimer = () => {
  clearTimeout(document.querySelector('.timer').timeoutID);
  document.querySelector('.timer').time = 60 * 3;
}

const printTimer = () => {
  let currentTime = document.querySelector('.timer').time--;
  $('.timer').text(renderTime(currentTime--));
  if (currentTime >= 0)
    document.querySelector('.timer').timeoutID = setTimeout(printTimer, 1000);
  else {
    endDeckSession($('.game-component')[0].queryDeck(), 'failures');
  }
}

const renderTime = (sec) => {
  let min = Math.floor(sec / 60);
  let secs = (sec - min * 60) % 60;
  if (secs < 10)
    secs = '0' + secs;
  return (min + ':' + secs);
}

$('.logo').click(() => clearTimeout(document.querySelector('.timer').timeoutID));
