const DATA_DIR = "./ppr"
const DATA_NAME = "fake_level1_graph.json"
const WIDTH = 800
const HEIGHT = 800

d3.json(`${DATA_DIR}/${DATA_NAME}`).then((data) => {
  console.log(data)

  // Draw graph

  const nodeColorScale = d3.scaleLinear()
    .domain([1, 0])
    .range(['black', 'lightgray'])
    .interpolate(d3.interpolateHcl)

  const getNodeStrokeColor = label => {
    return label == 1 ? "blue" : label == -1 ? "gray" : "red"
  }

  const simulation = d3.forceSimulation(data.nodes)
    .force("charge", d3.forceManyBody().strength(-3000))
    .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2))
    .force("x", d3.forceX(WIDTH / 2).strength(1))
    .force("y", d3.forceY(HEIGHT / 2).strength(1))
    .force("link", d3.forceLink(data.links).id(function(d) {return d.id}).distance(50).strength(1))

  const svg = d3.select("#graph-view")
    .append("svg")
    .attr("id", "graph-svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)

  const link = svg.append("g")
    .attr("id", "link-g")
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke-width", 1)
    .attr("stroke", "gray")

  const node = svg.append("g")
    .attr("id", "node-g")
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
    .attr("r", 20)
    .attr("fill", d => nodeColorScale(d.ppr*100))
    .attr("stroke-width", 5)
    .attr("stroke", d => getNodeStrokeColor(d.label))
    .call(drag(simulation))
    
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });

  // Make svg zoomable

  const zoom = d3.zoom()
    .scaleExtent([0.1, 3.5])
    .extent([
      [0, 0],
      [WIDTH, HEIGHT],
    ])
    .on("zoom", (e) => {
      d3.select('#node-g')
        .attr('transform', d3.event.transform);
      d3.select('#link-g')
        .attr('transform', d3.event.transform);
    })
  svg.call(zoom);
})


function drag (simulation) {
  
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}