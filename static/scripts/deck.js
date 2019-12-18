/**
 * @fileoverview Module for Deck Functions
 * @package
 */

const addDeck = (deck) =>
  $('.deck-container').append(renderDeckSelectorTemplate(deck));

const populateDeckSelectors = () => {
  for (deck of Object.values(decks)) {
    addDeck(deck);
  }
};
