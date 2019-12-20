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
      <div class="settings-icon"></div>
      <div class="card-body">` :
      `<div class="card-body">`) +
          `<h5 class="card-title">Question</h5>
          <p class="card-text">${json.question}</p>
      </div>
  </div>
  <div class="card back">
    <div class="card settings">
      <input type="radio">flip on click
      <button class="bttn save-settings">save settings</button>
      </div>
    <div class="card-icon success">&#9989</div>
    <div class="card-icon fail">&#10060</div>
    <div class="card-body">
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
const renderDeckSelectorTemplate = deck => `
<div class="deck-selector flippable${deck.custom ? ' custom-deck custom-deck-' + deck.i : ''}" deck="${deck.name}">
  <div class="front">
    <h2 class="deckText">${deck.text}</h2>
  </div>
  <div class="back">
    <h4>Play Now!</h4>
    <div class="bttn bttn--deck" deck="${deck.name}"></div>
  </div>
</div>`;
