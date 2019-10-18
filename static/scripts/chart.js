const endDeckSession = (deck, variable) => {
  console.log('endDeckSession()')
  $('.game-component').hide();
  $('.summary-component').show();
  let x;
  const data = deck.map(card => ({
    Card: `Card #${card.id}`,
    Successes: x = card.performance.filter(result => result).length,
    // Successes: x = Math.floor(Math.random() * 7) + Math.floor(Math.random() * 3),
    Failures: card.performance.filter(result => !result).length,
    Percentage: card.performance.length ? (x / card.performance.length) * 100 : 0,
  }));
  renderPerformanceChart(data, variable);
};

const renderPerformanceChart = (data, variable) => {
  console.log("renderPerformanceChart()", data);
  const margin = {top: 30, right: 30, bottom: 70, left: 60}, 
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  $("#card-bar-chart").empty();
  const svg = d3.select("#card-bar-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleBand()
    .domain(data.map(d => d.Card))
    .range([0, width])
    .padding(0.1);  
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  const y = d3.scaleLinear()
    .domain([0, variable == 'Percentage' ? 100 : 10])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - (margin.left * .8))
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(variable);  

  const bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", d => x(d.Card))
      .attr("y", d => height)
      .attr("width", x.bandwidth())
      .attr("height", d => 0)
      .attr("fill", variable === 'Successes' ? "#3F00FF" : "red");
  bars.transition()
    .delay(100)
    .duration(800)
    .attr("y", d => y(d[variable]))
    .attr("height", d => height - y(d[variable]));
};
