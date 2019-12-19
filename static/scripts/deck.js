/**
 * @fileoverview Module for Deck Functions
 * @package
 */

const addDeck = (deck) =>
  $('.deck-container').append(renderDeckSelectorTemplate(deck));

const populateDeckSelectors = () => {
  for (deck of Object.values(decks))
    if (deck.name !== decks.CUSTOM.name)
      addDeck(deck);
};
