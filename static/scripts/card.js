/**
 * @fileoverview Module for Game Component.
 * @package
 */

/**
 * @classdesc En-closure for Learning Game instance.
 * @class LearningGame
 */
const LearningGame = () => {
  /**
   * The DOM door object currently visible on top.
   * @member {Object} currentDoor
   */
  let currentDoor = $('#door2');
  /**
   * The DOM door object invisible beneath the currentDoor.
   * @member {Object} nextDoor
   */
  let nextDoor;
  /**
   * The deck currently in play.
   * @member {Array<Object} deck
   */
  let deck = [];
  /** Flag true if animating the current card.
   * @member {boolean} animating
   */
  let animating = false;
  /** Flag true if answered the current card.
   * @member {boolean} answered
   */
  let answered = false;
  /** ID of nextDoorEvent timeout.
   * @member {number} doorTimeoutID
   */
  let doorTimeoutID;
  /** ID of settings timeout.
   * @member {number} settingsTimeoutID
   */
  let settingsTimeoutID;
  /** Animator instance for zoom-in-out success animation.
   * @const {Animator} animate
   */
  const animate = Animator();


  /**
   * Slides away current door and displays underlying door, switching
   * the two doors and thus the cards they hold.
   */
  const nextDoorEvent = () => {
    console.log("nextDoorEvent()");
    if (animating) return console.log("returning!");
    $('[name=text-answer]').val('');
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
   * Parses user answer for current card & invokes nextDoorEvent.
   */
  const answerEvent = () => {
    // set initial card state to game mode
    document.querySelector('.settings-icon').state = 'game';
    // show card-back. Default is display none to prevent cheating
    currentDoor.find('.card-back').show();
    currentDoor.find('.settings').hide();

    checkGameFocus();
    // Rush event if already answered
    if (animating || answered) {
      clearTimeout(doorTimeoutID);
      nextDoorEvent();
      return;
    }
    answered = true;
    // Match user answer against card back
    if (matchAnswer($('[name=text-answer]').val(), getCard(currentDoor, deck))) {
        // Animate success
      let userAnswer = currentDoor.find('.success')[0];
      if (getComputedStyle(userAnswer).visibility == 'hidden') {
        currentDoor.toggleClass('flipme');
        currentDoor.find('.success').css('visibility', 'visible');
        // currentDoor.find('.success').fadeOut(750);
        currentDoor.find('.success').addClass('animate-card-icon');
        animate(userAnswer);
        doorTimeoutID = setTimeout(nextDoorEvent, 1500);
      } else {
        nextDoorEvent();
      }
      currentDoor.children('.back').addClass('success-border');
      currentDoor.children('.back').css('visibility', 'visible');
      currentDoor.children('.back').css('position', 'relative');
      $('.bttn--next').css('visibility', 'visible');
    } else {
      // Animate failure
      let userAnswer = currentDoor.children('.fail')[0];
      currentDoor.toggleClass('flipme');
      if (getComputedStyle(userAnswer).visibility == 'hidden') {
        currentDoor.find('.fail').css('visibility', 'visible');
        // currentDoor.find('.fail').fadeOut(750);
        currentDoor.find('.fail').addClass('animate-card-icon');
        currentDoor.children('.back').addClass('fail-border');

      } 
      animate(userAnswer);
      doorTimeoutID = setTimeout(nextDoorEvent, 1500);
      currentDoor.children('.fail').css('visibility', 'visible');
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
  $(".deck .flippable").click(function(e) {
    console.log("SHAKE:", e.target);
    const icon = document.querySelector('.settings-icon');
    if (e.target == icon || icon.state == 'settings') {
      return;
    }
    else if (getSetting("flipOnClick") == true) {
      currentDoor.find('.card-back').show();
      currentDoor.toggleClass('flipme');
      if (!isMobile()) $('[name=text-answer]').focus();
      return;
    }
    const that = $(this);
    that.addClass('shakeme');
    setTimeout(() => that.removeClass('shakeme'), 500);
    if (!isMobile()) $('[name=text-answer]').focus();
    else $('bttn--next').focus();
  });
  // Events for Control Component and Summary Component.
  $('.game-component .bttn--next').click(() => answerEvent());
  $('.game-component .bttn--cancel').click(() =>
    endDeckSession(deck, chartVariables.SUCCESS));
  $('.card-bar-chart--bttn-successes').click(() =>
    endDeckSession(deck, chartVariables.SUCCESS));
  $('.card-bar-chart--bttn-failures').click(() =>
    endDeckSession(deck, chartVariables.FAILURE));
  $('.card-bar-chart--bttn-percentage').click(() =>
    endDeckSession(deck, chartVariables.PERCENTAGE));
  $('.card-bar-chart--bttn-demo').click(() =>
    endDeckSession(deck, chartVariables.DEMO));

  /**
   * Sets the current deck and fires off a nextDoorEvent to select first card.
   * @param {Object} The new deck to use.
   */
  $('.game-component')[0].changeDeck = (newDeck) => {
    console.log("changeDeck(): " + newDeck.length);
    deck = newDeck;
    nextDoorEvent();
  }

  /**
   * Updates the current deck with data collected in background.
   * @param {Object} The new cards to update.
   */
  $('.game-component')[0].updateDeck = (newDeck) => {
    const nd = newDeck.filter(o =>
      deck.filter(s => s.answer == o.answer).length == 0);
    deck = deck.concat(nd);
    deck.forEach(o => o.active = 0);
    deck.stagger = 0;
    console.log("updateDeck() now: " + deck.length);
  }

  /**
   * Gets the current deck for other Components.
   * @return {Object} The current deck in the Learning Game.
   */
  document.querySelector('.game-component').queryDeck = () => deck;

  $(document).on('click', '.settings-icon', function(e) {
    clearTimeout(settingsTimeoutID);
    if (getSetting("flipOnClick") == true)
      document.querySelector('.toggle-flip').checked = true;
    e.target.state = "settings";
    currentDoor.find('.card-back').hide();
    currentDoor.find('.settings').show();
    currentDoor.toggleClass('flipme');
  });
  $(document).on('click', '.save-settings', function() {
    document.querySelector('.settings-icon').state = 'game';
    putSetting("flipOnClick", document.querySelector('.toggle-flip').checked);
    putSetting("algoType", $('.algo-select :selected').val());
    // console.log("putSetting= ", _settings)
    saveUserData();
    currentDoor.toggleClass('flipme');
    settingsTimeoutID = setTimeout(function() {
      currentDoor.find('.card-back').show();
    }, 150);
    currentDoor.find('.settings').hide();
  });
  $(document).on('click', '.remove-card', function() {
    delete deck[parseInt(currentDoor.attr('card-id'))];
    nextDoorEvent();
  });
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
  if (getSetting("algoType") == "leitner")
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
 * @classdesc En-closure for DOM element Animator.
 * @class Animator
 * @return {Animator} New Animator setter closure.
 */
const Animator = () => {
  /**
   * How many radians to increment by every tick.
   * @const {number} increment
   */
  const increment = Math.PI / 100;
  /**
   * Current z-position of animated element.
   * @member {number} zPos
   */
  let zPos = 0;
  /**
   * Current angular displacement of animated element.
   * @member {number} zDelta
   */
  let zDelta = 0;
  /**
   * DOM element to animate.
   * @member {Object} element
   */
  let element;
  
  /**
   * Animates element with zoom-in-out by mapping z-position to sin wave.
   */
  const animate = () => {
    element.style.transform = `translate3d(0, 0, ${zPos}px)`;
    zPos = Math.sin(1.55 * zDelta) * 155;
    zDelta += increment;
    if (zDelta >= 2) {  // Done animating
      zPos = zDelta = 0;
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
    endDeckSession($('.game-component')[0].queryDeck(), chartVariables.FAILURE);
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

const isMobile = (max_width) =>
  window.matchMedia(`only screen and (max-width: ${max_width || 800}px)`).matches;

const checkGameFocus = () => {
if (!isMobile()) {
      console.log("Focusing desktop");
      $('[name=text-answer]').focus();
    }
    else if (!$('[name=text-answer]').is(':focus')) {
      console.log("Focusing mobile anchor");
      setTimeout(() => (console.log("Focus!"), location.href = "#game-anchor"), 100);
    } else
      console.log("Focusing nothing;");
}

/**
 * resizes card when keyboard is open on mobile
 */
const keyboardDeck = () => {
  if (isMobile()) {
    $('[name=text-answer]').on("focus", function() {
      $('.deck').addClass('keyboard-deck');
      $('header').hide();
    }).on("focusout", function() {
      $('.deck').removeClass('keyboard-deck');
      $('header').show();
      setTimeout(() => checkGameFocus(), 100);
    });
  }
}
