/**
 * @fileoverview Module for Deck Functions
 * @package
 */

const addDeck = (deck) => {
  console.log("addDeck() settings:", settings);
  $('.deck-container').append(renderDeckSelectorTemplate(deck));
  $('.deck-container').last('.deck-selector .deck-starting-select').val(settings.starting);
  $('.deck-container').last('.deck-selector .deck-stagger-select').val(settings.stagger);
}

const populateDeckSelectors = () => {
  for (deck of Object.values(decks))
    if (deck.name !== decks.CUSTOM.name)
      addDeck(deck);
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
