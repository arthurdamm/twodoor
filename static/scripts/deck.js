/**
 * @fileoverview Module for Deck Functions
 * @package
 */

const deckSelectorSubmit = function (e) {
  e.preventDefault();
  const deckSelector = $(this).closest('.deck-selector');
  console.log("Play Deck()", deckSelector);
  const deck = deckSelector.attr('deck');
  const starting = parseInt(deckSelector.find('.deck-starting-select').val());
  const stagger = parseInt(deckSelector.find('.deck-stagger-select').val());
  const settings = getSetting(deck) || {};

  // only update if not default values
  if (starting != parseInt($('.deck-starting-select [selected]').val()))
    settings.starting = starting;
  if (stagger != parseInt($('.deck-stagger-select [selected]').val()))
    settings.stagger = stagger;
  if (Object.keys(settings).length){
    putSetting(deck, settings);
    saveUserData();
  }
  if (deck === decks.BUILDER.name) {
    showBuild();
  }
  else if(deck === decks.HOLBIE.name) {
    showHolbie();
  }
  else {
    $('.game-component')[0].deckType = deck;
    $('.game-component')[0].deckText = $(this).closest('.deck-selector').attr('text');
    showGame();
  }
};

const addDeck = (deck) => {
  $('.deck-container').append(renderDeckSelectorTemplate(deck));
  const settings = getSetting()
  if (settings) {
    console.log("addDeck() settings:", settings);
    if (settings.starting)
      $('.deck-container').last('.deck-selector .deck-starting-select').val(settings.starting);
    if (settings.stagger)
      $('.deck-container').last('.deck-selector .deck-stagger-select').val(settings.stagger);
  }
}

const populateDeckSelectors = () => {
  for (deck of Object.values(decks))
    if (deck.name !== decks.CUSTOM.name)
    {
      deck.type = deck.name;
      addDeck(deck);
    }
};

const loadDeckSettings = () => {
  for (deck of Object.values(decks)) {
    const settings = getSetting(deck.name);
    if (!settings) continue;
    console.log("loadDeckSettings()", deck.name);
    const deckSelector = $(`.deck-selector[deck=${deck.name}]`);
    if (settings.starting)
      deckSelector.find('.deck-starting-select').val(settings.starting);
    if (settings.stagger)
      deckSelector.find('.deck-stagger-select').val(settings.stagger);
  }
}

const getDeckName = (deck) =>
  deck.type + (deck.name || "");
