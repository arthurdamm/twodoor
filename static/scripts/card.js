/**
 * @fileoverview Module for Game Component.
 * @package
 */

/**
 * Class en-closure for Learning Game instance.
 */
const LearningGame = () => {
  let currentDoor = $('#door2');
  let nextDoor;
  let deck;
  let animating = false, answered = false;
  let timeoutID;
  const animate = Animator();

  /**
   * Slides away current door and displays underlying door, switching
   * the two doors and thus the cards they hold.
   */
  const nextDoorEvent = () => {
    if (animating) return;
    $('[name=text-answer]').val('');
    $('[name=text-answer]').focus();
    // Determine which door is currently showing on top
    nextDoor = $(currentDoor.attr('id') === 'door1' ? '#door2' : '#door1');
    // select next card in deck and assign it to the next door
    const card = getNextCard(currentDoor, deck);
    nextDoor.html(card.html)
    nextDoor.attr('card-id', card.id);
    nextDoor.fadeIn(1);
    // Slide away current door
    currentDoor.addClass('slide');
    currentDoor.fadeOut(500);
    animating = true;
    // Do the actual switch after an animated delay
    setTimeout(() => {
      currentDoor.removeClass('slide');
      currentDoor.removeClass('flipme');
      nextDoor.after(currentDoor);
      currentDoor = nextDoor;
      animating = false;
      answered = false;
    }, 500);
  }

  /**
   * Parses user answer for current card & invokes nextDoorEvent
   */
  const answerEvent = () => {
    // Rush event if already answered
    if (animating || answered) {
      clearTimeout(timeoutID);
      nextDoorEvent();
      return;
    }
    answered = true;
    // Match user answer against card back
    if (matchAnswer($('[name=text-answer]').val(), getCard(currentDoor, deck))) {
      // Animate success
      let userAnswer = currentDoor.children('.success')[0];
      if (getComputedStyle(userAnswer).visibility == 'hidden') {
        currentDoor.children('.success').css('visibility', 'visible');
        animate(userAnswer);
        timeoutID = setTimeout(nextDoorEvent, 700);
      } else
        nextDoorEvent();
      currentDoor.children('.back').css('visibility', 'visible');
      currentDoor.children('.back').css('position', 'relative');
      $('.bttn--next').css('visibility', 'visible');
    } else {
      // Animate failure
      let userAnswer = currentDoor.children('.fail')[0];
      currentDoor.toggleClass('flipme');
      if (getComputedStyle(userAnswer).visibility == 'hidden')
        currentDoor.children('.fail').css('visibility', 'visible');
        timeoutID = setTimeout(nextDoorEvent, 1500);
    }
  };

  // Binds enter key in text-answer component to answerEvent.
  $('[name=text-answer]').keydown((e) => {
    if (e.which == 13) answerEvent();
  });
  // Binds various keys in document to UI events.
  $(document).keydown((e) => {
    if (e.which == 27)  // escape key closes Summary Component
      location.href = "#text-answer";
    else if (e.which == 38) // up key flips current card
      currentDoor.toggleClass('flipme');
    else if (e.which == 40) // down key fires nextDoorEvent
      nextDoorEvent();
    else if (e.which == 187) // + key adds all cards to ActiveDeck
      $('.game-component')[0].queryDeck().forEach(card => card.active = 1);
    else if (e.which == 189) { // - removes all cards from ActiveDeck
      $('.game-component')[0].queryDeck().forEach(card => card.active = 0);
      $('.game-component')[0].queryDeck().stagger = 0;
    }
  });
  // Binds click event on card to shake animation.
  $(".flippable").click(function() {
    const that = $(this);
    that.addClass('shakeme');
    setTimeout(() => that.removeClass('shakeme'), 500);
    $('[name=text-answer]').focus();
  });
  // Events for Control Component and Summary Component.
  $('.bttn--next').click(() => answerEvent());
  $('.bttn--cancel').click(() => endDeckSession(deck, 'successes'));
  $('.card-bar-chart--bttn-successes').click(() => endDeckSession(deck, 'successes'));
  $('.card-bar-chart--bttn-failures').click(() => endDeckSession(deck, 'failures'));
  $('.card-bar-chart--bttn-percentage').click(() => endDeckSession(deck, 'percentage'));
  $('.card-bar-chart--bttn-demo').click(() => endDeckSession(deck, 'demo'));

  /**
   * Sets the current deck and fires off a nextDoorEvent to select first card.
   * @param {Object} The new deck to use.
   */
  $('.game-component')[0].changeDeck = (newDeck) => {
    deck = newDeck;
    nextDoorEvent();
  }
  /**
   * Gets the current deck for other Components.
   * @return {Object} The current deck in the Learning Game.
   */
  document.querySelector('.game-component').queryDeck = () => deck;
};

/** 
 * Gets the next card from the deck.
 * @param {Object} currentDoor The currently active door.
 * @param {Object} deck The deck to select from.
 * @return {Object} The next card to use.
 */
const getNextCard = (currentDoor, deck) => {
  if (!deck) return {};
  // Unless no-algorithm button is clicked use the current algorithm.
  if (!$('.bttn--algo')[0].clicked)
    return selectNextCard(deck, deck[parseInt(currentDoor.attr('card-id'))]);
  // Else just select the cards in sequence.
  let cardId = (parseInt(currentDoor.attr('card-id')) + 1) % deck.length;
  for (const card of deck)
    if (card.id === cardId)
      return card;
  return deck[0];  // default
}

/** 
 * Gets the current card assigned to the door.
 * @param {Door} currentDoor The currently active door.
 * @param {Deck} deck The deck to select from.
 * @return {Card} The card assigned to the current door.
 */
const getCard = (currentDoor, deck) =>
  deck[parseInt(currentDoor.attr('card-id'))];

/**
 * Class en-closure for DOM element Animator.
 * @return {Animator} New Animator setter closure.
 */
const Animator = () => {
  let zPos = 0;
  let zDelta = 0;
  let element;
  const increment = Math.PI / 100;

  /**
   * Animates current element with zoom-in-out.
   */
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

  /**
   * Sets DOM element to animate.
   * @param {Object} _element DOM element to animate.
   */
  return (_element) => {
    element = _element;
    animate();
  }
};

/**
 * Starts the Learning Game timer.
 */
const startTimer = () => {
  document.querySelector('.timer').time = 60 * 3;
  clearTimeout(document.querySelector('.timer').timeoutID)
  printTimer(); 
}

/**
 * Stops the Learning Game timer.
 */
const stopTimer = () => {
  clearTimeout(document.querySelector('.timer').timeoutID);
  document.querySelector('.timer').time = 60 * 3;
}

/**
 * Updates timer and prints to DOM element.
 */
const printTimer = () => {
  let currentTime = document.querySelector('.timer').time--;
  $('.timer').text(renderTime(currentTime--));
  if (currentTime >= 0)
    document.querySelector('.timer').timeoutID = setTimeout(printTimer, 1000);
  else {
    endDeckSession($('.game-component')[0].queryDeck(), 'failures');
  }
}

/**
 * Renders time as "M:SS".
 * @param {number} sec Time in seconds.
 */
const renderTime = (sec) => {
  let min = Math.floor(sec / 60);
  let secs = (sec - min * 60) % 60;
  if (secs < 10)
    secs = '0' + secs;
  return (min + ':' + secs);
}

/**
 * Binds click on logo event to stop timer.
 */
$('.logo').click(() => clearTimeout(document.querySelector('.timer').timeoutID));
