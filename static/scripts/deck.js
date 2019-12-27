/**
 * @fileoverview Module for Deck Functions
 * @package
 */

const _decks = {};

const decks = () => _decks;

const deckSelectorDelete = function (e) {
  console.log("deckSelectorDelete()");
  if (!confirm("Confirm delete?")) return;
  const deckSelector = $(this).closest('.deck-selector');
  const deck = deckSelector.attr('deck');
  delete decks()[deck];
  saveUserData();
  $(`.deck-selector[deck=${deck}]`).remove();
}

const deckSelectorSubmit = function (e) {
  e.preventDefault();
  const deckSelector = $(this).closest('.deck-selector');
  console.log("Play Deck()", deckSelector);
  const deck = deckSelector.attr('deck');
  const starting = parseInt(deckSelector.find('.deck-starting-select').val());
  const stagger = parseInt(deckSelector.find('.deck-stagger-select').val());
  const settings = getSetting(deck) || {};

  // only update if not default values
  if(deck === DECKS.HOLBIE.name) {
    const cohort = $('#holbie-cohort-select').val();
    const numPeers = parseInt($('#holbie-size-select').val());
    if (cohort != $('#holbie-cohort-select [selected]').val())
      settings.cohort = cohort;
    if (numPeers != parseInt($('#holbie-size-select [selected]').val()))
      settings.numPeers = numPeers;
  }
  if (starting != parseInt($('.deck-starting-select [selected]').val()))
    settings.starting = starting;
  if (stagger != parseInt($('.deck-stagger-select [selected]').val()))
    settings.stagger = stagger;
  if (Object.keys(settings).length) {
    putSetting(deck, settings);
    saveUserData();
  }
  if (deck === DECKS.BUILDER.name) {
    showBuild();
  }
  else if(deck === DECKS.HOLBIE.name) {
    showHolbie();
  }
  else {
    $('.game-component')[0].deckType = deck;
    showGame();
  }
};

const addDeck = (deck) => {
  console.log("addDeck():", deck);
  const name = (deck.name == DECKS.CUSTOM.name ? deck.deckName : deck.name);
  _decks[name] = deck;
  $('.deck-container').append(renderDeckSelectorTemplate(deck));
  const settings = getSetting(name)
  if (settings) {  
    if (settings.starting)
      $('.deck-container').find('.deck-selector:last .deck-starting-select').val(settings.starting);
    if (settings.stagger)
      $('.deck-container').find('.deck-selector:last .deck-stagger-select').val(settings.stagger);
  }
}

const populateDeckSelectors = () => {
  for (deck of Object.values(DECKS))
    if (deck.name !== DECKS.CUSTOM.name)
    {
      deck.type = deck.name;
      addDeck(deck);
    }
};

const loadDeckSettings = () => {
  for (deck of Object.values(_decks)) {
    const settings = getSetting(deck.name);
    if (!settings) continue;
    console.log("loadDeckSettings()", deck.name);
    const deckSelector = $(`.deck-selector[deck=${deck.name}]`);
    if (deck.name == DECKS.HOLBIE.name) {
      if (settings.cohort)
        $('#holbie-cohort-select').val(settings.cohort);
      if (settings.numPeers)
        $('#holbie-size-select').val(settings.numPeers);
    }
    if (settings.starting)
      deckSelector.find('.deck-starting-select').val(settings.starting);
    if (settings.stagger)
      deckSelector.find('.deck-stagger-select').val(settings.stagger);
  }
}

const getDeckName = (deck) =>
  deck.type + (deck.name || "");
