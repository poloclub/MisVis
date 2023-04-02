import { getLabelName, getColor, summaryViewCenterX, summaryViewCenterY, study } from "./data.js";
import { MISINFORMATION_COLOR, RELIABLE_COLOR, OTHERS_COLOR } from "./data.js";
import { l1CircleRadius, l2CircleRadius, bubbleRadius } from "./data.js";
import { graphViewCenterX, graphViewCenterY } from "./data.js";
import { makeHeader } from "./header.js";
import { makeMainWindow } from "./main.js";
import { makeTwitterWindow } from "./twitter.js";

let inForceSimulationDone1=false, inForceSimulationDone2=false, inForceSimulationDone3=false;
let outForceSimulationDone1=false, outForceSimulationDone2=false, outForceSimulationDone3=false;
let inForceSimulation1, inForceSimulation2, inForceSimulation3, outForceSimulation1, outForceSimulation2, outForceSimulation3
let defaultAnimationInterval = null;

export function toggleTwitterPopup() {
    let twitterPopup = document.getElementById("twitter");
    if (d3.select("#twitter").style("opacity") == "0") d3.select("#twitter").transition().duration(500).style("opacity", "1");
    else {
        d3.select("#twitter").transition().duration(500).style("opacity", "0");
        d3.select(`#twitter-icon-svg`).select("path").style("fill", "white");
        d3.select(`#twitter-icon-svg`).select("span").style("opacity", "0.2");
    }
}

export function iconButtonHovered(e) {
    d3.select(`#${e.target.id}`).select("path").style("fill", "#9F9F9F");
    d3.select(`#${e.target.id}`).select("span").style("opacity", "0.4");
}

export function iconButtonOut(e) {
    if (e.target.id == "twitter-icon-svg") {
        let twitterPopup = document.getElementById("twitter");
        if (twitterPopup.style.opacity == "0" || window.getComputedStyle(twitterPopup).opacity == "0" || twitterPopup.style.display == "none" || window.getComputedStyle(twitterPopup).display == "none") {
            d3.select(`#${e.target.id}`).select("path").style("fill", "white");
            d3.select(`#${e.target.id}`).select("span").style("opacity", "0.2");
        }
    }
    else {
        d3.select(`#${e.target.id}`).select("path").style("fill", "white");
        d3.select(`#${e.target.id}`).select("span").style("opacity", "0.2");
    }
}

export function toggleHelpDisplay() {
    alert('function.js/toggleHelpDisplay() not implemented yet!');
}

export function toggleSearchDisplay() {
    let searchBarHeader = document.getElementById("domain-search-bar-header");
    if (searchBarHeader.style.display == "none") searchBarHeader.style.display = "";
    else searchBarHeader.style.display = "none";
}

export function displayModeChanged(animation=true) {
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    inSummaryGraphDiv.summaryView = !inSummaryGraphDiv.summaryView;
    outSummaryGraphDiv.summaryView = !outSummaryGraphDiv.summaryView;

    let domainName = inSummaryGraphDiv.domainName;

    d3.selectAll("*").transition();

    if (!inSummaryGraphDiv.summaryView) {
        inForceSimulationDone1=inForceSimulationDone2=inForceSimulationDone3=false;
        outForceSimulationDone1=outForceSimulationDone2=outForceSimulationDone3=false;
        stopSimulation();
        showGraphView(domainName, animation);
    }
    else {
        inForceSimulationDone1=inForceSimulationDone2=inForceSimulationDone3=false;
        outForceSimulationDone1=outForceSimulationDone2=outForceSimulationDone3=false;
        stopSimulation();
        showSummaryView();
    }

    if (study) d3.selectAll(".masked-in-study").html((_,i,dom) => mask(dom[i]));
}

function showSummaryView() {
    if (defaultAnimationInterval) {
        clearInterval(defaultAnimationInterval);
        inForceSimulationDone1=inForceSimulationDone2=inForceSimulationDone3=false;
        outForceSimulationDone1=outForceSimulationDone2=outForceSimulationDone3=false;
        defaultAnimationInterval = null;
    }
    let L2EmptyArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(2*Math.PI);
    let indirectDisplayFlag = document.getElementById("in-summary-graph").indirectDisplay;
    d3.selectAll(".graph-view-appended")
        .transition()
            .duration(500)    
            .style("opacity", "0")
            .remove();
    d3.select("#in-graph-window").remove();
    d3.select("#out-graph-window").remove();
    d3.select("#in-statement-graph-view")
        .transition()
            .duration(500)    
            .style("opacity", "0")
        .transition()
            .delay(500)
            .style("display", "none");
    d3.select("#out-statement-graph-view")
        .transition()
            .duration(500)    
            .style("opacity", "0")
        .transition()
            .delay(500)
            .style("display", "none");

    d3.select("#in-l2-empty-arc")
        .transition()
            .delay(500)
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", L2EmptyArc)
    d3.select("#in-l1-empty-arc")
        .transition()
            .delay(1000)
            .attr("transform", `translate(${summaryViewCenterX}, ${summaryViewCenterY})`);
    d3.select("#in-l2-empty-arc")
        .transition()
            .delay(1000)
            .attr("transform", `translate(${summaryViewCenterX}, ${summaryViewCenterY})`);
    d3.select("#in-graph")
        .style("position", "absolute")
        .style("top", "0px")
        .transition()
            .delay(1000)
            .style("top", "32px")
            .style("height", "330px")
            .style("padding-top", "15px")
            .style("padding-bottom", "15px")
        .transition()
            .duration(800)
            .style("top", "65px")
        .transition()
            .style("position", "relative")
            .style("top", "")
    d3.select("#in-graph-svg")    
        .transition()
            .delay(1000)
            .style("width", "500px")
            .style("height", "330px");
    d3.select("#in-statement")
        .style("opacity", "0")
        .transition()
            .delay(1200)
            .style("display", "inline-block")
            .duration(1000)
            .style("opacity", "1");
    d3.select("#in-graph-percentage")
        .style("display", "flex")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#in-l1-misinfo-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#in-l1-reliable-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#in-l1-others-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#in-l2-misinfo-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", indirectDisplayFlag?"1":"0");
    d3.select("#in-l2-reliable-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", indirectDisplayFlag?"1":"0");
    d3.select("#in-l2-others-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", indirectDisplayFlag?"1":"0");

    d3.select("#out-l2-empty-arc")
        .transition()
            .delay(500)
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", L2EmptyArc)
    d3.select("#out-l1-empty-arc")
        .transition()
            .delay(1000)
            .attr("transform", `translate(${summaryViewCenterX}, ${summaryViewCenterY})`);
    d3.select("#out-l2-empty-arc")
        .transition()
            .delay(1000)
            .attr("transform", `translate(${summaryViewCenterX}, ${summaryViewCenterY})`);
    d3.select("#out-graph")
        .style("position", "absolute")
        .style("top", "0px")
        .transition()
            .delay(1000)
            .style("height", "330px")
            .style("top", "32px")
            .style("padding-top", "15px")
            .style("padding-bottom", "15px")
        .transition()
            .duration(800)
            .style("top", "65px")
        .transition()
            .style("position", "relative")
            .style("top", "");
    d3.select("#out-graph-svg")    
        .transition()
            .delay(1000)
            .style("width", "500px")
            .style("height", "330px");
    d3.select("#out-statement")
        .style("opacity", "0")
        .transition()
            .delay(1200)
            .style("display", "inline-block")
            .duration(1000)
            .style("opacity", "1");
    d3.select("#out-graph-percentage")
        .style("display", "flex")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#out-l1-misinfo-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#out-l1-reliable-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#out-l1-others-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#out-l2-misinfo-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", indirectDisplayFlag?"1":"0");
    d3.select("#out-l2-reliable-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", indirectDisplayFlag?"1":"0");
    d3.select("#out-l2-others-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", indirectDisplayFlag?"1":"0");
}

async function showGraphView(domainName, animation=true) {
    d3.selectAll("*").transition();
    d3.selectAll("*").interrupt();
    d3.selectAll(".graph-view-appended").remove();
    d3.select("#in-graph-window").remove();
    d3.select("#out-graph-window").remove();
    if (defaultAnimationInterval) {
        clearInterval(defaultAnimationInterval);
        inForceSimulationDone1=inForceSimulationDone2=inForceSimulationDone3=false;
        outForceSimulationDone1=outForceSimulationDone2=outForceSimulationDone3=false;
        inForceSimulation1=inForceSimulation2=inForceSimulation3=outForceSimulation1=outForceSimulation2=outForceSimulation3=null;
        defaultAnimationInterval = null;
    }

    // Basic variables
    let inStatementGraphViewDiv = d3.select("#in-statement-graph-view");
    let outStatementGraphViewDiv = d3.select("#out-statement-graph-view");
    inStatementGraphViewDiv.transition()
        .style("display", "block")
        .duration(animation?500:0)
        .style("opacity", "1");
    outStatementGraphViewDiv.transition()
        .style("display", "block")
        .duration(animation?500:0)
        .style("opacity", "1");

    d3.select("#summary-view-graph-description").transition().duration(500).style("opacity","0");
    d3.select("#graph-view-graph-description").transition().duration(500).style("opacity","1");

    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");

    d3.select("#in-graph")
        .append("div")
            .attr("id", "in-graph-window")
            .style("position", "absolute")
            .style("top", "0px")
            .style("width", "500px")
            .style("height", "430px")
            .style("pointer-events", "none");
    d3.select("#out-graph")
        .style("position", "absolute")
        .style("top", "0px")
        .append("div")
            .attr("id", "out-graph-window")
            .style("position", "absolute")
            .style("top", "0px")
            .style("width", "500px")
            .style("height", "430px")
            .style("pointer-events", "none");
    
    // Erase the existing summary view graphs
    d3.select("#in-statement")
        .transition()
        .duration(animation?500:0)
        .ease(d3.easeLinear)
        .style("display", "none");
    d3.select("#out-statement")
        .transition()
        .duration(animation?500:0)
        .ease(d3.easeLinear)
        .style("display", "none");
    d3.select("#in-graph-percentage")
        .style("display", "none");
    d3.select("#out-graph-percentage")
        .style("display", "none");

    d3.select("#in-graph")
        .transition()
        .duration(100)
        .style("width", "500px")
        .style("height", "420px")
        .style("padding-top", "0px")
        .style("padding-bottom", "0px")
        .style("position", "absolute")
        .style("top", "0px");
    d3.select("#out-graph")
        .transition()
        .duration(100)
        .style("width", "500px")
        .style("height", "420px")
        .style("padding-top", "0px")
        .style("padding-bottom", "0px")
        .style("position", "absolute")
        .style("top", "0px");
    d3.select("#in-graph-svg")
        .style("width", "420px")
        .style("height", "420px");
    d3.select("#out-graph-svg")
        .style("width", "420px")
        .style("height", "420px");
    
    d3.select("#in-l1-empty-arc")
        .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`);
    d3.select("#out-l1-empty-arc")
        .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`);

    let L2EmptyArc = d3.arc().innerRadius(170).outerRadius(200).startAngle(0).endAngle(2*Math.PI);
    d3.select("#in-l2-empty-arc")
        .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`)
        .transition()
        .duration(animation?500:0)
        .ease(d3.easeLinear)
        .attr("d", L2EmptyArc);
    d3.select("#out-l2-empty-arc")
        .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`)
        .transition()
        .duration(animation?500:0)
        .ease(d3.easeLinear)
        .attr("d", L2EmptyArc);

    // Set nodes and edges to display 
    let inTargetNode = {
        name: domainName,
        direction: "in",
        level: "l0",
        radius: 0,
        index: 0,
        label: inSummaryGraphDiv.label,
        display: true,
        fx: 0,
        fy: 0
    }
    let outTargetNode = {
        name: domainName,
        direction: "out",
        level: "l0",
        radius: 0,
        index: 0,
        label: inSummaryGraphDiv.label,
        display: true,
        fx: 0,
        fy: 0
    }
    let inL1Nodes = setNodes("in", "l1");
    let inL2Nodes = setNodes("in", "l2");
    let outL1Nodes = setNodes("out", "l1");
    let outL2Nodes = setNodes("out", "l2");
    inSummaryGraphDiv.graphViewTargetNode = inTargetNode;
    outSummaryGraphDiv.graphViewTargetNode = outTargetNode;

    let inEdges = setEdges(inL1Nodes, inL2Nodes);
    let outEdges = setEdges(outL1Nodes, outL2Nodes);

    d3.select("#in-l1-misinfo-arc").style("visibility", "hidden");
    d3.select("#in-l1-reliable-arc").style("visibility", "hidden");
    d3.select("#in-l1-others-arc").style("visibility", "hidden");
    d3.select("#in-l2-misinfo-arc").style("visibility", "hidden");
    d3.select("#in-l2-reliable-arc").style("visibility", "hidden");
    d3.select("#in-l2-others-arc").style("visibility", "hidden");
    d3.select("#out-l1-misinfo-arc").style("visibility", "hidden");
    d3.select("#out-l1-reliable-arc").style("visibility", "hidden");
    d3.select("#out-l1-others-arc").style("visibility", "hidden");
    d3.select("#out-l2-misinfo-arc").style("visibility", "hidden");
    d3.select("#out-l2-reliable-arc").style("visibility", "hidden");
    d3.select("#out-l2-others-arc").style("visibility", "hidden");

    forceGraph({"targetNode": inTargetNode, "L1Nodes": inL1Nodes, "L2Nodes": inL2Nodes}, inEdges, "in", outL1Nodes);
    forceGraph({"targetNode": outTargetNode, "L1Nodes": outL1Nodes, "L2Nodes": outL2Nodes}, outEdges, "out", inL1Nodes);
    
    let addDefaultAnimation = function() {
        let t = 500;
        animateCentralNode("in", t);
        animateCentralNode("out", t);

        d3.selectAll(".default-highlight").style("opacity", "0").transition().duration(t).style("opacity", "1");

        clearInterval(defaultAnimationInterval);
        defaultAnimationInterval = null;
        inForceSimulationDone1=inForceSimulationDone2=inForceSimulationDone3=true;
        outForceSimulationDone1=outForceSimulationDone2=outForceSimulationDone3=true;
        inForceSimulation1=inForceSimulation2=inForceSimulation3=outForceSimulation1=outForceSimulation2=outForceSimulation3=null;
    }

    defaultAnimationInterval = setInterval(function() {
        if (inForceSimulationDone1&&inForceSimulationDone2&&inForceSimulationDone3&&outForceSimulationDone1&&outForceSimulationDone2&&outForceSimulationDone3) addDefaultAnimation();
    }, 10)
}

function animateCentralNode(direction, transitionTime) {
    let centralNodeId = `${direction}-l0-bubble-0`;
    let data = d3.select(`#${centralNodeId}`).data()[0];
    let links = d3.selectAll(`.${direction}-l0-link-0`);

    let fadeOpacity = 0.5;
    d3.selectAll(`.bubble-misinformation`).transition().duration(transitionTime).style("fill", "#F6DAB9")
    d3.selectAll(`.bubble-reliable`).transition().duration(transitionTime).style("fill", "#CCBEDB")
    d3.selectAll(`.bubble-others`).transition().duration(transitionTime).style("fill", "#EFEFEF")
    d3.selectAll(`.link`).transition().duration(transitionTime).style("opacity", (d,i,x) => {return x[i].style["opacity"]=="0"?"0":fadeOpacity});

    d3.select(`#${direction}-graph-svg`)
        .append("svg")
        .attr("id", `${direction}-default-animation-gradient-svg`)
        .attr("class", `${direction}-default-highlight default-highlight graph-view-appended`)
        .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`)
        .style("pointer-events", "none")

    d3.select(`#${direction}-default-highlight-g`)
        .selectAll()
        .data(links.data())
        .join("path")
            .attr("class", `default-highlight-link ${direction}-default-highlight-link default-highlight ${direction}-default-highlight`)
            .attr("fill", "none")
            .style("stroke-width", 2.5)
            .attr("d", d=>getCurve(d))
            .style("stroke", d => {
                let sourceColor = (d.source.label=="misinformation")?MISINFORMATION_COLOR:(d.source.label=="reliable"?RELIABLE_COLOR:OTHERS_COLOR);

                let gradientId = `${direction}-default-animation-gradient-${d.source.level}-${d.source.index}-${d.target.level}-${d.target.index}`;
                let sourceX = d.source.x, sourceY = d.source.y, targetX = d.target.x, targetY = d.target.y;
                let offset = 0.25;  // 0 means source position, 1 means target position

                let highlightGradientColors = [
                    {color: "white", opacity: "0", offset: "0"}, 
                    {color: "white", opacity: "0", offset: 0.5-offset/2},
                    {color: sourceColor, opacity: "100%", offset: 0.5-0.05/2}, 
                    {color: sourceColor, opacity: "100%", offset: 0.5+0.05/2},
                    {color: "white", opacity: "0", offset: 0.5+offset/2}, 
                    {color: "white", opacity: "0", offset: 1}
                ];
                let animationStartOffset = 0.15;
                let animationEndOffset = 0.25;

                d3.select(`#${direction}-default-animation-gradient-svg`)
                    .append("linearGradient")
                        .attr("id", gradientId)
                        .attr("x1", sourceX)
                        .attr("x2", targetX)
                        .attr("y1", sourceY)
                        .attr("y2", targetY)
                        .attr("gradientUnits", "userSpaceOnUse")
                        .selectAll()
                        .data(highlightGradientColors)
                        .join("stop")
                            .attr("stop-color", c => c.color)
                            .attr("offset", c => c.offset)
                            .attr("stop-opacity", c => c.opacity);

                d3.select(`#${gradientId}`)
                    .append("animate")
                        .attr("class", "default-highlight-animate")
                        .attr("attributeName", "x1")
                        .attr("values", `${sourceX-(targetX-sourceX)*(1+animationStartOffset)};${targetX+(targetX-sourceX)*(animationEndOffset-1)}`)
                        .attr("dur", "2s")
                        .attr("restart", "always")
                        .attr("repeatCount", "indefinite");
                d3.select(`#${gradientId}`)
                    .append("animate")
                        .attr("class", "default-highlight-animate")
                        .attr("attributeName", "y1")
                        .attr("values", `${sourceY-(targetY-sourceY)*(1+animationStartOffset)};${targetY+(targetY-sourceY)*(animationEndOffset-1)}`)
                        .attr("dur", "2s")
                        .attr("restart", "always")
                        .attr("repeatCount", "indefinite");
                d3.select(`#${gradientId}`)
                    .append("animate")
                        .attr("class", "default-highlight-animate")
                        .attr("attributeName", "x2")
                        .attr("values", `${targetX-(targetX-sourceX)*animationStartOffset};${targetX+(targetX-sourceX)*(animationEndOffset+1)}`)
                        .attr("dur", "2s")
                        .attr("restart", "always")
                        .attr("repeatCount", "indefinite");
                d3.select(`#${gradientId}`)
                    .append("animate")
                        .attr("class", "default-highlight-animate")
                        .attr("attributeName", "y2")
                        .attr("values", `${targetY-(targetY-sourceY)*animationStartOffset};${targetY+(targetY-sourceY)*(animationEndOffset+1)}`)
                        .attr("dur", "2s")
                        .attr("restart", "always")
                        .attr("repeatCount", "indefinite");

                return `url(#${gradientId})`;
            })
            .style("display", d => d.source.display&&d.target.display?"":"none")
            .style("pointer-events", "none");

    d3.select(`#${direction}-default-highlight-g`)
        .selectAll()
        .data(links.data())
        .join("circle")
            .attr("class", `default-highlight-bubble ${direction}-default-highlight-bubble default-highlight ${direction}-default-highlight`)
            .attr("r", bubbleRadius)
            .attr("cx", d=>{
                if (d.source.x!=data.x||d.source.y!=data.y) return d.source.x;
                else return d.target.x;
            }) 
            .attr("cy", d => {
                if (d.source.x != data.x || d.source.y != data.y) return d.source.y;
                else return d.target.y;
            })
            .attr("fill", d => {
                let node = (d.source.x != data.x || d.source.y != data.y)?d.source:d.target;
                return node.label=="misinformation"?MISINFORMATION_COLOR:(node.label=="reliable"?RELIABLE_COLOR:OTHERS_COLOR)
            })
            .attr("pointer-events", "none")
            .style("opacity", d=>{return 1;}) 

    d3.select(`#${direction}-default-highlight-g`)
        .append("circle")
            .attr("class", `default-highlighted-bubble ${direction}-default-highlighted-bubble default-highlight ${direction}-default-highlight`)
            .attr("r", bubbleRadius)
            .attr("cx", data.x)
            .attr("cy", data.y)
            .attr("fill", data.label=="misinformation"?MISINFORMATION_COLOR:(data.label=="reliable"?RELIABLE_COLOR:OTHERS_COLOR))
            .style("stroke", "black")
            .style("stroke-width", "3px")
            .style("pointer-events", "none");
}

function setNodes(direction, level) {
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");

    let nodes = (direction=="in")?
        ((level=="l1")?inSummaryGraphDiv.inL1Domains:inSummaryGraphDiv.inL2Domains):
        ((level=="l1")?outSummaryGraphDiv.outL1Domains:outSummaryGraphDiv.outL2Domains);
    nodes = Object.entries(nodes);
    nodes.forEach((d, index) => {
        d.name = d[0];
        d.direction = direction;
        d.level = level;
        d.radius = (level=="l1")?l1CircleRadius:l2CircleRadius;
        d.index = index;
        d.label = d[1]["label"];
        d.display = (d.label=="misinformation"&&inSummaryGraphDiv.fakeDisplay)||(d.label=="reliable"&&inSummaryGraphDiv.realDisplay)||(d.label=="others"&&inSummaryGraphDiv.othersDisplay);
        d.L1In = d[1]["L1In"];
        d.L1Out = d[1]["L1Out"];
        d.L2In = d[1]["L2In"];
        d.L2Out = d[1]["L2Out"];
    });

    let overflow = (bubbleRadius*nodes.filter(d=>d.display).length) > 2 * Math.PI * (level=="l1"?l1CircleRadius:l2CircleRadius);
    nodes.forEach(d => d.overflow = overflow);
    return nodes;
}

function setEdges(L1Nodes, L2Nodes) {
    let L1Edges = [], L2Edges = [], CrossEdges = [];
    L1Nodes.forEach(d => {
        d.L1In.forEach(linkedDomainName => {
            let linkedDomainNode = L1Nodes.find(element => element.name == linkedDomainName);
            L1Edges.push({"source": linkedDomainNode, "target": d});
        })
    });
    L2Nodes.forEach(d => {
        d.L2In.forEach(linkedDomainName => {
            let linkedDomainNode = L2Nodes.find(element => element.name == linkedDomainName);
            L2Edges.push({"source": linkedDomainNode, "target": d});
        })
    });
    L1Nodes.forEach(d => {
        d.L2In.forEach(linkedDomainName => {
            let linkedDomainNode = L2Nodes.find(element => element.name == linkedDomainName);
            CrossEdges.push({"source": linkedDomainNode, "target": d});
        })
        d.L2Out.forEach(linkedDomainName => {
            let linkedDomainNode = L2Nodes.find(element => element.name == linkedDomainName);
            CrossEdges.push({"source": d, "target": linkedDomainNode});
        })
    });
    
    for (let i = 0 ; i < L1Edges.length; i++) {
        for (let j = i ; j < L1Edges.length ; j++){
            if (L1Edges[i].source.name == L1Edges[j].target.name && L1Edges[i].target.name == L1Edges[j].source.name) {
                L1Edges[i].overlap = L1Edges[j].overlap = true;
                L1Edges[i].controlAlpha = 0.8;
                L1Edges[j].controlAlpha = 1.2;
            }
        }
    }
    for (let i = 0 ; i < L2Edges.length; i++) {
        for (let j = i ; j < L2Edges.length ; j++){
            if (L2Edges[i].source.name == L2Edges[j].target.name && L2Edges[i].target.name == L2Edges[j].source.name) {
                L2Edges[i].overlap = L2Edges[j].overlap = true;
                L2Edges[i].controlAlpha = 0.8;
                L2Edges[j].controlAlpha = 1.2;
            }
        }
    }
    for (let i = 0 ; i < CrossEdges.length ; i++){
        for (let j = i ; j < CrossEdges.length; j++){
            if (CrossEdges[i].source.name == CrossEdges[j].target.name && CrossEdges[i].target.name == CrossEdges[j].source.name) {
                CrossEdges[i].overlap = CrossEdges[j].overlap = true;
                CrossEdges[i].controlAngle = -Math.PI/3;
                CrossEdges[j].controlAngle = Math.PI/3;
                CrossEdges[i].controlAlpha = 0.9;
                CrossEdges[j].controlAlpha = 1.1;
            }
        }
    }
    return {L1Edges, L2Edges, CrossEdges};
}

export function summaryViewModeChanged() {
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    inSummaryGraphDiv.normalized = !inSummaryGraphDiv.normalized;
    outSummaryGraphDiv.normalized = !outSummaryGraphDiv.normalized;

    let inL1FakeNumber = inSummaryGraphDiv.inL1FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let inL1RealNumber = inSummaryGraphDiv.inL1RealNumber * inSummaryGraphDiv.realDisplay;
    let inL1OthersNumber = inSummaryGraphDiv.inL1OthersNumber * inSummaryGraphDiv.othersDisplay;
    let inL2FakeNumber = inSummaryGraphDiv.inL2FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let inL2RealNumber = inSummaryGraphDiv.inL2RealNumber * inSummaryGraphDiv.realDisplay;
    let inL2OthersNumber = inSummaryGraphDiv.inL2OthersNumber * inSummaryGraphDiv.othersDisplay;
    let outL1FakeNumber = outSummaryGraphDiv.outL1FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let outL1RealNumber = outSummaryGraphDiv.outL1RealNumber * inSummaryGraphDiv.realDisplay;
    let outL1OthersNumber = outSummaryGraphDiv.outL1OthersNumber * inSummaryGraphDiv.othersDisplay;
    let outL2FakeNumber = outSummaryGraphDiv.outL2FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let outL2RealNumber = outSummaryGraphDiv.outL2RealNumber * inSummaryGraphDiv.realDisplay;
    let outL2OthersNumber = outSummaryGraphDiv.outL2OthersNumber * inSummaryGraphDiv.othersDisplay;
    
    drawSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber);
}

export function categorySettingChanged(event) {
    let categorySettingMisinfoCheckboxDiv = document.getElementById("category-setting-misinfo-checkbox");
    let categorySettingReliableCheckboxDiv = document.getElementById("category-setting-reliable-checkbox");
    let categorySettingOthersCheckboxDiv = document.getElementById("category-setting-others-checkbox");

    let misinfo_mask = categorySettingMisinfoCheckboxDiv.checked;
    let reliable_mask = categorySettingReliableCheckboxDiv.checked;
    let others_mask = categorySettingOthersCheckboxDiv.checked;

    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    
    inSummaryGraphDiv.fakeDisplay = misinfo_mask;
    inSummaryGraphDiv.realDisplay = reliable_mask;
    inSummaryGraphDiv.othersDisplay = others_mask;
    outSummaryGraphDiv.fakeDisplay = misinfo_mask;
    outSummaryGraphDiv.realDisplay = reliable_mask;
    outSummaryGraphDiv.othersDisplay = others_mask;

    let indirectDisplayFlag = inSummaryGraphDiv.indirectDisplay;

    let inL1FakeNumber = inSummaryGraphDiv.inL1FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let inL1RealNumber = inSummaryGraphDiv.inL1RealNumber * inSummaryGraphDiv.realDisplay;
    let inL1OthersNumber = inSummaryGraphDiv.inL1OthersNumber * inSummaryGraphDiv.othersDisplay;
    let inL2FakeNumber = inSummaryGraphDiv.inL2FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let inL2RealNumber = inSummaryGraphDiv.inL2RealNumber * inSummaryGraphDiv.realDisplay;
    let inL2OthersNumber = inSummaryGraphDiv.inL2OthersNumber * inSummaryGraphDiv.othersDisplay;
    let outL1FakeNumber = outSummaryGraphDiv.outL1FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let outL1RealNumber = outSummaryGraphDiv.outL1RealNumber * inSummaryGraphDiv.realDisplay;
    let outL1OthersNumber = outSummaryGraphDiv.outL1OthersNumber * inSummaryGraphDiv.othersDisplay;
    let outL2FakeNumber = outSummaryGraphDiv.outL2FakeNumber * inSummaryGraphDiv.fakeDisplay;
    let outL2RealNumber = outSummaryGraphDiv.outL2RealNumber * inSummaryGraphDiv.realDisplay;
    let outL2OthersNumber = outSummaryGraphDiv.outL2OthersNumber * inSummaryGraphDiv.othersDisplay;
    drawSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber);

    let inNumber = inL1FakeNumber + inL2FakeNumber * indirectDisplayFlag;
    let outNumber = outL1FakeNumber + outL2FakeNumber * indirectDisplayFlag;
    let inTotal = inL1FakeNumber + inL1RealNumber + inL1OthersNumber + (inL2FakeNumber + inL2RealNumber + inL2OthersNumber) * indirectDisplayFlag;
    let outTotal = outL1FakeNumber + outL1RealNumber + outL1OthersNumber + (outL2FakeNumber + outL2RealNumber + outL2OthersNumber) * indirectDisplayFlag;
    percentageSetting(inNumber, outNumber, inTotal, outTotal);

    if (!inSummaryGraphDiv.summaryView) {
        if (defaultAnimationInterval) clearInterval(defaultAnimationInterval);
        defaultAnimationInterval=null;
        inForceSimulationDone1=inForceSimulationDone2=inForceSimulationDone3=false;
        outForceSimulationDone1=outForceSimulationDone2=outForceSimulationDone3=false;
        stopSimulation();

        let inTargetNode = inSummaryGraphDiv.graphViewTargetNode;
        let outTargetNode = outSummaryGraphDiv.graphViewTargetNode;
        let inL1Nodes = setNodes("in", "l1");
        let inL2Nodes = setNodes("in", "l2");
        let outL1Nodes = setNodes("out", "l1");
        let outL2Nodes = setNodes("out", "l2");

        let inEdges = setEdges(inL1Nodes, inL2Nodes);
        let outEdges = setEdges(outL1Nodes, outL2Nodes);

        d3.selectAll(".graph-view-appended").remove();

        forceGraph({"targetNode": inTargetNode, "L1Nodes": inL1Nodes, "L2Nodes": inL2Nodes}, inEdges, "in", outL1Nodes);
        forceGraph({"targetNode": outTargetNode, "L1Nodes": outL1Nodes, "L2Nodes": outL2Nodes}, outEdges, "out", inL1Nodes);

        defaultAnimationInterval = setInterval(function() {
            if (inForceSimulationDone1&&inForceSimulationDone2&&inForceSimulationDone3&&outForceSimulationDone1&&outForceSimulationDone2&&outForceSimulationDone3) addDefaultAnimation();
        }, 10)
    }

    let addDefaultAnimation = function() {
        let t = 500;
        animateCentralNode("in", t);
        animateCentralNode("out", t);

        d3.selectAll(".default-highlight").style("opacity", "0").transition().duration(t).style("opacity", "1");

        clearInterval(defaultAnimationInterval);
        defaultAnimationInterval = null;
        inForceSimulationDone1=inForceSimulationDone2=inForceSimulationDone3=true;
        outForceSimulationDone1=outForceSimulationDone2=outForceSimulationDone3=true;
    }

}

function drawSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber) {
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let directionSettingCheckboxInput = document.getElementById("direction-setting-checkbox");

    let outLinkDisplayFlag = directionSettingCheckboxInput.checked;
    let normliazedFlag = inSummaryGraphDiv.normalized;
    let indirectDisplayFlag = inSummaryGraphDiv.indirectDisplay;

    if (normliazedFlag) drawNormalizedSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber);
    else drawAbsoluteSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber, indirectDisplayFlag, outLinkDisplayFlag);

}

function drawNormalizedSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber) {
    let inL1FakeRate, inL1RealRate, inL1OthersRate, inL2FakeRate, inL2RealRate, inL2OthersRate, outL1FakeRate, outL1RealRate, outL1OthersRate, outL2FakeRate, outL2RealRate, outL2OthersRate;
    inL1FakeRate = inL1RealRate = inL1OthersRate = inL2FakeRate = inL2RealRate = inL2OthersRate = outL1FakeRate = outL1RealRate = outL1OthersRate = outL2FakeRate = outL2RealRate = outL2OthersRate = 0;

    if ((inL1FakeNumber + inL1RealNumber + inL1OthersNumber) > 0) {
        inL1FakeRate = inL1FakeNumber / (inL1FakeNumber + inL1RealNumber + inL1OthersNumber);
        inL1RealRate = inL1RealNumber / (inL1FakeNumber + inL1RealNumber + inL1OthersNumber);
        inL1OthersRate = inL1OthersNumber / (inL1FakeNumber + inL1RealNumber + inL1OthersNumber);
    }
    if ((inL2FakeNumber + inL2RealNumber + inL2OthersNumber) > 0) {
        inL2FakeRate = inL2FakeNumber / (inL2FakeNumber + inL2RealNumber + inL2OthersNumber);
        inL2RealRate = inL2RealNumber / (inL2FakeNumber + inL2RealNumber + inL2OthersNumber);
        inL2OthersRate = inL2OthersNumber / (inL2FakeNumber + inL2RealNumber + inL2OthersNumber);
    }
    if ((outL1FakeNumber + outL1RealNumber + outL1OthersNumber) > 0) {
        outL1FakeRate = outL1FakeNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        outL1RealRate = outL1RealNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        outL1OthersRate = outL1OthersNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
    }
    if ((outL2FakeNumber + outL2RealNumber + outL2OthersNumber) > 0) {
        outL2FakeRate = outL2FakeNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        outL2RealRate = outL2RealNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        outL2OthersRate = outL2OthersNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
    }

    drawGraphs(inL1FakeRate, inL1RealRate, inL1OthersRate, inL2FakeRate, inL2RealRate, inL2OthersRate, outL1FakeRate, outL1RealRate, outL1OthersRate, outL2FakeRate, outL2RealRate, outL2OthersRate);
}

function drawAbsoluteSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber, indirectDisplayFlag, outLinkDisplayFlag) {
    let inL1FakeRate = inL1FakeNumber / 100;
    let inL1RealRate = inL1RealNumber / 100;
    let inL1OthersRate = inL1OthersNumber / 100;
    let inL2FakeRate = inL2FakeNumber / 100;
    let inL2RealRate = inL2RealNumber / 100;
    let inL2OthersRate = inL2OthersNumber / 100;
    let outL1FakeRate = outL1FakeNumber / 100;
    let outL1RealRate = outL1RealNumber / 100
    let outL1OthersRate = outL1OthersNumber / 100;
    let outL2FakeRate = outL2FakeNumber / 100;
    let outL2RealRate = outL2RealNumber / 100;
    let outL2OthersRate = outL2OthersNumber / 100; 

    let alertFlag = false;
    let summaryViewFlag = document.getElementById("in-summary-graph").summaryView;
    let alertString = "The number of domains that ";

    if (inL1FakeRate + inL1RealRate + inL1OthersRate > 1) {
        inL1FakeRate = inL1FakeNumber / (inL1FakeNumber + inL1RealNumber + inL1OthersNumber);
        inL1RealRate = inL1RealNumber / (inL1FakeNumber + inL1RealNumber + inL1OthersNumber);
        inL1OthersRate = inL1OthersNumber / (inL1FakeNumber + inL1RealNumber + inL1OthersNumber);
        alertString += "directly mention " + domainName;
        alertFlag = true;
    }
    if (inL2FakeRate + inL2RealRate + inL2OthersRate > 1) {
        inL2FakeRate = inL2FakeNumber / (inL2FakeNumber + inL2RealNumber + inL2OthersNumber);
        inL2RealRate = inL2RealNumber / (inL2FakeNumber + inL2RealNumber + inL2OthersNumber);
        inL2OthersRate = inL2OthersNumber / (inL2FakeNumber + inL2RealNumber + inL2OthersNumber);
        if (indirectDisplayFlag) {
            if (alertFlag) alertString += ", ";
            alertString += "indirectly mention " + domainName;
            alertFlag = true;
        }
    }
    if (outL1FakeRate + outL1RealRate + outL1OthersRate > 1) {
        outL1FakeRate = outL1FakeNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        outL1RealRate = outL1RealNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        outL1OthersRate = outL1OthersNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        if (outLinkDisplayFlag) {
            if (alertFlag) alertString += ", ";
            alertString += domainName + " directly mentions";
            alertFlag = true;
        }
    }
    if (outL2FakeRate + outL2RealRate + outL2OthersRate > 1) {
        outL2FakeRate = outL2FakeNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        outL2RealRate = outL2RealNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        outL2OthersRate = outL2OthersNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        if (indirectDisplayFlag && outLinkDisplayFlag) {
            if (alertFlag && indirectDisplayFlag) alertString += ", ";
            alertString += domainName + " indirectly mentions";
            alertFlag = true;
        }
    }

    alertString += " exceed 100. Normalized view is displayed for those cases.";

    drawGraphs(inL1FakeRate, inL1RealRate, inL1OthersRate, inL2FakeRate, inL2RealRate, inL2OthersRate, outL1FakeRate, outL1RealRate, outL1OthersRate, outL2FakeRate, outL2RealRate, outL2OthersRate);

    if (alertFlag && summaryViewFlag) alert(alertString);
}

function drawGraphs(inL1FakeRate, inL1RealRate, inL1OthersRate, inL2FakeRate, inL2RealRate, inL2OthersRate, outL1FakeRate, outL1RealRate, outL1OthersRate, outL2FakeRate, outL2RealRate, outL2OthersRate) {
    let inL1FakeArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(0).endAngle(inL1FakeRate*2*Math.PI);
    let inL1RealArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(inL1FakeRate*2*Math.PI).endAngle((inL1FakeRate+inL1RealRate)*2*Math.PI);
    let inL1OthersArc = d3.arc().innerRadius(100).outerRadius(125).startAngle((inL1FakeRate+inL1RealRate)*2*Math.PI).endAngle((inL1FakeRate+inL1RealRate+inL1OthersRate)*2*Math.PI);
    let inL2FakeArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(inL2FakeRate*360*Math.PI/180);
    let inL2RealArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(inL2FakeRate*2*Math.PI).endAngle((inL2FakeRate+inL2RealRate)*2*Math.PI);
    let inL2OthersArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle((inL2FakeRate+inL2RealRate)*2*Math.PI).endAngle((inL2FakeRate+inL2RealRate+inL2OthersRate)*2*Math.PI);
    let outL1FakeArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(0).endAngle(outL1FakeRate*2*Math.PI);
    let outL1RealArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(outL1FakeRate*2*Math.PI).endAngle((outL1FakeRate+outL1RealRate)*2*Math.PI);
    let outL1OthersArc = d3.arc().innerRadius(100).outerRadius(125).startAngle((outL1FakeRate+outL1RealRate)*2*Math.PI).endAngle((outL1FakeRate+outL1RealRate+outL1OthersRate)*2*Math.PI);
    let outL2FakeArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(outL2FakeRate*2*Math.PI);
    let outL2RealArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(outL2FakeRate*2*Math.PI).endAngle((outL2FakeRate+outL2RealRate)*2*Math.PI);
    let outL2OthersArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle((outL2FakeRate+outL2RealRate)*2*Math.PI).endAngle((outL2FakeRate+outL2RealRate+outL2OthersRate)*2*Math.PI);

    d3.select("#in-l1-misinfo-arc").attr("d", inL1FakeArc);
    d3.select("#in-l1-reliable-arc").attr("d", inL1RealArc);
    d3.select("#in-l1-others-arc").attr("d", inL1OthersArc);
    d3.select("#in-l2-misinfo-arc").attr("d", inL2FakeArc);
    d3.select("#in-l2-reliable-arc").attr("d", inL2RealArc);
    d3.select("#in-l2-others-arc").attr("d", inL2OthersArc);
    d3.select("#out-l1-misinfo-arc").attr("d", outL1FakeArc);
    d3.select("#out-l1-reliable-arc").attr("d", outL1RealArc);
    d3.select("#out-l1-others-arc").attr("d", outL1OthersArc);
    d3.select("#out-l2-misinfo-arc").attr("d", outL2FakeArc);
    d3.select("#out-l2-reliable-arc").attr("d", outL2RealArc);
    d3.select("#out-l2-others-arc").attr("d", outL2OthersArc);
}

export function levelSettingDirectCheckboxFunction() {
    d3.selectAll(".l2-arc")
        .transition()
            .duration(700)
            .style("opacity", "0")
    d3.selectAll(".in-l2-bubble")
        .transition()
            .duration(700)
            .style("opacity", "0")
    d3.selectAll(".in-l2-link")
        .transition()
            .duration(700)
            .style("opacity", "0")
    d3.selectAll(".out-l2-bubble")
        .transition()
            .duration(700)
            .style("opacity", "0")
    d3.selectAll(".out-l2-link")
        .transition()
            .duration(700)
            .style("opacity", "0")
    
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    inSummaryGraphDiv.indirectDisplay = false;
    outSummaryGraphDiv.indirectDisplay = false;

    let inNumber, outNumber;
    let label = inSummaryGraphDiv.label;
    
    if (label == "misinformation") {
        inNumber = inSummaryGraphDiv.inL1FakeNumber;
        outNumber = outSummaryGraphDiv.outL1FakeNumber;
    }
    else if (label == "reliable") {
        inNumber = inSummaryGraphDiv.inL1RealNumber;
        outNumber = outSummaryGraphDiv.outL1RealNumber;
    }
    statementTextSetting(label, false, inNumber, outNumber);

    inNumber = inSummaryGraphDiv.inL1FakeNumber * inSummaryGraphDiv.fakeDisplay;
    outNumber = outSummaryGraphDiv.outL1FakeNumber * outSummaryGraphDiv.fakeDisplay;
    let inTotal = inSummaryGraphDiv.inL1FakeNumber * inSummaryGraphDiv.fakeDisplay + 
                  inSummaryGraphDiv.inL1RealNumber * inSummaryGraphDiv.realDisplay + 
                  inSummaryGraphDiv.inL1OthersNumber * inSummaryGraphDiv.othersDisplay;
    let outTotal = outSummaryGraphDiv.outL1FakeNumber * outSummaryGraphDiv.fakeDisplay + 
                   outSummaryGraphDiv.outL1RealNumber * outSummaryGraphDiv.realDisplay + 
                   outSummaryGraphDiv.outL1OthersNumber * outSummaryGraphDiv.othersDisplay;
    percentageSetting(inNumber, outNumber, inTotal, outTotal);
}

export function levelSettingIndirectCheckboxFunction() {
    d3.selectAll(".l2-arc")
        .style("display", "inline-block")
        .transition()
            .duration(700)
            .style("opacity", "1");
    d3.selectAll(".in-l2-bubble")
        .style("display", d => (d.display)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", d => d.display?"1":"0");
    d3.selectAll(".in-l2-link")
        .style("display", d => {
            let source = d.source, target = d.target;
            let categoryDisplay = source.display&&target.display;
            let overflow = source.overflow||target.overflow;
            return (categoryDisplay&&!overflow)?"":"none";
        })
        .transition()
            .duration(700)
            .style("opacity", d => {
                let source = d.source, target = d.target;
                let categoryDisplay = source.display&&target.display;
                let overflow = source.overflow||target.overflow;
                return (categoryDisplay&&!overflow)?"1":"0";
            });
    d3.selectAll(".out-l2-bubble")
        .style("display", d => d.display?"":"none")
        .transition()
            .duration(700)
            .style("opacity", d => (d.display)?"1":"0");
    d3.selectAll(".out-l2-link")
        .style("display", d => {
            let source = d.source, target = d.target;
            let categoryDisplay = source.display&&target.display;
            let overflow = source.overflow||target.overflow;
            return (categoryDisplay&&!overflow)?"":"none";
        })
        .transition()
            .duration(700)
            .style("opacity", d => {
                let source = d.source, target = d.target;
                let categoryDisplay = source.display&&target.display;
                let overflow = source.overflow||target.overflow;
                return (categoryDisplay&&!overflow)?"1":"0";
            });

    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    inSummaryGraphDiv.indirectDisplay = true;
    outSummaryGraphDiv.indirectDisplay = true;

    let inNumber, outNumber;
    let label = inSummaryGraphDiv.label;
    if (label == "misinformation") {
        inNumber = inSummaryGraphDiv.inL1FakeNumber + inSummaryGraphDiv.inL2FakeNumber;
        outNumber = outSummaryGraphDiv.outL1FakeNumber + outSummaryGraphDiv.outL2FakeNumber;
    }
    else if (label == "reliable") {
        inNumber = inSummaryGraphDiv.inL1RealNumber + inSummaryGraphDiv.inL2RealNumber;
        outNumber = outSummaryGraphDiv.outL1RealNumber + outSummaryGraphDiv.outL2RealNumber;
    }
    statementTextSetting(label, true, inNumber, outNumber);

    let inTotal = inSummaryGraphDiv.inL1FakeNumber * inSummaryGraphDiv.fakeDisplay + 
                  inSummaryGraphDiv.inL1RealNumber * inSummaryGraphDiv.realDisplay + 
                  inSummaryGraphDiv.inL1OthersNumber * inSummaryGraphDiv.othersDisplay +
                  inSummaryGraphDiv.inL2FakeNumber * inSummaryGraphDiv.fakeDisplay + 
                  inSummaryGraphDiv.inL2RealNumber * inSummaryGraphDiv.realDisplay + 
                  inSummaryGraphDiv.inL2OthersNumber * inSummaryGraphDiv.othersDisplay;
    let outTotal = outSummaryGraphDiv.outL1FakeNumber * outSummaryGraphDiv.fakeDisplay + 
                  outSummaryGraphDiv.outL1RealNumber * outSummaryGraphDiv.realDisplay + 
                  outSummaryGraphDiv.outL1OthersNumber * outSummaryGraphDiv.othersDisplay +
                  outSummaryGraphDiv.outL2FakeNumber * outSummaryGraphDiv.fakeDisplay + 
                  outSummaryGraphDiv.outL2RealNumber * outSummaryGraphDiv.realDisplay + 
                  outSummaryGraphDiv.outL2OthersNumber * outSummaryGraphDiv.othersDisplay;

    inNumber = inSummaryGraphDiv.inL1FakeNumber * inSummaryGraphDiv.fakeDisplay +
               inSummaryGraphDiv.inL2FakeNumber * inSummaryGraphDiv.fakeDisplay;
    outNumber = outSummaryGraphDiv.outL1FakeNumber * outSummaryGraphDiv.fakeDisplay +
                outSummaryGraphDiv.outL2FakeNumber * outSummaryGraphDiv.fakeDisplay;

    percentageSetting(inNumber, outNumber, inTotal, outTotal);
}

function statementTextSetting(label, indirectDisplay, inNumber, outNumber) {
    let inStatementFirstRowDiv = document.getElementById("in-statement-first-row");
    let inStatementSecondRowDiv = document.getElementById("in-statement-second-row");
    let outStatementSecondRowDiv = document.getElementById("out-statement-second-row");
    let outStatementThirdRowDiv = document.getElementById("out-statement-third-row");

    let l = (label=="reliable")?"verified":"controversial";

    if (indirectDisplay) {
        inStatementSecondRowDiv.innerText = "";
        outStatementSecondRowDiv.innerText = "";
    }
    else {
        inStatementSecondRowDiv.innerText = "";
        outStatementSecondRowDiv.innerText = "";
    }

    if (inNumber <= 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + l + " website";  
        inStatementSecondRowDiv.innerText += " is mentioning";
    }
    else if (inNumber > 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + l + " websites";  
        inStatementSecondRowDiv.innerText += " are mentioning";
    }
    if (outNumber <= 1) {
        outStatementSecondRowDiv.innerText += " is mentioning";
        outStatementThirdRowDiv.innerText = String(outNumber) + " " + l + " website";  
    }
    else if (outNumber > 1) {
        outStatementSecondRowDiv.innerText += " are mentioning";
        outStatementThirdRowDiv.innerText = String(outNumber) + " " + l + " websites";  
    } 
}

function percentageSetting(inNumber, outNumber, inTotal, outTotal) {
    let inGraphPercentageDiv = document.getElementById("in-graph-percentage");
    let outGraphPercentageDiv = document.getElementById("out-graph-percentage");
    
    if (inTotal == 0) inGraphPercentageDiv.innerText = "0%";
    else inGraphPercentageDiv.innerText = String(Math.round(1000*inNumber/inTotal)/10) + "%";
    
    if (outTotal == 0) outGraphPercentageDiv.innerText = "0%";
    else outGraphPercentageDiv.innerText = String(Math.round(1000*outNumber/outTotal)/10) + "%";
}

export function levelCheckboxFunction() {
    this.checked?levelSettingIndirectCheckboxFunction():levelSettingDirectCheckboxFunction();
}

export function directionCheckboxFunction() {
    this.checked?showOutgoingDirectionGraph():hideOutgoingDirectionGraph();
}

function showOutgoingDirectionGraph() {
    let t = d3.transition().duration(700);

    d3.select("#contents").transition(t).style("width", "1002px");
    d3.select("#main-window-container").transition(t).style("width", "1002px");
    d3.select("#main").transition(t).style("width", "900px");
    d3.select("#header").transition(t).style("width", "980px");
    d3.select("#domain-search-bar-header").transition(t).style("width", "980px");
    d3.select("#domain-search-list").transition(t).style("width", "980px");
    d3.select("#setting").transition(t).style("width", "950px");

    d3.select("#in-summary-graph")
        .transition()
            .delay(700)
            .duration(1200)
            .style("left", "-250px")

    d3.select("#out-summary-graph")
    .transition()
        .delay(800)
        .duration(1100)
        .style("position", "absolute")
        .style("left", "500px")
        .style("display", "inline-block")
        .style("opacity", "1");

    d3.select("#twitter")
        .transition(t)
        .style("left", "992px");
}

function hideOutgoingDirectionGraph() {
    d3.select("#out-summary-graph")
    .transition()
        .duration(1100)
        .style("opacity", "0")
    .transition()
        .style("display", "none")
        .style("position", "")
        .style("left", "");

    let t = d3.transition().delay(500).duration(1000);
    
    d3.select("#in-summary-graph").transition(t).style("left", "0px").transition().style("position", "relative");
    d3.select("#contents").transition(t).style("width", "702px");
    d3.select("#main-window-container").transition(t).style("width", "702px");
    d3.select("#main").transition(t).style("width", "600px");
    d3.select("#header").transition(t).style("width", "680px");
    d3.select("#setting").transition(t).style("width", "650px");
    d3.select("#domain-search-bar-header").transition(t).style("width", "680px");
    d3.select("#domain-search-list").transition(t).style("width", "680px");

    d3.select("#twitter")
        .transition(t)
        .style("left", "692px");
}

function forceGraph(nodes, links, direction, oppositeDirectionL1Nodes) {
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    let indirectDisplayFlag = (direction=="in")?inSummaryGraphDiv.indirectDisplay:outSummaryGraphDiv.indirectDisplay;
    
    // Concatenate all the node data and link data
    let nodes_data = [nodes["targetNode"]].concat(nodes["L1Nodes"]).concat(nodes["L2Nodes"]);
    let links_data = [];

    if (direction == "in") nodes["L1Nodes"].forEach(d => {
        if (oppositeDirectionL1Nodes.map(domain => domain[0]).includes(d[0])) {
            links_data.push({source: nodes["targetNode"], target: d, link_force: 0, overlap: true, controlAngle: -Math.PI/6, controlAlpha: 0.9});
            links_data.push({source: d, target: nodes["targetNode"], link_force: 0, overlap: true, controlAngle: Math.PI/6, controlAlpha: 1.1});
        }
        else links_data.push({source: d, target: nodes["targetNode"], link_force: 0, overlap: false});
    });
    else if (direction == "out") nodes["L1Nodes"].forEach(d => {
        if (oppositeDirectionL1Nodes.map(domain => domain[0]).includes(d[0])) {
            links_data.push({source: d, target: nodes["targetNode"], link_force: 0, overlap: true, controlAngle: -Math.PI/6, controlAlpha: 0.9});
            links_data.push({source: nodes["targetNode"], target: d, link_force: 0, overlap: true, controlAngle: Math.PI/6, controlAlpha: 1.1});
        }
        else links_data.push({source: nodes["targetNode"], target: d, link_force: 0, overlap: false})
    });
    links["L1Edges"].forEach(l => {l["link_force"]=1; links_data.push(l);});
    links["L2Edges"].forEach(l => {l["link_force"]=1; links_data.push(l);});
    links["CrossEdges"].forEach(l => {l["link_force"]=1; links_data.push(l);});

    const link = d3
        .select("#"+direction+"-graph-svg")
        .append("g")
            .attr("class", `${direction}-lines-graph-view graph-view-appended`)
            .attr("transform", "translate("+graphViewCenterX+","+graphViewCenterY+")")
        .selectAll()
            .data(links_data.filter(d => d.source.display && d.target.display))
            .join("path")
                .attr("class", d => `link ${direction}-${d.source.level}-link-${d.source.index} ${direction}-${d.target.level}-link-${d.target.index} ${direction}-${d.source.level}-link ${direction}-${d.target.level}-link`)
                .attr("id", d => `${direction}-link-${d.source.level}-${d.source.index}-${d.target.level}-${d.target.index}`)
                .attr("fill", "none")
                .attr("stroke", d => `url(#line-gradient-${direction}-${d.source.level}-${d.source.index}-${d.target.level}-${d.target.index})`)
                .attr("stroke-width", 2)
                .style("display", d=>((d.source.level!="l2"&&d.target.level!="l2")||indirectDisplayFlag)?"":"none")
                .style("opacity", d=>((d.source.level!="l2"&&d.target.level!="l2")||indirectDisplayFlag)?"1":"0");

    d3.select(`#${direction}-graph-svg`)
        .append("svg")
            .attr("id", `${direction}-graph-gradient-svg`)
            .attr("class", "graph-view-appended")
            .attr("transform", "translate("+graphViewCenterX+","+graphViewCenterY+")")
        .selectAll()
            .data(link.data())
                .join("linearGradient")
                    .attr("id", d => `line-gradient-${direction}-${d.source.level}-${d.source.index}-${d.target.level}-${d.target.index}`)
                    .attr("class", `${direction}-graph-link-gradient graph-view-appended`)
                    .attr("gradientUnits", "userSpaceOnUse")
                .selectAll("stop")
                .data([
                    {offset: "0%", color: "#000000", opacity: "6%"},
                    {offset: "100%", color: "#000000", opacity: "17%"}
                ])
                .enter()
                .append("stop")
                    .attr("offset", d => d.offset)
                    .attr("stop-color", d => d.color)
                    .attr("stop-opacity", d => d.opacity)
    
    const node = d3
        .select("#"+direction+"-graph-svg")
        .append("g")
            .attr("class", direction+"-nodes-graph-view graph-view-appended")    
            .attr("transform", "translate("+graphViewCenterX+","+graphViewCenterY+")")
        .selectAll()
            .data(nodes_data.filter(d => d.display))
            .join("circle")
                .attr("class", d => `bubble ${direction}-${d.level}-bubble bubble-${d.label}`)
                .attr("id", d => `${direction}-${d.level}-bubble-${d.index}`)
                .attr("r", bubbleRadius)
                .attr("fill", d => d.label=="misinformation"?MISINFORMATION_COLOR:(d.label=="reliable"?RELIABLE_COLOR:OTHERS_COLOR))
                .style("display", d=>(d.level!="l2"||indirectDisplayFlag)?"":"none")
                .style("opacity", d=>(d.level!="l2"||indirectDisplayFlag)?"1":"0")
                .on("mouseover", bubbleMouseOver)
                .on("mouseout", bubbleMouseOut);
    
    d3.select(`#${direction}-graph-svg`)
        .append("g")
            .attr("id", `${direction}-highlight-g`)
            .attr("class", "graph-view-appended")
            .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`);

    d3.select(`#${direction}-graph-svg`)
        .append("g")
            .attr("id", `${direction}-default-highlight-g`)
            .attr("class", `graph-view-appended ${direction}-default-highlight default-highlight`)
            .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`);

    let bubblePadding = 4;
    let fenceRadius = 30;

    nodes_data.forEach(d => d.r = bubbleRadius+bubblePadding);

    let dummy_data_l1 = [{name: "InnerCircle", r: 104.5-bubblePadding, fx: 0, fy: 0},]
    let dummy_data_l2 = [{name: "InnerCircle", r: 177-bubblePadding, fx: 0, fy: 0},]

    for (let i = 0 ; i < 360 ; i ++) {
        dummy_data_l1.push({
            name: `CrossCircle${i}`,
            r: fenceRadius, 
            fx: (120.5+bubblePadding+fenceRadius)*Math.cos(i/180*Math.PI),
            fy: (120.5+bubblePadding+fenceRadius)*Math.sin(i/180*Math.PI),
        })
    }

    for (let i = 0 ; i < 360 ; i ++) {
        dummy_data_l2.push({
            name: `CrossCircle${i}`,
            r: fenceRadius, 
            fx: (193+bubblePadding+fenceRadius)*Math.cos(i/180*Math.PI),
            fy: (193+bubblePadding+fenceRadius)*Math.sin(i/180*Math.PI),
        })
    }

    d3.select("#"+direction+"-graph-svg")
        .append("g")
            .attr("transform", "translate("+graphViewCenterX+","+graphViewCenterY+")")
            .attr("id", `#${direction}-graph-dummy-1-g`)
            .attr("class", "graph-view-appended")
        .selectAll()
            .data(dummy_data_l1)
            .join("circle")
                .attr("r", d=>d.r)
                .attr("cx", d=>d.fx)
                .attr("cy", d=>d.fy)
                .attr("fill", "red")
                .attr("opacity", 0.)
                .style("pointer-events", "none");
    d3.select("#"+direction+"-graph-svg")
        .append("g")
            .attr("transform", "translate("+graphViewCenterX+","+graphViewCenterY+")")
            .attr("id", `#${direction}-graph-dummy-2-g`)
            .attr("class", "graph-view-appended")
        .selectAll()
            .data(dummy_data_l2)
            .join("circle")
                .attr("r", d=>d.r)
                .attr("cx", d=>d.fx)
                .attr("cy", d=>d.fy)
                .attr("fill", "red")
                .attr("opacity", 0.)
                .style("pointer-events", "none");

    let displayedL1Nodes = nodes["L1Nodes"].filter(d=>d.display);
    let displayedL2Nodes = nodes["L2Nodes"].filter(d=>d.display);
    let l1Overflow = 2*Math.PI*l1CircleRadius < 2*bubbleRadius*displayedL1Nodes.length;
    let l2Overflow = 2*Math.PI*l2CircleRadius < 2*bubbleRadius*displayedL2Nodes.length;
    
    // Overflow handling: When there are excessive number of nodes
    if (l1Overflow){
        for (let i = 0 ; i < displayedL1Nodes.length ; i++){
            let theta = 2 * Math.PI * i / displayedL1Nodes.length;
            displayedL1Nodes[i].fx = l1CircleRadius * Math.sin(theta);
            displayedL1Nodes[i].fy = -l1CircleRadius * Math.cos(theta);
        }
    }
    if (l2Overflow){
        for (let i = 0 ; i < displayedL2Nodes.length ; i++){
            let theta = 2 * Math.PI * i / displayedL2Nodes.length;
            displayedL2Nodes[i].fx = l2CircleRadius * Math.sin(theta);
            displayedL2Nodes[i].fy = -l2CircleRadius * Math.cos(theta);
        }
    }

    // force simulation
    if (direction == "in") inForceSimulation1 = 
        d3.forceSimulation(nodes_data.filter(d=>d.display))
            .force("charge", d3.forceManyBody().strength(-40))
            .force("r", d3.forceRadial(d => d.level=="l0"?0:(d.level=="l1"?l1CircleRadius:l2CircleRadius)).strength(1))
            .force("link", d3.forceLink(links_data.filter(l => l["link_force"] > 0)).strength(0.7))
            .on("tick", tickActions)
            .alphaDecay(0.05)
            .on("end", () => {
                if (direction=="in") inForceSimulationDone1 = true;
                else if (direction=="out") outForceSimulationDone1 = true;
            })
    else outForceSimulation1 = 
        d3.forceSimulation(nodes_data.filter(d=>d.display))
            .force("charge", d3.forceManyBody().strength(-40))
            .force("r", d3.forceRadial(d => d.level=="l0"?0:(d.level=="l1"?l1CircleRadius:l2CircleRadius)).strength(1))
            .force("link", d3.forceLink(links_data.filter(l => l["link_force"] > 0)).strength(0.7))
            .on("tick", tickActions)
            .alphaDecay(0.05)
            .on("end", () => {
                if (direction=="in") inForceSimulationDone1 = true;
                else if (direction=="out") outForceSimulationDone1 = true;
            })

    if (direction == "in") inForceSimulation2 =
        d3.forceSimulation(nodes["L1Nodes"].filter(d=>d.display).concat(dummy_data_l1))
            .force("collision", d3.forceCollide(d => d.r).strength(0.5))
            .on("tick", tickActions)
            .alphaDecay(0.05)
            .on("end", () => {
                if (direction=="in") inForceSimulationDone2 = true;
                else if (direction=="out") outForceSimulationDone2 = true;
            })
    else outForceSimulation2 =
        d3.forceSimulation(nodes["L1Nodes"].filter(d=>d.display).concat(dummy_data_l1))
                .force("collision", d3.forceCollide(d => d.r).strength(0.5))
                .on("tick", tickActions)
                .alphaDecay(0.05)
                .on("end", () => {
                    if (direction=="in") inForceSimulationDone2 = true;
                    else if (direction=="out") outForceSimulationDone2 = true;
                })

    if (direction == "in") inForceSimulation3 =
        d3.forceSimulation(nodes["L2Nodes"].filter(d=>d.display).concat(dummy_data_l2))
            .force("collision", d3.forceCollide(d => d.r).strength(0.5))
            .on("tick", tickActions)
            .alphaDecay(0.05)
            .on("end", () => {
                if (direction=="in") inForceSimulationDone3 = true;
                else if (direction=="out") outForceSimulationDone3 = true;
            })
    else outForceSimulation3 =
        d3.forceSimulation(nodes["L2Nodes"].filter(d=>d.display).concat(dummy_data_l2))
            .force("collision", d3.forceCollide(d => d.r).strength(0.5))
            .on("tick", tickActions)
            .alphaDecay(0.05)
            .on("end", () => {
                if (direction=="in") inForceSimulationDone3 = true;
                else if (direction=="out") outForceSimulationDone3 = true;
            })

    function tickActions() {
        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
        link.attr("d", d => getCurve(d));
        d3.selectAll(`.${direction}-graph-link-gradient`)
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
    }

}

function getCurve (d) {
    let offset = 0.
    let destinationX = (1-offset)*d.target.x + offset*d.source.x;
    let destinationY = (1-offset)*d.target.y + offset*d.source.y;
    if (d.source.level == d.target.level) {
        let controlAlpha = d.overlap?d.controlAlpha:((d.source.level=="l1")?0.8:1.2);
        let control1x = d.source.x * controlAlpha;
        let control1y = d.source.y * controlAlpha;
        let control2x = destinationX * controlAlpha;
        let control2y = destinationY * controlAlpha;
        return `M ${d.source.x},${d.source.y} C${control1x}, ${control1y}, ${control2x}, ${control2y}, ${destinationX},${destinationY}`;
    }
    else {
        if (d.overlap) {
            let controlAlpha = d.controlAlpha;
            let dx = d.target.x - d.source.x, dy = d.target.y - d.source.y;
            let theta = Math.atan2(dx, -dy), l = Math.sqrt(dx*dx+dy*dy);
            theta = theta + d.controlAngle;
            let newX = l*Math.sin(theta), newY = -l*Math.cos(theta);
            newX = newX + d.source.x, newY = newY + d.source.y;
            let control1x = newX * (1-controlAlpha) + d.source.x * controlAlpha;
            let control1y = newY * (1-controlAlpha) + d.source.y * controlAlpha;
            let control2x = newX * (1-controlAlpha) + d.target.x * controlAlpha;
            let control2y = newY * (1-controlAlpha) + d.target.y * controlAlpha;
            return `M ${d.source.x},${d.source.y} C${control1x}, ${control1y}, ${control2x}, ${control2y}, ${destinationX},${destinationY}`;
        }
        else return d3.line()([[d.source.x, d.source.y], [destinationX, destinationY]]);
    }
}

function bubbleMouseOver(e) {
    if (d3.select(e.target).style("opacity")=="0") return;
    if (!inForceSimulationDone1||!inForceSimulationDone2||!inForceSimulationDone3||!outForceSimulationDone1||!outForceSimulationDone2||!outForceSimulationDone3) return;

    let data = d3.select(e.target).data()[0];
    let links = d3.selectAll(`.${data.direction}-${data.level}-link-${data.index}`);

    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    let indirectDisplayFlag = (data.direction=="in")?inSummaryGraphDiv.indirectDisplay:outSummaryGraphDiv.indirectDisplay;

    if (e.target.id != "in-l0-bubble-0" && e.target.id != "out-l0-bubble-0") {
        d3.selectAll(".default-highlight").style("display", "none");

        // reset everything
        d3.selectAll("linearGradient")
            .selectAll(".gradient-stop-changed-by-highlight")
                .data([
                    {offset: "0%", color: "#000000", opacity: "6%"},
                    {offset: "100%", color: "#000000", opacity: "17%"}
                ])
                .attr("offset", d => d.offset)
                .attr("stop-color", d => d.color)
                .attr("stop-opacity", d => d.opacity)
                .attr("class", "")
        d3.selectAll(".highlighted-link").remove();
        d3.select("#highlighted-domain-name").remove();
        d3.select("#highlight-gradient-svg").remove();
        d3.selectAll(".highlighted-bubble").remove();
        d3.selectAll(".bubble-misinformation").style("fill", MISINFORMATION_COLOR);
        d3.selectAll(".bubble-reliable").style("fill", RELIABLE_COLOR);
        d3.selectAll(".bubble-others").style("fill", OTHERS_COLOR);
        d3.selectAll(".link").style("opacity", (d,i,x) => x[i].style["opacity"]=="0"?"0":"1");

        let fadeOpacity = 0.5
        d3.selectAll(`.bubble-misinformation`).style("fill", "#F6DAB9")
        d3.selectAll(`.bubble-reliable`).style("fill", "#CCBEDB")
        d3.selectAll(`.bubble-others`).style("fill", "#EFEFEF")
        d3.selectAll(`.link`).style("opacity", (d,i,x) => {return x[i].style["opacity"]=="0"?"0":fadeOpacity});

        d3.select(`#${data.direction}-graph-svg`)
            .append("svg")
            .attr("id", "highlight-gradient-svg")
            .attr("transform", `translate(${graphViewCenterX},${graphViewCenterY})`)
            .style("pointer-events", "none");

        d3.select(`#${data.direction}-highlight-g`)
            .selectAll()
            .data(links.data())
            .join("path")
                .attr("class", "highlighted-link")
                .attr("fill", "none")
                .style("stroke-width", 2.5)
                .attr("d", d => getCurve(d))
                .style("stroke", d => {
                    let sourceColor = (d.source.label=="misinformation")?MISINFORMATION_COLOR:(d.source.label=="reliable"?RELIABLE_COLOR:OTHERS_COLOR);

                    let gradientId = `highlight-gradient-${data.direction}-${d.source.level}-${d.source.index}-${d.target.level}-${d.target.index}`;
                    let sourceX = d.source.x, sourceY = d.source.y, targetX = d.target.x, targetY = d.target.y;
                    let offset = 0.25;  // 0 means source position, 1 means target position
                    let highlightGradientColors = [
                        {color: "white", opacity: "0", offset: "0"}, 
                        {color: "white", opacity: "0", offset: 0.5-offset/2},
                        {color: sourceColor, opacity: "100%", offset: 0.5-0.05/2}, 
                        {color: sourceColor, opacity: "100%", offset: 0.5+0.05/2},
                        {color: "white", opacity: "0", offset: 0.5+offset/2}, 
                        {color: "white", opacity: "0", offset: 1}
                    ];
                    let animationStartOffset = 0.15;
                    let animationEndOffset = 0.25;

                    d3.select(`#highlight-gradient-svg`)
                        .append("linearGradient")
                        .attr("id", gradientId)
                        .attr("x1", sourceX)
                        .attr("x2", targetX)
                        .attr("y1", sourceY)
                        .attr("y2", targetY)
                        .attr("gradientUnits", "userSpaceOnUse")
                            .selectAll()
                            .data(highlightGradientColors)
                            .join("stop")
                                .attr("stop-color", c => c.color)
                                .attr("offset", c => c.offset)
                                .attr("stop-opacity", c => c.opacity);

                    d3.select(`#${gradientId}`)
                        .append("animate")
                            .attr("attributeName", "x1")
                            .attr("values", `${sourceX-(targetX-sourceX)*(1+animationStartOffset)};${targetX+(targetX-sourceX)*(animationEndOffset-1)}`)
                            .attr("dur", "2s")
                            .attr("repeatCount", "indefinite");
                    d3.select(`#${gradientId}`)
                        .append("animate")
                            .attr("attributeName", "x2")
                            .attr("values", `${targetX-(targetX-sourceX)*animationStartOffset};${targetX+(targetX-sourceX)*(animationEndOffset+1)}`)
                            .attr("dur", "2s")
                            .attr("repeatCount", "indefinite");
                    d3.select(`#${gradientId}`)
                        .append("animate")
                            .attr("attributeName", "y1")
                            .attr("values", `${sourceY-(targetY-sourceY)*(1+animationStartOffset)};${targetY+(targetY-sourceY)*(animationEndOffset-1)}`)
                            .attr("dur", "2s")
                            .attr("repeatCount", "indefinite");
                    d3.select(`#${gradientId}`)
                        .append("animate")
                            .attr("attributeName", "y2")
                            .attr("values", `${targetY-(targetY-sourceY)*animationStartOffset};${targetY+(targetY-sourceY)*(animationEndOffset+1)}`)
                            .attr("dur", "2s")
                            .attr("repeatCount", "indefinite");
                    return `url(#${gradientId})`;
                })
                .style("display", d => d.source.display&&d.target.display&&((d.source.level!="l2"&&d.target.level!="l2")||indirectDisplayFlag)?"":"none")
                .style("pointer-events", "none");

        d3.select(`#${data.direction}-highlight-g`)
            .selectAll()
            .data(links.data())
            .join("circle")
                .attr("class", "highlighted-bubble")    
                .attr("r", bubbleRadius)
                .attr("cx", d => {
                    if (d.source.x != data.x || d.source.y != data.y) return d.source.x;
                    else return d.target.x;
                })
                .attr("cy", d => {
                    if (d.source.x != data.x || d.source.y != data.y) return d.source.y;
                    else return d.target.y;
                })
                .attr("fill", d => {
                    let node = (d.source.x != data.x || d.source.y != data.y)?d.source:d.target;
                    return node.label=="misinformation"?MISINFORMATION_COLOR:(node.label=="reliable"?RELIABLE_COLOR:OTHERS_COLOR)
                })
                .style("pointer-events", "none")
                .style("opacity", d => !indirectDisplayFlag&&(d.source.level=="l2"||d.target.level=="l2")?"0":"1");

        d3.select(`#${data.direction}-highlight-g`)
            .append("circle")
                .attr("class", "highlighted-bubble")    
                .attr("r", bubbleRadius)
                .attr("cx", data.x)
                .attr("cy", data.y)
                .attr("fill", data.label=="misinformation"?MISINFORMATION_COLOR:(data.label=="reliable"?RELIABLE_COLOR:OTHERS_COLOR))
                .style("stroke", "black")
                .style("stroke-width", "3px")
                .style("pointer-events", "none");
    }

    d3.select(`#${data.direction}-graph-window`)
        .append("div")
            .attr("class", "graph-view-appended")
            .style("background-color", "rgba(128,128,128,0.8)")
            .style("color", "white")
            .style("position", "absolute")
            .style("padding", "3px 6px 3px 6px")
            .style("left", graphViewCenterX+data.x+60+"px")
            .style("top", graphViewCenterY+data.y-20+"px")
            .text(() => {
                let headerStatementDomainDiv = document.getElementById("header-statement-domain");
                if (headerStatementDomainDiv.masked) return maskString(data.name);
                else return data.name;
            })
            .attr("id", "highlighted-domain-name");
}

function bubbleMouseOut(e) {
    if (d3.select(e.target).style("opacity")=="0") return;
    if (!inForceSimulationDone1||!inForceSimulationDone2||!inForceSimulationDone3||!outForceSimulationDone1||!outForceSimulationDone2||!outForceSimulationDone3) return;

    if (e.target.id != "in-l0-bubble-0" && e.target.id != "out-l0-bubble-0") {
        d3.selectAll(".default-highlight").style("display", "");

        e.target.style.stroke = "";
        e.target.style["stroke-width"] = "";
        d3.selectAll("linearGradient")
            .selectAll(".gradient-stop-changed-by-highlight")
                .data([
                    {offset: "0%", color: "#000000", opacity: "6%"},
                    {offset: "100%", color: "#000000", opacity: "17%"}
                ])
                .attr("offset", d => d.offset)
                .attr("stop-color", d => d.color)
                .attr("stop-opacity", d => d.opacity)
                .attr("class", "")
        d3.selectAll(".highlighted-link").remove();
        d3.select("#highlight-gradient-svg").remove();
        d3.selectAll(".highlighted-bubble").remove();
        d3.selectAll(`.bubble-misinformation`).style("fill", "#F6DAB9")
        d3.selectAll(`.bubble-reliable`).style("fill", "#CCBEDB")
        d3.selectAll(`.bubble-others`).style("fill", "#EFEFEF")

        let fadeOpacity = 0.5;
        d3.selectAll(`.link`).style("opacity", (d,i,x) => {return x[i].style["opacity"]=="0"?"0":fadeOpacity});

        document.querySelectorAll(".default-highlight-animate").forEach(element => element.beginElement());
    }
    d3.select("#highlighted-domain-name").remove();
}

export function searchBarClicked() {
    d3.select("#domain-search-list").style("display", "");
    d3.select("#domain-search-bar-list").style("display", "").style("opacity", "1");
}

export function searchBarBlurred() {
    d3.select("#domain-search-bar-list")
        .style("opacity", "0")
        .transition()
            .delay(300)
            .style("display", "none")
            .style("opacity", "1");

    d3.select("#domain-search-bar").style("color", "gray");
}

export function searchBarFunction() {
    let input, filter, ul, li, textValue;
    input = document.getElementById("domain-search-bar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("domain-search-bar-list");
    li = ul.getElementsByTagName("li");

    for (let i = 0 ; i < li.length ; i++) {
        textValue = li[i].textContent || li[i].innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) li[i].style.display = "block";
        else li[i].style.display = "none";
    }
}

export function searchBarEntryClicked() {
    let domainName = this.innerText;
    let data = d3.select(`#domain-search-bar-entry-${domainName.split(".")[0]}`).data()[0][1];

    let searchBar = document.getElementById("domain-search-bar");
    searchBar.value = "";
    searchBar.setAttribute("placeholder", domainName);

    let searchList = document.getElementById("domain-search-list");
    searchList.style.display = "none";

    d3.selectAll(".domain-search-bar-entry").style("display", "block");

    let displayModeSettingToggle = document.getElementById("display-mode-setting-toggle");
    let summaryViewModeSettingToggle = document.getElementById("summary-view-mode-setting-toggle");
    displayModeSettingToggle.checked = summaryViewModeSettingToggle.checked = false;

    let categorySettingMisinfoCheckboxDiv = document.getElementById("category-setting-misinfo-checkbox");
    let categorySettingReliableCheckboxDiv = document.getElementById("category-setting-reliable-checkbox");
    let categorySettingOthersCheckboxDiv = document.getElementById("category-setting-others-checkbox");
    categorySettingMisinfoCheckboxDiv.checked = categorySettingReliableCheckboxDiv.checked = categorySettingOthersCheckboxDiv.checked = true;

    let levelSettingCheckboxInput = document.getElementById("level-setting-checkbox");
    levelSettingCheckboxInput.checked = true;

    let directionSettingCheckboxInput = document.getElementById("direction-setting-checkbox");
    directionSettingCheckboxInput.checked = false;

    let levelSettingTextDomain = document.getElementById("level-setting-text-domain");
    let directionSettingTextDomain = document.getElementById("direction-setting-text-domain");
    levelSettingTextDomain.innerText = directionSettingTextDomain.innerText = domainName;

    // windows
    let label = getLabelName(data["label"]);
    let color = getColor(label);
    makeHeader(domainName, label, color);
    makeMainWindow(domainName, data);
    makeTwitterWindow(domainName, data);
}

export function searchBarEntryHovered() {
    this.style["background-color"] = "gray";
}

export function searchBarEntryMouseOut() {
    this.style["background-color"] = "";
}

export function toggleMask(element) {
    if (element.masked) {
        element.masked = false;
        return element.domainName;
    }
    else {
        element.masked= true;
        return maskString(element.domainName);
    }
}

export function mask(element) {
    element.masked= true;
    return maskString(element.domainName);
}

function maskString(s) {
    if (s.length > 7) return s.slice(0,2)+s.slice(3,-2).replaceAll(/\w/g, "*")+s.slice(-2);
    else return s.slice(0,2)+s.slice(2).replaceAll(/\w/g, "*");
}

function stopSimulation(){
    if (inForceSimulation1) inForceSimulation1.stop()
    if (inForceSimulation2) inForceSimulation2.stop()
    if (inForceSimulation3) inForceSimulation3.stop()
    if (outForceSimulation1) outForceSimulation1.stop()
    if (outForceSimulation2) outForceSimulation2.stop()
    if (outForceSimulation3) outForceSimulation3.stop()
    inForceSimulation1=inForceSimulation2=inForceSimulation3=outForceSimulation1=outForceSimulation2=outForceSimulation3=null;
}
