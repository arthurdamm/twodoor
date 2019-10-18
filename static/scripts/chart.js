const endDeckSession = (deck) => {
  console.log('endDeckSession()')
  $('.game-component').hide();
  $('.summary-component').show();
  const data = deck.map(card => ({
    Card: `Card #${card.id}`,
    Successes: card.performance.filter(result => result).length,
  }));
  renderPerformanceChart(data);
};

const renderPerformanceChart = (data) => {
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
    .range([ 0, width ])
    .domain(data.map(d => d.Card))
    .padding(0.1);  
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  const y = d3.scaleLinear()
    .domain([0, 5])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", d => x(d.Card))
      .attr("y", d => y(d.Successes))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Successes))
      .attr("fill", "#3F00FF")
};
