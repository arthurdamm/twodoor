/**
 * @fileoverview Module for HTML templates.
 * @package
 */

/**
 * Renders Card HTML template from JSON data.
 * @param {Object} json JSON card object.
 * @return {string} HTML card components populated with data.
 */
const renderCardTemplate = json => `
  <div class="card front" style="background-color: ${json.color}">` + (json.image ?
      `<img class="card-img-top" src="${json.image}" alt="card image cap">
      <div class="card-body">` :
      `<div class="card-body">`) +
          `
      <div class="settings-icon"></div>
          <h5 class="card-title">Question</h5>
          <p class="card-text">${json.question}</p>
      </div>
  </div>
  <div class="card back">
    <div class="card settings" style="display: none">
      <input class="toggle-flip" type="checkbox">flip on click
      <br>
      <div class="algo-select">
        algorithm type
        <select>
          <option value="leitner">leitner</option>
          <option value="linear">linear</option>
        </select>
      </div>
      <button class="bttn remove-card">remove card</button>
      <button class="bttn save-settings">save settings</button>
      </div>
    <div class="card-icon success">&#9989</div>
    <div class="card-icon fail">&#10060</div>
    <div class="card-body card-back" style="display: none">
        <h5 class="card-title">Answer</h5>
        <p class="card-text">${json.answer}</p>
    </div>
  </div>
  <div class="card fail"></div>
</div>`;

/**
 * Renders Summary HTML template from custom data.
 * @param {Object} summary Custom summary data.
 * @return {string} HTML summary template populated with data.
 */
const renderSummaryTemplate = summary => `
    <h3 class="summary-title">${summary.title}</h3>
    <p class="summary-motivational">${summary.motivationalText}</p>
    <p class="summary-score">Overall score: <em><span>${summary.avgPct}%</span></em>!</p>
    <p class="summary-conditional">${summary.conditionalText}</p>
    <p class="summary-emoji">${summary.emoji}</p>`;

/**
 * Renders Deck Selector component for each deck.
 * @param {Object} Deck object with JSON data.
 * @return {string} HTML deck selector element populated with data.
 */
const renderDeckSelectorTemplate = deck => {
  const name = deck.type + (deck.custom ? deck.i : "");
  return `
<div class="deck-selector flippable${deck.custom ? ' custom-deck custom-deck-' + deck.i : ''}" deck="${name}">
  <div class="front">
    <h2 class="deckText">${deck.text || name}</h2>
  </div>
  <div class="back">
    <div class="deck-settings-component">
      <div class="deck-settings-text">Deck Settings:</div>

      <div class="deck-settings-select">
        <label for="deck-starting-select-${name}">Starting:</label>
        <select class="deck-starting-select" name="deck-starting-select-${name}" id="deck-starting-select-${name}" form="deck-settings-form" required>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5" selected>5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="deck-settings-select">
        <label for="deck-stagger-select-${name}">Stagger:</label>
        <select class="deck-stagger-select" name="deck-stagger-select-${name}" id="deck-stagger-select-${name}" form="deck-settings-form" required>
          <option value="1">1</option>
          <option value="2" selected>2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <form class="deck-settings-form" id="deck-settings-form-${name}">
        <input class="bttn bttn--deck" name="deck-settings-submit-${name}" id="deck-settings-submit-${name}" type="submit" value="" />
      </form>
    </div>
  </div>
</div>`;
};
