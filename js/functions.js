import { domainName, getLabelName, getColor } from "./data.js";
import { MISINFORMATION_COLOR, RELIABLE_COLOR, OTHERS_COLOR } from "./data.js";
import { makeHeader } from './header.js'
import { makeMainWindow } from './main.js'
import { makeTwitterWindow } from "./twitter.js";

export function toggleTwitterPopup() {
    let twitterPopup = document.getElementById("twitter");
    let displayTwitterPopup = twitterPopup.style.display;

    if (displayTwitterPopup == 'inline-block') {
        twitterPopup.style.display = "none";
    }
    else {
        twitterPopup.style.display = "inline-block";
    }
}

export function toggleSearchDisplay() {
    let searchBarHeader = document.getElementById("domain-search-bar-header");
    if (searchBarHeader.style.display == "none") searchBarHeader.style.display = "";
    else searchBarHeader.style.display = "none";
}

export function iconButtonHovered(e) {
    d3.select(`#${e.target.id}`).select("path").style("fill", "#9F9F9F");
    d3.select(`#${e.target.id}`).select("span").style("opacity", "0.4");
}

export function iconButtonOut(e) {
    if (e.target.id == "twitter-icon-svg") {
        let twitterPopup = document.getElementById("twitter");
        if (twitterPopup.style.display == "none" || window.getComputedStyle(twitterPopup).display == "none") {
            d3.select(`#${e.target.id}`).select("path").style("fill", "white");
            d3.select(`#${e.target.id}`).select("span").style("opacity", "0.2");
        }
    }
    else {
        d3.select(`#${e.target.id}`).select("path").style("fill", "white");
        d3.select(`#${e.target.id}`).select("span").style("opacity", "0.2");
    }
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

export function searchBarEntryClicked() {
    let domainName = this.innerText;
    let data = d3.select(`#domain-search-bar-entry-${domainName.split(".")[0]}`).data()[0][1];

    let searchBar = document.getElementById("domain-search-bar");
    searchBar.value = "";
    searchBar.setAttribute("placeholder", domainName);

    let searchList = document.getElementById("domain-search-list");
    searchList.style.display = "none";

    d3.selectAll(".domain-search-bar-entry").style("display", "block");

    // settings
    let displayModeSettingToggle = document.getElementById("display-mode-setting-toggle");
    let summaryViewModeSettingToggle = document.getElementById("summary-view-mode-setting-toggle");
    displayModeSettingToggle.checked = summaryViewModeSettingToggle.checked = false;

    let categorySettingMisinfoCheckboxDiv = document.getElementById("category-setting-misinfo-checkbox");
    let categorySettingReliableCheckboxDiv = document.getElementById("category-setting-reliable-checkbox");
    let categorySettingOthersCheckboxDiv = document.getElementById("category-setting-others-checkbox");
    categorySettingMisinfoCheckboxDiv.checked = categorySettingReliableCheckboxDiv.checked = categorySettingOthersCheckboxDiv.checked = true;

    let levelSettingIndirectCheckboxInput = document.getElementById("level-setting-indirect-checkbox");
    levelSettingIndirectCheckboxInput.setAttribute("checked", "true");

    let directionSettingCheckboxInput = document.getElementById("direction-setting-checkbox");
    directionSettingCheckboxInput.checked = false;

    // let levelSettingTextDomain = document.getElementById("direction-setting-text-domain");
    let directionSettingTextDomain = document.getElementById("direction-setting-text-domain");
    directionSettingTextDomain.innerText = domainName;

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

export function twitterIconButtonHovered() {
    let twitterIconPath = document.getElementById("twitter-icon-path");
    let twitterIconSpan = document.getElementById("twitter-icon");
    twitterIconPath.style.fill = "#9F9F9F";
    twitterIconSpan.style.opacity = "40%";
}

export function twitterIconButtonOut() {
    let twitterIconPath = document.getElementById("twitter-icon-path");
    let twitterIconSpan = document.getElementById("twitter-icon");
    let twitterPopup = document.getElementById("twitter");
    if (twitterPopup.style.display == "none" || window.getComputedStyle(twitterPopup).display == "none") {
        twitterIconPath.style.fill = "white";
        twitterIconSpan.style.opacity = "20%";
    }
}

export function toggleHelpDisplay() {
    alert('function.js/toggleHelpDisplay() not implemented yet!');
}

export function displayModeChanged() {
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");
    inSummaryGraphDiv.summaryView = !inSummaryGraphDiv.summaryView;
    outSummaryGraphDiv.summaryView = !outSummaryGraphDiv.summaryView;

    if (!inSummaryGraphDiv.summaryView) {
        showGraphView();
    }
    else {
        showSummaryView();
    }
}

function showSummaryView() {
    let L2EmptyArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(2*Math.PI);
    d3.select("#in-graph-view-g")
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
            .style("display", "none");
    d3.select("#out-statement-graph-view")
        .transition()
            .duration(500)    
            .style("opacity", "0")
        .transition()
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
            .duration(100)
            .attr("transform", "translate(250, 165)");
    d3.select("#in-l2-empty-arc")
        .transition()
            .delay(1000)
            .duration(100)
            .attr("transform", "translate(250, 165)");
    d3.select("#in-graph")
        .style("position", "absolute")
        .style("top", "58px")
        .transition()
            .delay(1000)
            .duration(100)
            .style("position", "absolute")
            .style("top", "94px")
            .style("height", "330px")
        .transition()
            .style("position", "relative")
            .style("top", "");
    d3.select("#in-graph-svg")    
        .transition()
            .delay(1000)
            .duration(100)
            .style("width", "500px")
            .style("height", "330px");
    d3.select("#in-statement")
        .style("opacity", "0")
        .transition()
            .delay(1100)
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
            .style("opacity", "1");
    d3.select("#in-l2-reliable-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#in-l2-others-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");

    d3.select("#out-graph-view-g")
        .transition()
            .duration(500)    
            .style("opacity", "0")
            .remove();
    d3.select("#out-l2-empty-arc")
        .transition()
            .delay(500)
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", L2EmptyArc)
    d3.select("#out-l1-empty-arc")
        .transition()
            .delay(1000)
            .duration(100)
            .attr("transform", "translate(250, 165)");
    d3.select("#out-l2-empty-arc")
        .transition()
            .delay(1000)
            .duration(100)
            .attr("transform", "translate(250, 165)");
    d3.select("#out-graph")
        .style("position", "absolute")
        .style("top", "58px")
        .transition()
            .delay(1000)
            .duration(100)
            .style("position", "absolute")
            .style("top", "94px")
            .style("height", "330px")
        .transition()
            .style("position", "relative")
            .style("top", "");
    d3.select("#out-graph-svg")    
        .transition()
            .delay(1000)
            .duration(100)
            .style("width", "500px")
            .style("height", "330px");
    d3.select("#out-statement")
        .style("opacity", "0")
        .transition()
            .delay(1100)
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
            .style("opacity", "1");
    d3.select("#out-l2-reliable-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
    d3.select("#out-l2-others-arc")
        .style("visibility", "visible")
        .style("opacity", "0")
        .transition()
            .delay(1100)
            .duration(1000)
            .style("opacity", "1");
}

function getArrowHead(fromx, fromy, tox, toy, arrowHeadLength=22, arrowHeadAngle=Math.PI/6) {
    let slopeAngle = Math.atan2((toy - fromy), (tox - fromx));
    let path = "M "+tox+" "+toy;
    path = path + (" L " + String(tox-arrowHeadLength*Math.cos(slopeAngle-arrowHeadAngle/2)) + " " + String(toy-arrowHeadLength*Math.sin(slopeAngle-arrowHeadAngle/2)));
    path = path + (" L " + String(tox-arrowHeadLength*Math.cos(slopeAngle+arrowHeadAngle/2)) + " " + String(toy-arrowHeadLength*Math.sin(slopeAngle+arrowHeadAngle/2)));
    path += " L " + tox + " " + toy;
    return path;
}

function showGraphView() {
    // 0. Basic variables
    const l1CircleRadius = 112.5;
    const l2CircleRadius = 185;
    const centerX = 200, centerY = 200;
    const bubbleRadius = 8;

    let inStatementGraphViewDiv = d3.select("#in-statement-graph-view");
    let outStatementGraphViewDiv = d3.select("#out-statement-graph-view");
    inStatementGraphViewDiv.transition()
        .style("display", "block")
        .duration(500)
        .style("opacity", "1");
    outStatementGraphViewDiv.transition()
        .style("display", "block")
        .duration(500)
        .style("opacity", "1");

    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let outSummaryGraphDiv = document.getElementById("out-summary-graph");

    let indirectDisplayFlag = inSummaryGraphDiv.indirectDisplay;
    let inSvg = d3.select("#in-graph-svg");
    let outSvg = d3.select("#out-graph-svg");
    let inWindowDiv = d3.select("#in-graph")
        .append("div")
        .attr("id", "in-graph-window")
        .style("position", "absolute")
        .style("top", "0px")
        .style("width", "500px")
        .style("height", "430px")
        .style("pointer-events", "none");
    let outWindowDiv = d3.select("#out-graph")
        .append("div")
        .attr("id", "out-graph-window")
        .style("position", "absolute")
        .style("top", "0px")
        .style("width", "500px")
        .style("height", "430px")
        .style("pointer-events", "none");
    
    // 1. Erase the existing summary view graphs
    d3.select("#in-statement")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("display", "none");
    d3.select("#out-statement")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("display", "none");
    d3.select("#in-graph-percentage")
        .style("display", "none");
    d3.select("#out-graph-percentage")
        .style("display", "none");

    d3.select("#in-graph")
        .style("width", "500px")
        .style("height", "400px")
        .style("position", "absolute")
        .style("top", "58px");
    d3.select("#out-graph")
        .style("width", "500px")
        .style("height", "400px")
        .style("position", "absolute")
        .style("top", "58px");
    d3.select("#in-graph-svg")
        .style("width", "400px")
        .style("height", "400px");
    d3.select("#out-graph-svg")
        .style("width", "400px")
        .style("height", "400px");
    
    d3.select("#in-l1-empty-arc")
        .attr("transform", "translate(200,200)");
    d3.select("#out-l1-empty-arc")
        .attr("transform", "translate(200,200)");

    let L2EmptyArc = d3.arc().innerRadius(170).outerRadius(200).startAngle(0).endAngle(2*Math.PI);
    d3.select("#in-l2-empty-arc")
        .attr("transform", "translate(200, 200)")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("d", L2EmptyArc);
    d3.select("#out-l2-empty-arc")
        .attr("transform", "translate(200, 200)")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("d", L2EmptyArc);

    // 2. Prepare SVG and G for graph view visualization
    let inGraphViewG = inSvg.append("g").attr("id", "in-graph-view-g");
    let inL1LinkG = inGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").attr("id", "in-l1-link-group");
    let inL2LinkG = inGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").attr("id", "in-l2-link-group");
    let inCrossLinkG = inGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").attr("id", "in-cross-link-group");
    let inL1Link = inL1LinkG.append("g").selectAll(".in-l1-link");
    let inL1LinkHead = inL1LinkG.append("g").selectAll(".in-l1-link-head");
    let inL2Link = inL2LinkG.append("g").selectAll(".in-l2-link");
    let inL2LinkHead = inL2LinkG.append("g").selectAll(".in-l2-link-head");
    let inCrossLink = inCrossLinkG.append("g").selectAll(".in-cross-link");
    let inCrossLinkHead = inCrossLinkG.append("g").selectAll(".in-cross-link-head");
    let inHighlightedLink = inGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")")
    let inL1Bubble = inGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").selectAll(".in-l1-bubble");
    let inL2Bubble = inGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").selectAll(".in-l2-bubble");

    let outGraphViewG = outSvg.append("g").attr("id", "out-graph-view-g");
    let outL1LinkG = outGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").attr("id", "out-l1-link-group");
    let outL2LinkG = outGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").attr("id", "out-l2-link-group");
    let outCrossLinkG = outGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").attr("id", "out-cross-link-group");
    let outL1Link = outL1LinkG.append("g").selectAll(".out-l1-link");
    let outL1LinkHead = outL1LinkG.append("g").selectAll(".out-l1-link-head");
    let outL2Link = outL2LinkG.append("g").selectAll(".out-l2-link");
    let outL2LinkHead = outL2LinkG.append("g").selectAll(".out-l2-link-head");
    let outCrossLink = outCrossLinkG.append("g").selectAll(".out-cross-link");
    let outCrossLinkHead = outCrossLinkG.append("g").selectAll(".out-cross-link-head");
    let outHighlightedLink = outGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")");
    let outL1Bubble = outGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").selectAll(".out-l1-bubble");
    let outL2Bubble = outGraphViewG.append("g").attr("transform", "translate("+centerX+","+centerY+")").selectAll(".out-l2-bubble");

    // 3. Set nodes and edges to display 
    let inL1Nodes = Object.entries(inSummaryGraphDiv.inL1Domains);
    let inL2Nodes = Object.entries(inSummaryGraphDiv.inL2Domains);
    let outL1Nodes = Object.entries(outSummaryGraphDiv.outL1Domains);
    let outL2Nodes = Object.entries(outSummaryGraphDiv.outL2Domains);

    inL1Nodes.displayedNodeNumber = 0;
    inL2Nodes.displayedNodeNumber = 0;
    outL1Nodes.displayedNodeNumber = 0;
    outL2Nodes.displayedNodeNumber = 0;

    let inL1Edges = [];
    let inL2Edges = [];
    let inCrossEdges = [];
    let outL1Edges = [];
    let outL2Edges = [];
    let outCrossEdges = [];

    let i = 0;
    inL1Nodes.forEach((d, index) => {
        d.direction = "in";
        d.level = "l1";
        d.radius = l1CircleRadius;
        d.index = index;
        d.label = d[1]["label"];
        
        if (d[1]["label"] == "misinformation" && inSummaryGraphDiv.fakeDisplay) {
            d.display = true;
            inL1Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "reliable" && inSummaryGraphDiv.realDisplay) {
            d.display = true;
            inL1Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "others" && inSummaryGraphDiv.othersDisplay) {
            d.display = true;
            inL1Nodes.displayedNodeNumber++;
        }
        else {
            d.display = false;
        }

        d.i = (d.display)?i++:-1;
        d.theta = 0;


        d[1]["L1In"].forEach((linkedDomainName) => {
            let linkedDomainNode = inL1Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            inL1Edges.push([linkedDomainNode, d]);
        })
    });

    i = 0;
    inL2Nodes.forEach((d, index) => {
        d.direction = "in";
        d.level = "l2";
        d.radius = l2CircleRadius;
        d.index = index;
        d.label = d[1]["label"];

        if (d[1]["label"] == "misinformation" && inSummaryGraphDiv.fakeDisplay) {
            d.display = true;
            inL2Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "reliable" && inSummaryGraphDiv.realDisplay) {
            d.display = true;
            inL2Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "others" && inSummaryGraphDiv.othersDisplay) {
            d.display = true;
            inL2Nodes.displayedNodeNumber++;
        }
        else {
            d.display = false;
        }

        d.i = (d.display)?i++:-1;
        d.theta = 0;

        d[1]["L2In"].forEach((linkedDomainName) => {
            let linkedDomainNode = inL2Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            inL2Edges.push([linkedDomainNode, d]);
        })
    });

    inL1Nodes.forEach((d, index) => {
        d[1]["L2In"].forEach((linkedDomainName) => {
            let linkedDomainNode = inL2Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            inCrossEdges.push([linkedDomainNode, d]);
        })
        d[1]["L2Out"].forEach(linkedDomainName => {
            let linkedDomainNode = inL2Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            inCrossEdges.push([d, linkedDomainNode]);
        })
    });

    i = 0;
    outL1Nodes.forEach((d, index) => {
        d.direction = "out";
        d.level = "l1";
        d.radius = l1CircleRadius;
        d.index = index;
        d.label = d[1]["label"];

        if (d[1]["label"] == "misinformation" && outSummaryGraphDiv.fakeDisplay) {
            d.display = true;
            outL1Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "reliable" && outSummaryGraphDiv.realDisplay) {
            d.display = true;
            outL1Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "others" && outSummaryGraphDiv.othersDisplay) {
            d.display = true;
            outL1Nodes.displayedNodeNumber++;
        }
        else {
            d.display = false;
        }

        d.i = (d.display)?i++:-1;
        d.theta = 0;

        d[1]["L1In"].forEach((linkedDomainName) => {
            let linkedDomainNode = outL1Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            outL1Edges.push([linkedDomainNode, d]);
        })
    });

    i = 0;
    outL2Nodes.forEach((d, index) => {
        d.direction = "out";
        d.level = "l2";
        d.radius = l2CircleRadius;
        d.index = index;
        d.label = d[1]["label"];

        if (d[1]["label"] == "misinformation" && outSummaryGraphDiv.fakeDisplay) {
            d.display = true;
            outL2Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "reliable" && outSummaryGraphDiv.realDisplay) {
            d.display = true;
            outL2Nodes.displayedNodeNumber++;
        }
        else if (d[1]["label"] == "others" && outSummaryGraphDiv.othersDisplay) {
            d.display = true;
            outL2Nodes.displayedNodeNumber++;
        }
        else {
            d.display = false;
        }

        d.i = (d.display)?i++:-1;
        d.theta = 0;

        d[1]["L2In"].forEach((linkedDomainName) => {
            let linkedDomainNode = outL2Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            outL2Edges.push([linkedDomainNode, d]);
        })
    });

    outL1Nodes.forEach((d, index) => {
        d[1]["L2In"].forEach((linkedDomainName) => {
            let linkedDomainNode = outL2Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            outCrossEdges.push([linkedDomainNode, d]);
        })
        d[1]["L2Out"].forEach(linkedDomainName => {
            let linkedDomainNode = outL2Nodes.find((element, index, array) => {
                return (element[0] == linkedDomainName);
            });
            outCrossEdges.push([d, linkedDomainNode]);
        })
    })

    // 4. Whether it is possible to display the graph views
    let inL1Flag, inL2Flag, outL1Flag, outL2Flag;
    inL1Flag = ((8+20*inL1Nodes.displayedNodeNumber)/l1CircleRadius < Math.PI*2);
    inL2Flag = ((8+20*inL2Nodes.displayedNodeNumber)/l2CircleRadius < Math.PI*2);
    outL1Flag = ((8+20*outL1Nodes.displayedNodeNumber)/l1CircleRadius < Math.PI*2);
    outL2Flag = ((8+20*outL2Nodes.displayedNodeNumber)/l2CircleRadius < Math.PI*2);

    // 5. Display
    const curve = d3.lineRadial().curve(d3.curveBundle.beta(0.85));
    let interval;

    /*
     * IN L1 GRAPH
     */    
    interval = (inL1Nodes.displayedNodeNumber!=0)?(2*Math.PI/inL1Nodes.displayedNodeNumber):(0);
    inL1Nodes.forEach((d, index) => {
        d.overflow = !inL1Flag;
        d.theta = (inL1Flag)?d.i*interval:0;
    });

    inL1Bubble = inL1Bubble.data(inL1Nodes)
        .enter()
        .append("circle")
        .attr("class", d => "bubble in-l1-bubble bubble-"+d[1]["label"])
        .attr("id", (d, index) => "in-l1-bubble-"+index)
        .attr("r", bubbleRadius)
        .attr("fill", d => (d[1]["label"] == "misinformation")?MISINFORMATION_COLOR:(d[1]["label"]=="reliable")?RELIABLE_COLOR:OTHERS_COLOR)
        // overflow case test
        // .style("display", d => (d.display&&!d.overflow)?"":"none")
        .style("display", d => (d.display)?"":"none")
        .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .tween("", (d, index) => function (t) {
                    d3.select(this)
                        .attr("cx", String(d.radius*Math.sin(d.theta*t+((8+20*d.i)/l1CircleRadius)*(1-t))))
                        .attr("cy", String(-d.radius*Math.cos(d.theta*t+((8+20*d.i)/l1CircleRadius)*(1-t))))
                }
            );
    
    inL1Bubble.each((d) => {
        let c = document.getElementById("in-l1-bubble-"+d["index"]);

        c.addEventListener("mouseover", function (e) {
            c.style.stroke = "black";
            c.style["stroke-width"] = "3px";

            let links = d3.selectAll(".in-l1-link-"+d["index"]);
            
            links.each(([sourceNode, targetNode]) => {
                inHighlightedLink.append("path")
                    .attr("d", curve([
                        [sourceNode.theta, sourceNode.radius],
                        [targetNode.theta, targetNode.radius],
                    ]))
                    .attr("stroke", "red")
                    .attr("stroke-width", "3px")
                    .attr("fill", "none")
                    .attr("class", "highlighted-link")
                    .style("display", (sourceNode.display&&targetNode.display)?"":"none");

                let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                let tox = targetNode.radius*Math.sin(targetNode.theta);
                let toy = -targetNode.radius*Math.cos(targetNode.theta);
                inHighlightedLink.append("path")
                    .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                    .attr("fill", "red")
                    .attr("class", "highlighted-link")
                    .style("display", (sourceNode.display&&targetNode.display)?"":"none");
            });

            links = d3.selectAll(".in-cross-link-l1-"+d["index"]);
            links.each(([sourceNode, targetNode]) => {
                inHighlightedLink.append("path")
                    .attr("d", curve([
                        [sourceNode.theta, sourceNode.radius],
                        [targetNode.theta, targetNode.radius]
                    ]))    
                    .attr("stroke", "red")
                    .attr("stroke-width", "3px")
                    .attr("fill", "none")
                    .attr("class", "highlighted-link")
                    .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");

                let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                let tox = targetNode.radius*Math.sin(targetNode.theta);
                let toy = -targetNode.radius*Math.cos(targetNode.theta);
                inHighlightedLink.append("path")
                    .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                    .attr("fill", "red")
                    .attr("class", "highlighted-link")
                    .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");
            });

            inWindowDiv.append("div")
                .style("background-color", "rgba(128,128,128,0.8)")
                .style("color", "white")
                .style("position", "absolute")
                .style("padding", "3px 6px 3px 6px")
                .style("left", centerX+d.radius*Math.sin(d.theta)+52+"px")
                .style("top", centerY-d.radius*Math.cos(d.theta)-22+"px")
                .text(d[0])
                .attr("id", "highlighted-domain-name");
        });

        c.addEventListener("mouseout", function () {
            c.style.stroke = "";
            c.style["stroke-width"] = "";

            d3.selectAll(".highlighted-link").remove();
            d3.select("#highlighted-domain-name").remove();
        });
    });
    
    inL1Link = inL1Link.data(inL1Edges)
        .enter()
        .append("path")
        .attr("d", d => curve([
                [d[0].theta, l1CircleRadius],
                [d[1].theta, l1CircleRadius]
            ])
        )
        .attr("stroke", "#DADADA")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("class", d => "link in-l1-link" + " in-l1-link-"+d[0]["index"] + " in-l1-link-"+d[1]["index"] + " link-"+d[0]["label"] + " link-"+d[1]["label"] + " link-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "in-l1-link-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (d[0].display&&d[1].display&&inL1Flag)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");
    inL1LinkHead = inL1LinkHead.data(inL1Edges)
        .enter()
        .append("path")
        .attr("d", function (d) {
            let fromx = d[0].radius*Math.sin(d[0].theta);
            let fromy = -d[0].radius*Math.cos(d[0].theta);
            let tox = d[1].radius*Math.sin(d[1].theta);
            let toy = -d[1].radius*Math.cos(d[1].theta);
            return getArrowHead(fromx, fromy, tox, toy);
        })
        .attr("fill", "#DADADA")
        .attr("class", d => "link-head in-l1-link-head in-l1-link-head-"+d[0]["index"]+" in-l1-link-head-"+d[1]["index"]+" in-l1-link-head-"+d[0]["index"]+"-"+d[1]["index"] + " link-head-"+d[0]["label"] + " link-head-"+d[1]["label"] + " link-head-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "in-l1-link-head-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");

    if (inL1Flag) {
    // If Display for in-L1 is feasible
        d3.select("#in-l1-misinfo-arc").style("visibility", "hidden");
        d3.select("#in-l1-reliable-arc").style("visibility", "hidden");
        d3.select("#in-l1-others-arc").style("visibility", "hidden");
    }
    else {
        // fix to expand the existing graph
        d3.select("#in-l1-misinfo-arc").style("visibility", "hidden");
        d3.select("#in-l1-reliable-arc").style("visibility", "hidden");
        d3.select("#in-l1-others-arc").style("visibility", "hidden");
    }

    /*
     * IN L2 GRAPH
     */
    interval = (inL2Nodes.displayedNodeNumber!=0)?(2*Math.PI/inL2Nodes.displayedNodeNumber):(0);
    inL2Nodes.forEach((d, index) => {
        d.overflow = !inL2Flag;
        d.theta = d.i * interval;
    });

    inL2Bubble = inL2Bubble.data(inL2Nodes)
        .enter()
        .append("circle")
        .attr("class", d => "bubble in-l2-bubble bubble-"+d[1]["label"])
        .attr("id", (d, index) => "in-l2-bubble-"+index)
        .attr("r", bubbleRadius)
        .attr("fill", d => (d[1]["label"] == "misinformation")?MISINFORMATION_COLOR:(d[1]["label"]=="reliable")?RELIABLE_COLOR:OTHERS_COLOR)
        // overflow case test
        // .style("display", d => (d.display&&inL2Flag&&indirectDisplayFlag)?"":"none")
        .style("display", d => (d.display&&indirectDisplayFlag)?"":"none")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .tween("", (d, index) => function (t) {
                d3.select(this)
                    .attr("cx", String(d.radius*Math.sin(d.theta*t+((bubbleRadius+20*d.i)/l2CircleRadius)*(1-t))))
                    .attr("cy", String(-d.radius*Math.cos(d.theta*t+((bubbleRadius+20*d.i)/l2CircleRadius)*(1-t))))
            }
        );

    inL2Bubble.each((d) => {
        let c = document.getElementById("in-l2-bubble-"+d["index"]);

        c.addEventListener("mouseover", function (e) {
            c.style.stroke = "black";
            c.style["stroke-width"] = "3px";

            d3.selectAll(".in-l2-link-"+d["index"])
                .each(([sourceNode, targetNode]) => {
                    inHighlightedLink.append("path")
                        .attr("d", curve([
                            [sourceNode.theta, sourceNode.radius],
                            [targetNode.theta, targetNode.radius]
                        ]))    
                        .attr("stroke", "red")
                        .attr("stroke-width", "3px")
                        .attr("fill", "none")
                        .attr("class", "highlighted-link")
                        .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");

                    let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                    let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                    let tox = targetNode.radius*Math.sin(targetNode.theta);
                    let toy = -targetNode.radius*Math.cos(targetNode.theta);
                    inHighlightedLink.append("path")
                        .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                        .attr("fill", "red")
                        .attr("class", "highlighted-link")
                        .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");
                });

            d3.selectAll(".in-cross-link-l2-"+d["index"])
                .each(([sourceNode, targetNode]) => {
                    inHighlightedLink.append("path")
                        .attr("d", curve([
                            [sourceNode.theta, sourceNode.radius],
                            [targetNode.theta, targetNode.radius]
                        ]))    
                        .attr("stroke", "red")
                        .attr("stroke-width", "3px")
                        .attr("fill", "none")
                        .attr("class", "highlighted-link")
                        .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");

                    let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                    let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                    let tox = targetNode.radius*Math.sin(targetNode.theta);
                    let toy = -targetNode.radius*Math.cos(targetNode.theta);
                    inHighlightedLink.append("path")
                        .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                        .attr("fill", "red")
                        .attr("class", "highlighted-link")
                        .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");
                });

            inWindowDiv.append("div")
                .style("background-color", "rgba(128,128,128,0.8)")
                .style("color", "white")
                .style("position", "absolute")
                .style("padding", "3px 6px 3px 6px")
                .style("left", centerX+d.radius*Math.sin(d.theta)+52+"px")
                .style("top", centerY-d.radius*Math.cos(d.theta)-22+"px")
                .text(d[0])
                .attr("id", "highlighted-domain-name");
        });

        c.addEventListener("mouseout", function () {
            c.style.stroke = "";
            c.style["stroke-width"] = "";
            d3.selectAll(".highlighted-link").remove();
            d3.select("#highlighted-domain-name").remove();
        });
    });

    inL2Link = inL2Link.data(inL2Edges)
        .enter()
        .append("path")
        .attr("d", d => {return curve([
                [d[0].theta, l2CircleRadius],
                [d[1].theta, l2CircleRadius]
            ]);}
        )
        .attr("stroke", "#DADADA")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("class", d => "link in-l2-link" + " in-l2-link-"+d[0]["index"] + " in-l2-link-"+d[1]["index"] + " link-"+d[0]["label"] + " link-"+d[1]["label"] + " link-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "in-l1-link-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");
    
    inL2LinkHead = inL2LinkHead.data(inL2Edges)
        .enter()
        .append("path")
        .attr("d", function (d) {
            let fromx = d[0].radius*Math.sin(d[0].theta);
            let fromy = -d[0].radius*Math.cos(d[0].theta);
            let tox = d[1].radius*Math.sin(d[1].theta);
            let toy = -d[1].radius*Math.cos(d[1].theta);
            return getArrowHead(fromx, fromy, tox, toy);
        })
        .attr("fill", "#DADADA")
        .attr("class", d => "link-head in-l2-link-head in-l2-link-head-"+d[0]["index"]+" in-l2-link-head-"+d[1]["index"]+" in-l2-link-head-"+d[0]["index"]+"-"+d[1]["index"] + " link-head-"+d[0]["label"] + " link-head-"+d[1]["label"] + " link-head-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "in-l2-link-head-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");

    if (inL2Flag) {
        d3.select("#in-l2-misinfo-arc").style("visibility", "hidden");
        d3.select("#in-l2-reliable-arc").style("visibility", "hidden");
        d3.select("#in-l2-others-arc").style("visibility", "hidden");
    }
    else {
        // fix to expand the existing graph
        d3.select("#in-l2-misinfo-arc").style("visibility", "hidden");
        d3.select("#in-l2-reliable-arc").style("visibility", "hidden");
        d3.select("#in-l2-others-arc").style("visibility", "hidden");
    }

    inCrossLink = inCrossLink.data(inCrossEdges)
        .enter()
        .append("path")
        .attr("d", d => {
            return curve([
                [d[0].theta, d[0].radius],
                [d[1].theta, d[1].radius]
            ]);}
        )
        .attr("stroke", "#DADADA")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("class", d => "link in-cross-link" + " in-cross-link-"+d[0]["level"]+"-"+d[0]["index"] + " in-cross-link-"+d[1]["level"]+"-"+d[1]["index"] + " link-"+d[0]["label"] + " link-"+d[1]["label"] + " link-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "in-cross-link-"+d[0]["level"]+"-"+d[0]["index"]+"-"+d[1]["level"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1"); 
    inCrossLinkHead = inCrossLinkHead.data(inCrossEdges)
        .enter()
        .append("path")
        .attr("d", function (d) {
            let fromx = d[0].radius*Math.sin(d[0].theta);
            let fromy = -d[0].radius*Math.cos(d[0].theta);
            let tox = d[1].radius*Math.sin(d[1].theta);
            let toy = -d[1].radius*Math.cos(d[1].theta);
            return getArrowHead(fromx, fromy, tox, toy);
        })
        .attr("fill", "#DADADA")
        .attr("class", d => "link-head in-cross-link-head in-cross-link-head-"+d[0]["level"]+"-"+d[0]["index"]+" in-cross-link-head-"+d[1]["level"]+"-"+d[1]["index"]+" in-cross-link-head-"+d[0]["level"]+"-"+d[0]["index"]+"-"+d[1]["level"]+"-"+d[1]["index"] + " link-head-"+d[0]["label"] + " link-head-"+d[1]["label"] + " link-head-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "in-cross-link-head-"+d[0]["level"]+"-"+d[0]["index"]+"-"+d[1]["level"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1"); 

    /* 
     * OUT L1 GRAPH
     */

    interval = (outL1Nodes.displayedNodeNumber!=0)?(2*Math.PI/outL1Nodes.displayedNodeNumber):(0);
    outL1Nodes.forEach((d, index) => {
        d.overflow = !outL1Flag;
        d.theta = d.i * interval;
    });

    outL1Bubble = outL1Bubble.data(outL1Nodes)
        .enter()
        .append("circle")
        .attr("class", d => "bubble out-l1-bubble bubble-"+d["label"])
        .attr("id", (d, index) => "out-l1-bubble-"+d.index)
        .attr("r", bubbleRadius)
        .attr("fill", d => (d[1]["label"] == "misinformation")?MISINFORMATION_COLOR:(d[1]["label"]=="reliable")?RELIABLE_COLOR:OTHERS_COLOR)
        // overflow case test
        // .style("display", d => (d.display&&!d.overflow)?"":"none")
        .style("display", d => (d.display)?"":"none")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .tween("", (d, index) => function (t) {
                d3.select(this)
                    .attr("cx", String(d.radius*Math.sin(d.theta*t+((8+20*d.i)/l1CircleRadius)*(1-t))))
                    .attr("cy", String(-d.radius*Math.cos(d.theta*t+((8+20*d.i)/l1CircleRadius)*(1-t))))
            }
        );

    outL1Bubble.each((d) => {
        let c = document.getElementById("out-l1-bubble-"+d["index"]);

        c.addEventListener("mouseover", function () {
            c.style["stroke"] = "black";
            c.style["stroke-width"] = "3px";

            let links = d3.selectAll(".out-l1-link-"+d["index"]);
            links.each(([sourceNode, targetNode]) => {
                outHighlightedLink.append("path")
                    .attr("d", curve([
                        [sourceNode.theta, sourceNode.radius],
                        [targetNode.theta, targetNode.radius]
                    ]))
                    .attr("stroke", "red")
                    .attr("stroke-width", "3px")
                    .attr("fill", "none")
                    .attr("class", "highlighted-link")
                    .style("display", (sourceNode.display&&targetNode.display)?"":"none");

                let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                let tox = targetNode.radius*Math.sin(targetNode.theta);
                let toy = -targetNode.radius*Math.cos(targetNode.theta);
                outHighlightedLink.append("path")
                    .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                    .attr("fill", "red")
                    .attr("class", "highlighted-link")
                    .style("display", (sourceNode.display&&targetNode.display)?"":"none");
            });

            links = d3.selectAll(".out-cross-link-l1-"+d["index"]);
            links.each(([sourceNode, targetNode]) => {
                outHighlightedLink.append("path")
                    .attr("d", curve([
                        [sourceNode.theta, sourceNode.radius],
                        [targetNode.theta, targetNode.radius]
                    ]))
                    .attr("stroke", "red")
                    .attr("stroke-width", "3px")
                    .attr("fill", "none")
                    .attr("class", "highlighted-link")
                    .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");

                let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                let tox = targetNode.radius*Math.sin(targetNode.theta);
                let toy = -targetNode.radius*Math.cos(targetNode.theta);
                outHighlightedLink.append("path")
                    .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                    .attr("fill", "red")
                    .attr("class", "highlighted-link")
                    .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");
            });

            outWindowDiv.append("div")
                .style("background-color", "rgba(128, 128, 128, 0.8)")
                .style("color", "white")
                .style("position", "absolute")
                .style("padding", "3px 6px 3px 6px")
                .style("left", centerX+d.radius*Math.sin(d.theta)+52+"px")
                .style("top", centerY-d.radius*Math.cos(d.theta)-22+"px")
                .text(d[0])
                .attr("id", "highlighted-domain-name");
        });

        c.addEventListener("mouseout", function () {
            c.style.stroke = "";
            c.style["stroke-width"] = "";

            d3.selectAll(".highlighted-link").remove();
            d3.select("#highlighted-domain-name").remove();
        });
    });

    outL1Link = outL1Link.data(outL1Edges)
        .enter()
        .append("path")
        .attr("d", d => curve([
                [d[0].theta, l1CircleRadius],
                [d[1].theta, l1CircleRadius]
            ])
        )
        .attr("stroke", "#DADADA")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("class", d => "link out-l1-link"+" out-l1-link-"+d[0]["index"]+" out-l1-link-"+d[1]["index"] + " link-"+d[0]["label"] + " link-"+d[1]["label"] + " link-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "out-l1-link-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");   

    outL1LinkHead = outL1LinkHead.data(outL1Edges)
        .enter()
        .append("path")
        .attr("d", function (d) {
            let fromx = d[0].radius*Math.sin(d[0].theta);
            let fromy = -d[0].radius*Math.cos(d[0].theta);
            let tox = d[1].radius*Math.sin(d[1].theta);
            let toy = -d[1].radius*Math.cos(d[1].theta);
            return getArrowHead(fromx, fromy, tox, toy);
        })
        .attr("fill", "#DADADA")
        .attr("class", d => "link-head out-l1-link-head out-l1-link-head-"+d[0]["index"]+" out-l1-link-head-"+d[1]["index"]+" out-l1-link-head-"+d[0]["index"]+"-"+d[1]["index"] + " link-head-"+d[0]["label"] + " link-head-"+d[1]["label"] + " link-head-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "out-l1-link-head-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");   

    if (outL1Flag) {
        d3.select("#out-l1-misinfo-arc").style("visibility", "hidden");
        d3.select("#out-l1-reliable-arc").style("visibility", "hidden");
        d3.select("#out-l1-others-arc").style("visibility", "hidden");
    }
    else {
        // fix to expand the existing graph
        d3.select("#out-l1-misinfo-arc").style("visibility", "hidden");
        d3.select("#out-l1-reliable-arc").style("visibility", "hidden");
        d3.select("#out-l1-others-arc").style("visibility", "hidden");
    }

    /*
     * OUT L2 GRAPH
     */
    interval = (outL2Nodes.displayedNodeNumber!=0)?(2*Math.PI/outL2Nodes.displayedNodeNumber):(-1);
    outL2Nodes.forEach((d, index) => {
        d.overflow = !outL2Flag;
        d.theta = d.i * interval;
    })

    outL2Bubble = outL2Bubble.data(outL2Nodes)
        .enter()
        .append("circle")
        .attr("class", d => "bubble out-l2-bubble bubble-"+d["label"])
        .attr("id", (d, index) => "out-l2-bubble-"+d.index)
        .attr("r", bubbleRadius)
        .attr("fill", d => (d[1]["label"] == "misinformation")?MISINFORMATION_COLOR:(d[1]["label"]=="reliable")?RELIABLE_COLOR:OTHERS_COLOR)
        // overflow case test
        // .style("display", d => (indirectDisplayFlag&&d.display&&!d.overflow)?"":"none")
        .style("display", d => (indirectDisplayFlag&&d.display)?"":"none")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .tween("", (d, index) => function (t) {
                d3.select(this)
                    .attr("cx", String(d.radius*Math.sin(d.theta*t+((bubbleRadius+20*d.i)/l2CircleRadius)*(1-t))))
                    .attr("cy", String(-d.radius*Math.cos(d.theta*t+((bubbleRadius+20*d.i)/l2CircleRadius)*(1-t))))
            }
        );

    outL2Bubble.each((d) => {
        let c = document.getElementById("out-l2-bubble-"+d["index"]);

        c.addEventListener("mouseover", function () {
            c.style["stroke"] = "black";
            c.style["stroke-width"] = "3px";

            let links = d3.selectAll(".out-l2-link-"+d["index"]);
            links.each(([sourceNode, targetNode]) => {
                outHighlightedLink.append("path")
                    .attr("d", curve([
                        [sourceNode.theta, sourceNode.radius],
                        [targetNode.theta, targetNode.radius]
                    ]))
                    .attr("stroke", "red")
                    .attr("stroke-width", "3px")
                    .attr("fill", "none")
                    .attr("class", "highlighted-link")
                    // overflow case test
                    // .style("display", (indirectDisplayFlag&&sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none");
                    .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");

                let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                let tox = targetNode.radius*Math.sin(targetNode.theta);
                let toy = -targetNode.radius*Math.cos(targetNode.theta);
                outHighlightedLink.append("path")
                    .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                    .attr("fill", "red")
                    .attr("class", "highlighted-link")
                    .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");
            });

            links = d3.selectAll(".out-cross-link-l2-"+d["index"]);
            links.each(([sourceNode, targetNode]) => {
                outHighlightedLink.append("path")
                    .attr("d", curve([
                        [sourceNode.theta, sourceNode.radius],
                        [targetNode.theta, targetNode.radius]
                    ]))
                    .attr("stroke", "red")
                    .attr("stroke-width", "3px")
                    .attr("fill", "none")
                    .attr("class", "highlighted-link")
                    // overflow case test
                    // .style("display", (indirectDisplayFlag&&sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none");
                    .style("display", (inSummaryGraphDiv.indirectDisplay&&sourceNode.display&&targetNode.display)?"":"none");

                let fromx = sourceNode.radius*Math.sin(sourceNode.theta);
                let fromy = -sourceNode.radius*Math.cos(sourceNode.theta);
                let tox = targetNode.radius*Math.sin(targetNode.theta);
                let toy = -targetNode.radius*Math.cos(targetNode.theta);
                outHighlightedLink.append("path")
                    .attr("d",  getArrowHead(fromx, fromy, tox, toy))
                    .attr("fill", "red")
                    .attr("class", "highlighted-link")
                    .style("display", (sourceNode.display&&targetNode.display)?"":"none");
            });

            outWindowDiv.append("div")
                .style("background-color", "rgba(128,128,128,0.8)")
                .style("color", "white")
                .style("position", "absolute")
                .style("padding", "3px 6px 3px 6px")
                .style("left", centerX+d.radius*Math.sin(d.theta)+52+"px")
                .style("top", centerY-d.radius*Math.cos(d.theta)-22+"px")
                .text(d[0])
                .attr("id", "highlighted-domain-name");
        });

        c.addEventListener("mouseout", function () {
            c.style.stroke = "";
            c.style["stroke-width"] = "";
            d3.selectAll(".highlighted-link").remove();
            d3.select("#highlighted-domain-name").remove();
        });
    });

    outL2Link = outL2Link.data(outL2Edges)
        .enter()
        .append("path")
        .attr("d", d => curve([
                [d[0].theta, l2CircleRadius],
                [d[1].theta, l2CircleRadius]
            ])
        )
        .attr("stroke", "#DADADA")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("class", d => "link out-l2-link" + " out-l2-link-"+d[0]["index"] + " out-l2-link-"+d[1]["index"] + " link-"+d[0]["label"] + " link-"+d[1]["label"] + " link-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "out-l1-link-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");

    outL2LinkHead = outL2LinkHead.data(outL2Edges)
        .enter()
        .append("path")
        .attr("d", function (d) {
            let fromx = d[0].radius*Math.sin(d[0].theta);
            let fromy = -d[0].radius*Math.cos(d[0].theta);
            let tox = d[1].radius*Math.sin(d[1].theta);
            let toy = -d[1].radius*Math.cos(d[1].theta);
            return getArrowHead(fromx, fromy, tox, toy);
        })
        .attr("fill", "#DADADA")
        .attr("class", d => "link-head out-l2-link-head out-l2-link-head-"+d[0]["index"]+" out-l2-link-head-"+d[1]["index"]+" out-l2-link-head-"+d[0]["index"]+"-"+d[1]["index"] + " link-head-"+d[0]["label"] + " link-head-"+d[1]["label"] + " link-head-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "out-l2-link-head-"+d[0]["index"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1");

    if (outL2Flag) {
        d3.select("#out-l2-misinfo-arc").style("visibility", "hidden");
        d3.select("#out-l2-reliable-arc").style("visibility", "hidden");
        d3.select("#out-l2-others-arc").style("visibility", "hidden");
    }
    else {
        // fix to expand the existing graph
        d3.select("#out-l2-misinfo-arc").style("visibility", "hidden");
        d3.select("#out-l2-reliable-arc").style("visibility", "hidden");
        d3.select("#out-l2-others-arc").style("visibility", "hidden");
    }

    outCrossLink = outCrossLink.data(outCrossEdges)
        .enter()
        .append("path")
        .attr("d", d => curve([
                [d[0].theta, d[0].radius],
                [d[1].theta, d[1].radius]
            ])
        )
        .attr("stroke", "#DADADA")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("class", d => "link out-cross-link" + " out-cross-link-"+d[0]["level"]+"-"+d[0]["index"] + " out-cross-link-"+d[1]["level"]+"-"+d[1]["index"] + " link-"+d[0]["label"] + " link-"+d[1]["label"] + " link-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "out-cross-link-"+d[0]["level"]+"-"+d[0]["index"]+"-"+d[1]["level"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1"); 

    outCrossLinkHead = outCrossLinkHead.data(outCrossEdges)
        .enter()
        .append("path")
        .attr("d", function (d) {
            let fromx = d[0].radius*Math.sin(d[0].theta);
            let fromy = -d[0].radius*Math.cos(d[0].theta);
            let tox = d[1].radius*Math.sin(d[1].theta);
            let toy = -d[1].radius*Math.cos(d[1].theta);
            return getArrowHead(fromx, fromy, tox, toy);
        })
        .attr("fill", "#DADADA")
        .attr("class", d => "link-head out-cross-link-head out-cross-link-head-"+d[0]["level"]+"-"+d[0]["index"]+" out-cross-link-head-"+d[1]["level"]+"-"+d[1]["index"]+" out-cross-link-head-"+d[0]["level"]+"-"+d[0]["index"]+"-"+d[1]["level"]+"-"+d[1]["index"] + " link-head-"+d[0]["label"] + " link-head-"+d[1]["label"] + " link-head-"+d[0]["label"]+"-"+d[1]["label"])
        .attr("id", d => "out-cross-link-head-"+d[0]["level"]+"-"+d[0]["index"]+"-"+d[1]["level"]+"-"+d[1]["index"])
        .style("display", d => (indirectDisplayFlag&&d[0].display&&d[1].display&&!d[0].overflow&&!d[1].overflow)?"":"none")
        .style("opacity", "0")
        .transition()
            .delay(500)
            .duration(500)
            .style("opacity", "1"); 
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
    let changedCategory = event.target.targetCategory;

    let categorySettingMisinfoCheckboxDiv = document.getElementById("category-setting-misinfo-checkbox");
    let categorySettingReliableCheckboxDiv = document.getElementById("category-setting-reliable-checkbox");
    let categorySettingOthersCheckboxDiv = document.getElementById("category-setting-others-checkbox");

    let misinfo_mask = categorySettingMisinfoCheckboxDiv.checked;
    let reliable_mask = categorySettingReliableCheckboxDiv.checked;
    let others_mask = categorySettingOthersCheckboxDiv.checked;

    let currentDisplayFlag = (changedCategory=="misinformation")?misinfo_mask:((changedCategory=="reliable")?reliable_mask:others_mask);

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
        // graph view mode
        const curve = d3.lineRadial().curve(d3.curveBundle.beta(0.85));

        let inL1Nodes = d3.selectAll(".in-l1-bubble").data();
        let inL2Nodes = d3.selectAll(".in-l2-bubble").data();
        let outL1Nodes = d3.selectAll(".out-l1-bubble").data();
        let outL2Nodes = d3.selectAll(".out-l2-bubble").data();

        let displayedNodeNumberCalculator = (prev, curr) => (curr.display)?prev+1:prev;

        inL1Nodes.forEach(d => d.display = (d.label==changedCategory)?currentDisplayFlag:d.display);
        inL2Nodes.forEach(d => d.display = (d.label==changedCategory)?currentDisplayFlag:d.display);
        outL1Nodes.forEach(d => d.display = (d.label==changedCategory)?currentDisplayFlag:d.display);
        outL2Nodes.forEach(d => d.display = (d.label==changedCategory)?currentDisplayFlag:d.display);
        
        inL1Nodes.displayedNodeNumber = inL1Nodes.reduce(displayedNodeNumberCalculator, 0);
        inL2Nodes.displayedNodeNumber = inL2Nodes.reduce(displayedNodeNumberCalculator, 0);
        outL1Nodes.displayedNodeNumber = outL1Nodes.reduce(displayedNodeNumberCalculator, 0);
        outL2Nodes.displayedNodeNumber = outL2Nodes.reduce(displayedNodeNumberCalculator, 0);

        const l1CircleRadius = 112.5;
        const l2CircleRadius = 185;
        const centerX = 200, centerY = 200;
        const bubbleRadius = 8;
        let inL1Flag, inL2Flag, outL1Flag, outL2Flag;
        inL1Flag = ((8+20*inL1Nodes.displayedNodeNumber)/l1CircleRadius < Math.PI*2);
        inL2Flag = ((8+20*inL2Nodes.displayedNodeNumber)/l2CircleRadius < Math.PI*2);
        outL1Flag = ((8+20*outL1Nodes.displayedNodeNumber)/l1CircleRadius < Math.PI*2);
        outL2Flag = ((8+20*outL2Nodes.displayedNodeNumber)/l2CircleRadius < Math.PI*2);

        let i = 0;
        inL1Nodes.forEach((d) => {
            d.prevI = d.i;
            d.prevTheta = (d.prevI==-1)?0:d.theta;
            d.i = (d.display)?i++:-1;
            // overflow case test
            // d.theta = (inL1Nodes.displayedNodeNumber!=0&&inL1Flag)?2*Math.PI/inL1Nodes.displayedNodeNumber*d.i:0;
            d.theta = (inL1Nodes.displayedNodeNumber!=0)?2*Math.PI/inL1Nodes.displayedNodeNumber*d.i:0;
            d.overflow = !inL1Flag;
        });
        i=0;
        inL2Nodes.forEach((d) => {
            d.prevI = d.i;
            d.prevTheta = (d.prevI==-1)?0:d.theta;
            d.i = (d.display)?i++:-1;
            // overflow case test
            // d.theta = (inL2Nodes.displayedNodeNumber!=0&&inL2Flag)?2*Math.PI/inL2Nodes.displayedNodeNumber*d.i:0;
            d.theta = (inL2Nodes.displayedNodeNumber!=0)?2*Math.PI/inL2Nodes.displayedNodeNumber*d.i:0;
            d.overflow = !inL2Flag;
        });
        i=0;
        outL1Nodes.forEach((d) => {
            d.prevI = d.i;
            d.prevTheta = (d.prevI==-1)?0:d.theta;
            d.i = (d.display)?i++:-1;
            // overflow case test
            // d.theta = (outL1Nodes.displayedNodeNumber!=0&&outL1Flag)?2*Math.PI/outL1Nodes.displayedNodeNumber*d.i:0;
            d.theta = (outL1Nodes.displayedNodeNumber!=0)?2*Math.PI/outL1Nodes.displayedNodeNumber*d.i:0;
            d.overflow = !outL1Flag;
        });
        i=0;
        outL2Nodes.forEach((d) => {
            d.prevI = d.i;
            d.prevTheta = (d.prevI==-1)?0:d.theta;
            d.i = (d.display)?i++:-1;
            // overflow case test
            // d.theta = (outL2Nodes.displayedNodeNumber!=0&&outL2Flag)?2*Math.PI/outL2Nodes.displayedNodeNumber*d.i:0;
            d.theta = (outL2Nodes.displayedNodeNumber!=0)?2*Math.PI/outL2Nodes.displayedNodeNumber*d.i:0;
            d.overflow = !outL2Flag;
        });

        // show or hide from graph
        if (currentDisplayFlag) {
            // Selected to additionally display
            d3.selectAll(".bubble")
                // overflow case test
                // .style("display", d => (!d.overflow&&d.display)?"":"none")
                .style("display", d => (d.display&&(indirectDisplayFlag||d.level=="l1"))?"":"none")
                .transition()
                .duration(500)
                .tween("", d => function (t) {
                    d3.select("#"+d.direction+"-"+d.level+"-bubble-"+d.index)
                        .attr("cx", String(d.radius*Math.sin(d.prevTheta*(1-t)+d.theta*t)))
                        .attr("cy", String(-d.radius*Math.cos(d.prevTheta*(1-t)+d.theta*t)));
                });
            
            d3.selectAll(".link")
                .style("display", ([sourceNode, targetNode]) => {
                    return (!sourceNode.overflow&&!targetNode.overflow&&sourceNode.display&&targetNode.display&&(indirectDisplayFlag||(sourceNode.level=="l1"&&targetNode.level=="l1")))?"":"none";
                })
                .transition()
                    .duration(500)
                    // .style("opacity", "0")
                    .attr("d", 
                        d => curve([
                            [d[0].theta, d[0].radius],
                            [d[1].theta, d[1].radius]
                        ]))
                .transition()
                    .duration(500)
                    .style("opacity", "1");

            d3.selectAll(".link-head")
                .style("display", ([sourceNode, targetNode]) => {
                    return (!sourceNode.overflow&&!targetNode.overflow&&sourceNode.display&&targetNode.display&&(indirectDisplayFlag||(sourceNode.level=="l1"&&targetNode.level=="l1")))?"":"none";
                })
                .transition()
                    .duration(500)
                    .attr("d", function (d) {
                        let fromx = d[0].radius*Math.sin(d[0].theta);
                        let fromy = -d[0].radius*Math.cos(d[0].theta);
                        let tox = d[1].radius*Math.sin(d[1].theta);
                        let toy = -d[1].radius*Math.cos(d[1].theta);
                        return getArrowHead(fromx, fromy, tox, toy);
                    })
                .transition()
                    .duration(500)
                    .style("opacity", "1");

            d3.selectAll(".bubble-"+changedCategory)
                .style("display", d => {
                    if (d.level == "l2" && !indirectDisplayFlag) {
                        return "none";
                    }
                    else {
                        return "";
                    }
                })
                .style("opacity", d => (d.level=="l2"&&!inSummaryGraphDiv.indirectDisplay)?"0":"1");

            d3.selectAll(".link-"+changedCategory)
                .style("display", function ([sourceNode, targetNode]) {
                    if (sourceNode.level == "l2" && !indirectDisplayFlag) {
                        return "none";
                    }
                    else if (targetNode.level == "l2" && !indirectDisplayFlag) {
                        return "none";
                    }
                    else if (!sourceNode.display) {
                        return "none";
                    }
                    else if (!targetNode.display) {
                        return "none";
                    }
                    else if (!inL1Flag && ((sourceNode.level=="l1"&&sourceNode.direction=="in") || (targetNode.level=="l1"&&targetNode.direction=="in"))) {
                        return "none";
                    }
                    else if (!outL1Flag && ((sourceNode.level=="l1"&&sourceNode.direction=="out") || (targetNode.level=="l1"&&targetNode.direction=="out"))) {
                        return "none";
                    }
                    else if (!inL2Flag && ((sourceNode.level=="l2"&&sourceNode.direction=="in") || (targetNode.level=="l2"&&targetNode.direction=="in"))) {
                        return "none";
                    }
                    else if (!outL2Flag && ((sourceNode.level=="l2"&&sourceNode.direction=="out") || (targetNode.level=="l2"&&targetNode.direction=="out"))) {
                        return "none";
                    }
                    else {
                        return "";
                    }
                })
                .transition()
                    .delay(500)
                    .duration(500)
                    .style("opacity", "1");

            d3.selectAll(".link-head-"+changedCategory)
                .style("display", function ([sourceNode, targetNode]) {
                    if (sourceNode.level == "l2" && !indirectDisplayFlag) {
                        return "none";
                    }
                    else if (targetNode.level == "l2" && !indirectDisplayFlag) {
                        return "none";
                    }
                    else if (!sourceNode.display) {
                        return "none";
                    }
                    else if (!targetNode.display) {
                        return "none";
                    }
                    else if (!inL1Flag && ((sourceNode.level=="l1"&&sourceNode.direction=="in") || (targetNode.level=="l1"&&targetNode.direction=="in"))) {
                        return "none";
                    }
                    else if (!outL1Flag && ((sourceNode.level=="l1"&&sourceNode.direction=="out") || (targetNode.level=="l1"&&targetNode.direction=="out"))) {
                        return "none";
                    }
                    else if (!inL2Flag && ((sourceNode.level=="l2"&&sourceNode.direction=="in") || (targetNode.level=="l2"&&targetNode.direction=="in"))) {
                        return "none";
                    }
                    else if (!outL2Flag && ((sourceNode.level=="l2"&&sourceNode.direction=="out") || (targetNode.level=="l2"&&targetNode.direction=="out"))) {
                        return "none";
                    }
                    else {
                        return "";
                    }
                })
                .transition()
                    .delay(500)
                    .duration(500)
                    .style("opacity", "1");
        }
        else {
            // Selected to hide
            d3.selectAll(".bubble")
                // overflow case test
                // .style("display", d => (!d.overflow&&d.display)?"":"none")
                .style("display", d => (d.display&&(indirectDisplayFlag||d.level=="l1"))?"":"none")
                .transition()
                .duration(500)
                .tween("", d => function (t) {
                    d3.select("#"+d.direction+"-"+d.level+"-bubble-"+d.index)
                    .attr("cx", String(d.radius*Math.sin(d.prevTheta*(1-t)+d.theta*t)))
                    .attr("cy", String(-d.radius*Math.cos(d.prevTheta*(1-t)+d.theta*t)));
                });

            d3.selectAll(".link")
                .style("display", ([sourceNode, targetNode]) => (!sourceNode.overflow&&!targetNode.overflow&&sourceNode.display&&targetNode.display&&(indirectDisplayFlag||(sourceNode.level=="l1"&&targetNode.level=="l1")))?"":"none")
                .transition()
                    .duration(500)
                    // .style("opacity", "0")
                    .attr("d", 
                        d => curve([
                            [d[0].theta, d[0].radius],
                            [d[1].theta, d[1].radius]
                        ]))
                .transition()
                    .duration(500)
                    .style("opacity", "1");

            d3.selectAll(".link-head")
                .style("display", ([sourceNode, targetNode]) => (!sourceNode.overflow&&!targetNode.overflow&&sourceNode.display&&targetNode.display&&(indirectDisplayFlag||(sourceNode.level=="l1"&&targetNode.level=="l1")))?"":"none")
                .transition()
                    .duration(500)
                    // .style("opacity", "0")
                    .attr("d", function (d) {
                        let fromx = d[0].radius*Math.sin(d[0].theta);
                        let fromy = -d[0].radius*Math.cos(d[0].theta);
                        let tox = d[1].radius*Math.sin(d[1].theta);
                        let toy = -d[1].radius*Math.cos(d[1].theta);
                        return getArrowHead(fromx, fromy, tox, toy);
                    })
                .transition()
                    .duration(500)
                    .style("opacity", "1");

            d3.selectAll(".bubble-"+changedCategory)
                .transition()
                    .duration(500)
                    .style("opacity", "0")
                .transition()
                    .style("display", "none");

            d3.selectAll(".link-"+changedCategory)
                .transition()
                    .duration(500)
                    .style("opacity", "0")
                .transition()
                    .style("display", "none");

            d3.selectAll(".link-head-"+changedCategory)
                .transition()
                    .duration(500)
                    .style("opacity", "0")
                .transition()
                    .style("display", "none");
        }
    }
}

function drawSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber) {
    let inSummaryGraphDiv = document.getElementById("in-summary-graph");
    let directionSettingCheckboxInput = document.getElementById("direction-setting-checkbox");

    let outLinkDisplayFlag = directionSettingCheckboxInput.checked;
    let normliazedFlag = inSummaryGraphDiv.normalized;
    let indirectDisplayFlag = inSummaryGraphDiv.indirectDisplay;

    if (normliazedFlag) {
        drawNormalizedSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber);
    }
    else {
        drawAbsoluteSummaryViewGraphs(inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber, indirectDisplayFlag, outLinkDisplayFlag);
    }

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
            if (alertFlag) {
                alertString += ", ";
            }
            alertString += "indirectly mention " + domainName;
            alertFlag = true;
        }
    }
    if (outL1FakeRate + outL1RealRate + outL1OthersRate > 1) {
        outL1FakeRate = outL1FakeNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        outL1RealRate = outL1RealNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        outL1OthersRate = outL1OthersNumber / (outL1FakeNumber + outL1RealNumber + outL1OthersNumber);
        if (outLinkDisplayFlag) {
            if (alertFlag) {
                alertString += ", ";
            }
            alertString += domainName + " directly mentions";
            alertFlag = true;
        }
    }
    if (outL2FakeRate + outL2RealRate + outL2OthersRate > 1) {
        outL2FakeRate = outL2FakeNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        outL2RealRate = outL2RealNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        outL2OthersRate = outL2OthersNumber / (outL2FakeNumber + outL2RealNumber + outL2OthersNumber);
        if (indirectDisplayFlag && outLinkDisplayFlag) {
            if (alertFlag && indirectDisplayFlag) {
                alertString += ", ";
            }
            alertString += domainName + " indirectly mentions";
            alertFlag = true;
        }
    }

    alertString += " exceed 100. Normalized view is displayed for those cases.";

    drawGraphs(inL1FakeRate, inL1RealRate, inL1OthersRate, inL2FakeRate, inL2RealRate, inL2OthersRate, outL1FakeRate, outL1RealRate, outL1OthersRate, outL2FakeRate, outL2RealRate, outL2OthersRate);

    if (alertFlag && summaryViewFlag) {
        alert(alertString);
    }
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

    d3.select("#in-l1-misinfo-arc")
        .attr("d", inL1FakeArc);
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
    let levelSettingIndirectCheckboxInput = document.getElementById("level-setting-indirect-checkbox");
    
    if (levelSettingIndirectCheckboxInput.checked) {
        levelSettingIndirectCheckboxInput.checked = false;
    }

    d3.selectAll(".l2-arc")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".in-l2-bubble")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".in-l2-link")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".in-l2-link-head")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".in-cross-link")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".in-cross-link-head")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".out-l2-bubble")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".out-l2-link")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".out-l2-link-head")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".out-cross-link")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");
    d3.selectAll(".out-cross-link-head")
        .transition()
            .duration(700)
            .style("opacity", "0")
        .transition()
            .style("display", "none");

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
    let levelSettingDirectCheckboxInput = document.getElementById("level-setting-direct-checkbox");
    
    if (levelSettingDirectCheckboxInput.checked) {
        levelSettingDirectCheckboxInput.checked = false;
    }
    
    d3.selectAll(".l2-arc")
        .style("display", "inline-block")
        .transition()
            .duration(700)
            .style("opacity", "1");
    d3.selectAll(".in-l2-bubble")
        .style("opacity", "0")
        // overflow case test
        // .style("display", d => (d.display&&!d.overflow)?"":"none")
        .style("display", d => (d.display)?"":"none")
        .transition()
            .duration(700)
            // overflow case test
            // .style("opacity", d => (d.display&&!d.overflow)?"1":"0");
            .style("opacity", d => d.display?"1":"0");
    d3.selectAll(".in-l2-link")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");
    d3.selectAll(".in-l2-link-head")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");
    d3.selectAll(".in-cross-link")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");
    d3.selectAll(".in-cross-link-head")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");
    d3.selectAll(".out-l2-bubble")
        // overflow case test
        // .style("display", d => (d.display&&!d.overflow)?"":"none")
        .style("opacity", "0")
        .style("display", d => (d.display)?"":"none")
        .transition()
            .duration(700)
            // overflow case test
            // .style("opacity", d => (d.display&&!d.overflow)?"1":"0");
            .style("opacity", d => (d.display)?"1":"0");
    d3.selectAll(".out-l2-link")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");
    d3.selectAll(".out-l2-link-head")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");
    d3.selectAll(".out-cross-link")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");
    d3.selectAll(".out-cross-link-head")
        .style("opacity", "0")
        .style("display", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"":"none")
        .transition()
            .duration(700)
            .style("opacity", ([sourceNode, targetNode]) => (sourceNode.display&&targetNode.display&&!sourceNode.overflow&&!targetNode.overflow)?"1":"0");

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


    if (indirectDisplay) {
        // inStatementSecondRowDiv.innerText = "directly or indirectly";
        // outStatementSecondRowDiv.innerText = "directly or indirectly";
        inStatementSecondRowDiv.innerText = "";
        outStatementSecondRowDiv.innerText = "";
    }
    else {
        // inStatementSecondRowDiv.innerText = "directly";
        // outStatementSecondRowDiv.innerText = "directly";
        inStatementSecondRowDiv.innerText = "";
        outStatementSecondRowDiv.innerText = "";
    }

    if (inNumber <= 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + label + " website";  
        inStatementSecondRowDiv.innerText += " is mentioning";
    }
    else if (inNumber > 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + label + " websites";  
        inStatementSecondRowDiv.innerText += " are mentioning";
    }
    if (outNumber <= 1) {
        outStatementSecondRowDiv.innerText += " is mentioning";
        outStatementThirdRowDiv.innerText = String(outNumber) + " " + label + " website";  
    }
    else if (outNumber > 1) {
        outStatementSecondRowDiv.innerText += " are mentioning";
        outStatementThirdRowDiv.innerText = String(outNumber) + " " + label + " websites";  
    } 
}

function percentageSetting(inNumber, outNumber, inTotal, outTotal) {
    let inGraphPercentageDiv = document.getElementById("in-graph-percentage");
    let outGraphPercentageDiv = document.getElementById("out-graph-percentage");
    if (inTotal == 0) {
        inGraphPercentageDiv.innerText = "0%";
    }
    else {
        inGraphPercentageDiv.innerText = String(Math.round(1000*inNumber/inTotal)/10) + "%";
    }
    if (outTotal == 0) {
        outGraphPercentageDiv.innerText = "0%";
    }
    else {
        outGraphPercentageDiv.innerText = String(Math.round(1000*outNumber/outTotal)/10) + "%";
    }
}

export function directionCheckboxFunction() {
    if (this.checked) {
        showOutgoingDirectionGraph();
    }
    else {
        hideOutgoingDirectionGraph();
    }
}

function showOutgoingDirectionGraph() {
    let t = d3.transition().duration(1000);

    d3.select("#contents").transition(t).style("width", "1002px");
    d3.select("#main").transition(t).style("width", "900px");
    d3.select("#header").transition(t).style("width", "980px");
    d3.select("#setting").transition(t).style("width", "950px");

    d3.select("#in-summary-graph")
        .transition()
            .delay(1000)
            .duration(2000)
            .style("left", "-250px")

    d3.select("#out-summary-graph")
    .transition()
        .delay(900)
        .duration(2000)
        .style("position", "absolute")
        .style("left", "500px")
        .style("display", "inline-block")
        .style("opacity", "1");

}

function hideOutgoingDirectionGraph() {
    d3.select("#in-summary-graph")
    .transition()
        .duration(1200)
        .style("left", "0px")
    .transition()
        .style("position", "relative")

    d3.select("#out-summary-graph")
    .transition()
        .duration(2000)
        .style("opacity", "0")
    .transition()
        .style("display", "none")
        .style("position", "")
        .style("left", "");

    let t = d3.transition().duration(1200);
    
    d3.select("#contents").transition(t).style("width", "752px");
    d3.select("#main").transition(t).style("width", "650px");
    d3.select("#header").transition(t).style("width", "730px");
    d3.select("#setting").transition(t).style("width", "700px");

}
