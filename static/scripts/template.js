/**
 * Renders a card HTML template from JSON data.
 * @param {Object} json JSON card object.
 * @return {string} HTML card components populated with data.
 */
const renderCardTemplate = json => `
  <div class="card front" style="background-color: ${json.color}">` + (json.image ?
      `<img class="card-img-top" src="${json.image}" alt="card image cap">
      <div class="card-body">` :
      `<div class="card-body">`) +
          `<h5 class="card-title">Question</h5>
          <p class="card-text">${json.question}</p>
      </div>
  </div>
  <div class="card back">
      <div class="card-body">
          <h5 class="card-title">Answer</h5>
          <p class="card-text">${json.answer}</p>
      </div>
  </div>
  <div class="card success">
      <div class="card-body">
          <h5 class="card-icon">&#9989</h5>
      </div>
  </div>
  <div class="card fail">
  <div class="card-body">
      <h5 class="card-icon">&#10060</h5>
  </div>
</div>`;

/**
 * Renders summary HTML template from custom data.
 * @param {Object} summary Custom summary data.
 * @return {string} HTML summary template populated with data.
 */
const renderSummaryTemplate = summary => `
    <h3 class="summary-title">${summary.title}</h3>
    <p class="summary-motivational">${summary.motivationalText}</p>
    <p class="summary-score">Overall score: <em><span>${summary.avgPct}%</span></em>!</p>
    <p class="summary-conditional">${summary.conditionalText}</p>
    <p class="summary-emoji">${summary.emoji}</p>`;
