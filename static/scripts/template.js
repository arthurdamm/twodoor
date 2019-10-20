const renderCardTemplate = json => `
  <div class="card front">
      <img class="card-img-top" src="${json.image}" alt="card image cap">
      <div class="card-body">
          <h5 class="card-title">Question</h5>
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
  <div class="card fail" style="width: 100%;">
  <div class="card-body">
      <h5 class="card-icon">&#10060</h5>
  </div>
</div>`;

const renderSummaryTemplate = summary => `
    <h3>${summary.title}</h3>
    <p class="summary-motivational">${summary.motivationalText}</p>
    <p class="summary-score">${summary.avgPct}</p>
    <p class="summary-conditional">${summary.conditionalText}</p>
    <p class="summary-emoji">${summary.emoji}</p>`;