/**
 * @fileoverview Module for Summary Component.
 * @package
 */

/**
 * Enum for summary chart variables.
 * @readonly
 * @enum {string}
 */
const chartVariables = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  PERCENTAGE: 'percentage',
  DEMO: 'demo',
};

/**
 * Displays summary overlay upon the end of Learning Game session and
 * prepares deck performance data by variable.
 * @param {Object} deck The deck used in the session.
 * @param {string} variable The variable to chart in the overlay.
 */
const endDeckSession = (deck, variable) => {
  showSummary();
  deck = JSON.parse(JSON.stringify(deck));
  if (variable == chartVariables.DEMO)
    deck = mapDemoPerformances(deck, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  let x;
  const data = deck.map(card => ({...card,
    card: `Card #${card.id}`,
    success: x = card.performance.filter(result => result).length,
    failure: card.performance.filter(result => !result).length,
    percentage: card.performance.length ? (x / card.performance.length) * 100 : 0,
  }));
  renderPerformanceChart(data,
    variable == chartVariables.DEMO ? chartVariables.PERCENTAGE : variable);
  renderPerformanceSummary(data);
};

/**
 * Renders custom performance summary from templates for given session data.
 * @param {Object} data The given deck performance data.
 */
const renderPerformanceSummary = (data) => {
  const titles = ['Good job!', 'Good work!', 'Nice!', 'Good-good!']
  const motivationals = [
    {range: [76, 100], text: 'An amazing performance!', emoji: '&#128579;'},
    {range: [51, 75], text: 'You did exceptionally well today!', emoji: '&#128513;'},
    {range: [26, 50], text: 'A reasonable job.', emoji: '&#128578;'},
    {range: [0, 25], text: 'Well, you tried...', emoji: '&#129325;'},
  ];
  const x = (Math.round(data.reduce((a, d) => a + d.success, 0) /
                       data.reduce((a, d) => a + d.performance.length, 0) * 100)) || 0;
  const m = motivationals.filter(m => x >= m.range[0] && x <= m.range[1])[0];
  const summary = {
    avgPct: x,
    title: titles[Math.floor(Math.random() * titles.length)],
    motivationalText: m.text,
    conditionalText: 'Better than last time!',
    emoji: m.emoji,
  }
  $('.summary-template').html(renderSummaryTemplate(summary));
}

/**
 * Renders D3.js bar chart from performance data for given variable.
 * @param {Object} data The given deck performance data.
 * @param {string} variable The given variable to chart.
 */
const renderPerformanceChart = (data, variable) => {
  const margin = {top: 50, right: 30, bottom: 70, left: 60}, 
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  $('.card-bar-chart').empty();
  const svg = d3.select('.card-bar-chart')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')');

  const x = d3.scaleBand()
    .domain(data.map(d => d.card))
    .range([0, width])
    .padding(0.1);  
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
    .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

  const y = d3.scaleLinear()
    .domain([0, variable == chartVariables.PERCENTAGE ?
      100 : d3.max(data, d => d[variable])])
    .range([height, 0]);
  svg.append('g')
    .call(d3.axisLeft(y));
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - (margin.left * .8))
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(variable);  

  const bars = svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
      .attr('x', d => x(d.card))
      .attr('y', d => height)
      .attr('width', x.bandwidth())
      .attr('height', d => 0)
      .attr('fill', variable === chartVariables.SUCCESS ? 'green' :
        variable == chartVariables.FAILURE ? 'red' : '#3F00FF');
  bars.transition()
    .delay(100)
    .duration(800)
    .attr('y', d => y(d[variable]))
    .attr('height', d => height - y(d[variable]));
};
