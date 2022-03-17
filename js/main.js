// append components
// let mainDiv = document.getElementById("main")




import { domainName, getData, getLabelName, getColor } from "./data.js";
import { MISINFORMATION_COLOR, RELIABLE_COLOR, OTHERS_COLOR } from "./data.js";
import { toggleTwitterPopup, toggleSearchDisplay, iconButtonHovered, iconButtonOut } from "./functions.js";

let label, inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber;
getData().then(
    data => {
        makeMainWindow(domainName, data);
    }
);

export function makeMainWindow(domainName, data) {
    let label, inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber;

    let mainDiv = document.getElementById("main")
    mainDiv.innerHTML = "";

    let inSummaryGraphDiv = document.createElement("div");
    let outSummaryGraphDiv = document.createElement("div");
    let iconDiv = document.createElement("div");
    inSummaryGraphDiv.setAttribute("id", "in-summary-graph");
    outSummaryGraphDiv.setAttribute("id", "out-summary-graph");
    iconDiv.setAttribute("id", "icon");
    mainDiv.appendChild(inSummaryGraphDiv);
    mainDiv.appendChild(outSummaryGraphDiv);
    mainDiv.appendChild(iconDiv);


    // main part
    let inStatementDiv = document.createElement("div");
    let inStatementGraphViewDiv = document.createElement("div");
    let inGraphDiv = document.createElement("div");
    inStatementDiv.setAttribute("id", "in-statement");
    inStatementGraphViewDiv.setAttribute("id", "in-statement-graph-view");
    inGraphDiv.setAttribute("id", "in-graph");
    inSummaryGraphDiv.appendChild(inStatementDiv);
    inSummaryGraphDiv.appendChild(inStatementGraphViewDiv);
    inSummaryGraphDiv.appendChild(inGraphDiv);

    label = getLabelName(data[domainName]["label"]);
    inL1FakeNumber = data[domainName]["inL1FakeNumber"];
    inL1RealNumber = data[domainName]["inL1RealNumber"];
    inL1OthersNumber = data[domainName]["inL1OthersNumber"];
    inL2FakeNumber = data[domainName]["inL2FakeNumber"];
    inL2RealNumber = data[domainName]["inL2RealNumber"];
    inL2OthersNumber = data[domainName]["inL2OthersNumber"];
    outL1FakeNumber = data[domainName]["outL1FakeNumber"];
    outL1RealNumber = data[domainName]["outL1RealNumber"];
    outL1OthersNumber = data[domainName]["outL1OthersNumber"];
    outL2FakeNumber = data[domainName]["outL2FakeNumber"];
    outL2RealNumber = data[domainName]["outL2RealNumber"];
    outL2OthersNumber = data[domainName]["outL2OthersNumber"];

    inSummaryGraphDiv.label = label;
    inSummaryGraphDiv.inL1FakeNumber = inL1FakeNumber;
    inSummaryGraphDiv.inL1RealNumber = inL1RealNumber;
    inSummaryGraphDiv.inL1OthersNumber = inL1OthersNumber;
    inSummaryGraphDiv.inL2FakeNumber = inL2FakeNumber;
    inSummaryGraphDiv.inL2RealNumber = inL2RealNumber;
    inSummaryGraphDiv.inL2OthersNumber = inL2OthersNumber;
    inSummaryGraphDiv.fakeDisplay = true;
    inSummaryGraphDiv.realDisplay = true;
    inSummaryGraphDiv.othersDisplay = true;
    inSummaryGraphDiv.normalized = true;
    inSummaryGraphDiv.indirectDisplay = true;
    inSummaryGraphDiv.summaryView = true;
    inSummaryGraphDiv.inL1Domains = data[domainName]["L1InLinked"];
    inSummaryGraphDiv.inL2Domains = data[domainName]["L2InLinked"];

    outSummaryGraphDiv.label = label;
    outSummaryGraphDiv.outL1FakeNumber = outL1FakeNumber;
    outSummaryGraphDiv.outL1RealNumber = outL1RealNumber;
    outSummaryGraphDiv.outL1OthersNumber = outL1OthersNumber;
    outSummaryGraphDiv.outL2FakeNumber = outL2FakeNumber;
    outSummaryGraphDiv.outL2RealNumber = outL2RealNumber;
    outSummaryGraphDiv.outL2OthersNumber = outL2OthersNumber;
    outSummaryGraphDiv.fakeDisplay = true;
    outSummaryGraphDiv.realDisplay = true;
    outSummaryGraphDiv.othersDisplay = true;
    outSummaryGraphDiv.normalized = true;
    outSummaryGraphDiv.indirectDisplay = true;
    outSummaryGraphDiv.summaryView = true;
    outSummaryGraphDiv.outL1Domains = data[domainName]["L1OutLinked"];
    outSummaryGraphDiv.outL2Domains = data[domainName]["L2OutLinked"];

    let color = getColor(label);

    // statement div

    let inStatementFirstRowDiv = document.createElement("div");
    let inStatementSecondRowDiv = document.createElement("div");
    let inStatementThirdRowDiv = document.createElement("div");
    inStatementFirstRowDiv.setAttribute("id", "in-statement-first-row");
    inStatementSecondRowDiv.setAttribute("id", "in-statement-second-row");
    inStatementThirdRowDiv.setAttribute("id", "in-statement-third-row");
    inStatementFirstRowDiv.style.color = color;
    
    let inNumber;
    if (label == "misinformation") {
        inNumber = inL1FakeNumber + inL2FakeNumber;
    }
    else if (label == "reliable") {
        inNumber = inL1RealNumber + inL2RealNumber;
    }
    else if (label == "other") {
        inNumber = inL1OthersNumber + inL2OthersNumber;
    }

    if (inNumber <= 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + label + " website";  
        // inStatementSecondRowDiv.innerText = "directly or indirectly mentions";
        inStatementSecondRowDiv.innerText = "is mentioning";
    }
    else if (inNumber > 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + label + " websites";  
        // inStatementSecondRowDiv.innerText = "directly or indirectly mention";
        inStatementSecondRowDiv.innerText = "are mentioning";
    }

    inStatementThirdRowDiv.innerText = domainName;

    inStatementDiv.appendChild(inStatementFirstRowDiv);
    inStatementDiv.appendChild(inStatementSecondRowDiv);
    inStatementDiv.appendChild(inStatementThirdRowDiv);

    let inStatementGraphViewTextDiv = document.createElement("div");
    let inStatementGraphViewDomainNameDiv = document.createElement("div");
    inStatementGraphViewTextDiv.setAttribute("id", "in-statement-graph-view-text");
    inStatementGraphViewDomainNameDiv.setAttribute("id", "in-statement-graph-view-domain-name");
    inStatementGraphViewTextDiv.innerText = "Websites mentioning ";
    inStatementGraphViewDomainNameDiv.innerText = domainName;
    inStatementGraphViewDiv.appendChild(inStatementGraphViewTextDiv);
    inStatementGraphViewDiv.appendChild(inStatementGraphViewDomainNameDiv);

    // graph
    let inGraph = d3.select("#in-graph");
    let inSvg = inGraph.append("svg").attr("id", "in-graph-svg");
    let inG = inSvg.append("g").attr("id", "in-graph-svg-g")

    // define gradient for empty arc
    let inL1EmptyArcGradient = inSvg.append("defs").append("radialGradient");
    inL1EmptyArcGradient.attr("id", "in-l1-empty-arc-gradient");
    inL1EmptyArcGradient.append("stop")
            .attr("offset", "80%")
            .attr("stop-color", "#EAEAEA");
    inL1EmptyArcGradient.append("stop")
            .attr("offset", "95%")
            .attr("stop-color", "white");


    // Normalized, in-link
    // L1 hyperlinks
    let inL1FakeRate = 0, inL1RealRate = 0, inL1OthersRate = 0;
    let inL1Total = inL1FakeNumber + inL1RealNumber + inL1OthersNumber;
    if (inL1Total > 0) {
        inL1FakeRate = inL1FakeNumber / inL1Total;
        inL1RealRate = inL1RealNumber / inL1Total;
        inL1OthersRate = inL1OthersNumber / inL1Total;
    }
    let inL1EmptyArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(0).endAngle(2*Math.PI);
    let inL1FakeArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(0).endAngle(inL1FakeRate*360*Math.PI/180);
    let inL1RealArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(inL1FakeRate*360*Math.PI/180).endAngle((inL1FakeRate+inL1RealRate)*360*Math.PI/180);
    let inL1OthersArc = d3.arc().innerRadius(100).outerRadius(125).startAngle((inL1FakeRate+inL1RealRate)*360*Math.PI/180).endAngle((inL1FakeRate+inL1RealRate+inL1OthersRate)*360*Math.PI/180);
    // inG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "in-l1-empty-arc").attr("d", inL1EmptyArc).attr("fill", "#E9E9E9").attr("transform", "translate(250, 165)");
    inG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "in-l1-empty-arc").attr("d", inL1EmptyArc).attr("fill", "url(#in-l1-empty-arc-gradient)").attr("transform", "translate(250, 165)");
    inG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "in-l1-misinfo-arc").attr("d", inL1FakeArc).attr("fill", MISINFORMATION_COLOR).attr("transform", "translate(250, 165)");
    inG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "in-l1-reliable-arc").attr("d", inL1RealArc).attr("fill", RELIABLE_COLOR).attr("transform", "translate(250, 165)");
    inG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "in-l1-others-arc").attr("d", inL1OthersArc).attr("fill", OTHERS_COLOR).attr("transform", "translate(250, 165)");

    // define gradient for empty arc
    let inL2EmptyArcGradient = inSvg.append("defs").append("radialGradient");
    inL2EmptyArcGradient.attr("id", "in-l2-empty-arc-gradient");
    inL2EmptyArcGradient.append("stop")
            .attr("offset", "81.5%")
            .attr("stop-color", "#EAEAEA");
    inL2EmptyArcGradient.append("stop")
            .attr("offset", "95%")
            .attr("stop-color", "white");

    // L2 hyperlinks
    let inL2FakeRate = 0, inL2RealRate = 0, inL2OthersRate = 0;
    let inL2Total = inL2FakeNumber + inL2RealNumber + inL2OthersNumber;
    if (inL2Total > 0) {
        inL2FakeRate = inL2FakeNumber / inL2Total;
        inL2RealRate = inL2RealNumber / inL2Total;
        inL2OthersRate = inL2OthersNumber / inL2Total;
    }
    // let inL2EmptyArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(2*Math.PI);
    let inL2EmptyArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(2*Math.PI);
    let inL2FakeArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(inL2FakeRate*360*Math.PI/180);
    let inL2RealArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(inL2FakeRate*360*Math.PI/180).endAngle((inL2FakeRate+inL2RealRate)*360*Math.PI/180);
    let inL2OthersArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle((inL2FakeRate+inL2RealRate)*360*Math.PI/180).endAngle((inL2FakeRate+inL2RealRate+inL2OthersRate)*360*Math.PI/180);
    inG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "in-l2-empty-arc").attr("d", inL2EmptyArc).attr("fill", "url(#in-l2-empty-arc-gradient)").attr("transform", "translate(250, 165)");
    inG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "in-l2-misinfo-arc").attr("d", inL2FakeArc).attr("fill", MISINFORMATION_COLOR).attr("transform", "translate(250, 165)");
    inG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "in-l2-reliable-arc").attr("d", inL2RealArc).attr("fill", RELIABLE_COLOR).attr("transform", "translate(250, 165)");
    inG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "in-l2-others-arc").attr("d", inL2OthersArc).attr("fill", OTHERS_COLOR).attr("transform", "translate(250, 165)");

    // Hyperlink percentage
    inGraph = document.getElementById("in-graph");
    let inGraphPercentageDiv = document.createElement("div");
    inGraphPercentageDiv.setAttribute("id", "in-graph-percentage");
    inGraphPercentageDiv.style.color = color;
    inGraphPercentageDiv.innerText = String(Math.round(1000*(inL1FakeNumber+inL2FakeNumber)/(inL1FakeNumber+inL1RealNumber+inL1OthersNumber+inL2FakeNumber+inL2RealNumber+inL2OthersNumber))/10) + "%";
    inGraph.appendChild(inGraphPercentageDiv);

    // Arc Hovered
    inGraph = d3.select("#in-graph");
    let inHighlightDiv = inGraph.append("div").attr("id", "in-highlight");
    let inHighlightSvg = inHighlightDiv.append("svg").attr("id", "in-highlight-svg");
    let inHighlightG = inHighlightSvg.append("g").attr("id", "in-highlight-svg-g");

    document.getElementById("in-graph-svg-g").addEventListener("mouseover", function (e) {
        let arcElementId = e.target.getAttribute("id");
        let arcElementD = e.target.getAttribute("d")
        let arcElementFill = e.target.getAttribute("fill");
        let arcElementTransform = e.target.getAttribute("transform");

        let inL1Total = inSummaryGraphDiv.inL1FakeNumber*inSummaryGraphDiv.fakeDisplay + inSummaryGraphDiv.inL1RealNumber*inSummaryGraphDiv.realDisplay + inSummaryGraphDiv.inL1OthersNumber*inSummaryGraphDiv.othersDisplay;
        let inL2Total = inSummaryGraphDiv.inL2FakeNumber*inSummaryGraphDiv.fakeDisplay + inSummaryGraphDiv.inL2RealNumber*inSummaryGraphDiv.realDisplay + inSummaryGraphDiv.inL2OthersNumber*inSummaryGraphDiv.othersDisplay;
        let count = 0, percentage = 0;
        let strokeColor = "black";

        if (arcElementId == "in-l1-misinfo-arc") {
            count = inSummaryGraphDiv.inL1FakeNumber
            percentage = (inL1Total!=0)?count/inL1Total:0;
            // strokeColor = "#6A2F00";
        }
        else if (arcElementId == "in-l1-reliable-arc") {
            count = inSummaryGraphDiv.inL1RealNumber;
            percentage = (inL1Total!=0)?count/inL1Total:0;
            // strokeColor = "#004F39";
        }
        else if (arcElementId == "in-l1-others-arc") {
            count = inSummaryGraphDiv.inL1OthersNumber;
            percentage = (inL1Total!=0)?count/inL1Total:0;
            // strokeColor = "#3F3F3F";
        }
        else if (arcElementId == "in-l2-misinfo-arc") {
            count = inSummaryGraphDiv.inL2FakeNumber
            percentage = (inL2Total!=0)?count/inL2Total:0;
            // strokeColor = "#D55E00";
        }
        else if (arcElementId == "in-l2-reliable-arc") {
            count = inSummaryGraphDiv.inL2RealNumber
            percentage = (inL2Total!=0)?count/inL2Total:0;
            // strokeColor = "#009E73";
        }
        else if (arcElementId == "in-l2-others-arc") {
            count = inSummaryGraphDiv.inL2OthersNumber
            percentage = (inL2Total!=0)?count/inL2Total:0;
            // strokeColor = "#7F7F7F";
        }
        percentage = Math.round(1000*percentage)/10;
        
        if (arcElementId != "in-l1-empty-arc" && arcElementId != "in-l2-empty-arc") {
            inHighlightG.append("path")
                .attr("id", "in-highlight-arc")
                .attr("d", arcElementD)
                .attr("fill", "white")
                .attr("transform", arcElementTransform)
                .attr("opacity", "0.3");
                // .attr("stroke", strokeColor)
                // .attr("stroke-width", "3px");

            let highlightingText = "Count: "+count+"<br>"+"Percentage: "+percentage+"%";
            inHighlightDiv.append("div")
                .style("background-color", "rgba(128, 128, 128, 0.8)")
                .style("color", "white")
                .style("padding", "5px 7px")
                .style("position", "absolute")
                .style("left", e.layerX+2+"px")
                .style("top", e.layerY+8+"px")
                .style("text-align", "left")
                .style("width", "140px")
                .html(highlightingText)
                .attr("id", "in-highlight-info-popup");
        }
    })

    document.getElementById("in-graph-svg-g").addEventListener("mouseout", function (e) {
        d3.select("#in-highlight-arc").remove();
        d3.select("#in-highlight-info-popup").remove();
    })



    // outlink
    let outStatementDiv = document.createElement("div");
    let outStatementGraphViewDiv = document.createElement("div");
    let outGraphDiv = document.createElement("div");
    outStatementDiv.setAttribute("id", "out-statement");
    outStatementGraphViewDiv.setAttribute("id", "out-statement-graph-view");
    outGraphDiv.setAttribute("id", "out-graph");
    outSummaryGraphDiv.appendChild(outStatementDiv);
    outSummaryGraphDiv.appendChild(outStatementGraphViewDiv);
    outSummaryGraphDiv.appendChild(outGraphDiv);

    // statement div
    let outStatementFirstRowDiv = document.createElement("div");
    let outStatementSecondRowDiv = document.createElement("div");
    let outStatementThirdRowDiv = document.createElement("div");
    outStatementFirstRowDiv.setAttribute("id", "out-statement-first-row");
    outStatementSecondRowDiv.setAttribute("id", "out-statement-second-row");
    outStatementThirdRowDiv.setAttribute("id", "out-statement-third-row");
    outStatementThirdRowDiv.style.color = color;

    let outNumber;
    if (label == "misinformation") {
        outNumber = outL1FakeNumber + outL2FakeNumber;
    }
    else if (label == "reliable") {
        outNumber = outL1RealNumber + outL2RealNumber;
    }
    else if (label == "other") {
        outNumber = outL1OthersNumber + outL2OthersNumber;
    }

    if (outNumber <= 1) {
        outStatementThirdRowDiv.innerText = String(outNumber) + " " + label + " website";  // the number should be changed
    }
    else if (outNumber > 1) {
        outStatementThirdRowDiv.innerText = String(outNumber) + " " + label + " websites";  // the number should be changed
    }
    
    outStatementFirstRowDiv.innerText = domainName;
    // outStatementSecondRowDiv.innerText = "directly or indirectly mentions";
    outStatementSecondRowDiv.innerText = "is mentioning";

    outStatementDiv.appendChild(outStatementFirstRowDiv);
    outStatementDiv.appendChild(outStatementSecondRowDiv);
    outStatementDiv.appendChild(outStatementThirdRowDiv);

    let outStatementGraphViewTextDiv = document.createElement("div");
    let outStatementGraphViewDomainNameDiv = document.createElement("div");
    outStatementGraphViewTextDiv.setAttribute("id", "out-statement-graph-view-text");
    outStatementGraphViewDomainNameDiv.setAttribute("id", "out-statement-graph-view-domain-name");
    outStatementGraphViewTextDiv.innerText = "Websites mentioned by ";
    outStatementGraphViewDomainNameDiv.innerText = domainName;
    outStatementGraphViewDiv.appendChild(outStatementGraphViewTextDiv);
    outStatementGraphViewDiv.appendChild(outStatementGraphViewDomainNameDiv);

    // graph
    let outGraph = d3.select("#out-graph");
    let outSvg = outGraph.append("svg").attr("id", "out-graph-svg");
    let outG = outSvg.append("g").attr("id", "out-graph-svg-g")

    // define gradient for empty arc
    let outL1EmptyArcGradient = outSvg.append("defs").append("radialGradient");
    outL1EmptyArcGradient.attr("id", "out-l1-empty-arc-gradient");
    outL1EmptyArcGradient.append("stop")
            .attr("offset", "80%")
            .attr("stop-color", "#EAEAEA");
    outL1EmptyArcGradient.append("stop")
            .attr("offset", "95%")
            .attr("stop-color", "white");
            
    // Normalized, out-link
    let outL1FakeRate = 0, outL1RealRate = 0, outL1OthersRate = 0;
    let outL1Total = outL1FakeNumber + outL1RealNumber + outL1OthersNumber;
    if (outL1Total > 0) {
        outL1FakeRate = outL1FakeNumber / outL1Total;
        outL1RealRate = outL1RealNumber / outL1Total;
        outL1OthersRate = outL1OthersNumber / outL1Total;
    }
    let outL1EmptyArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(0).endAngle(2*Math.PI);
    let outL1FakeArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(0).endAngle(outL1FakeRate*360*Math.PI/180);
    let outL1RealArc = d3.arc().innerRadius(100).outerRadius(125).startAngle(outL1FakeRate*360*Math.PI/180).endAngle((outL1FakeRate+outL1RealRate)*360*Math.PI/180);
    let outL1OthersArc = d3.arc().innerRadius(100).outerRadius(125).startAngle((outL1FakeRate+outL1RealRate)*360*Math.PI/180).endAngle((outL1FakeRate+outL1RealRate+outL1OthersRate)*360*Math.PI/180);
    outG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "out-l1-empty-arc").attr("d", outL1EmptyArc).attr("fill", "url(#out-l1-empty-arc-gradient)").attr("transform", "translate(250, 165)");
    outG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "out-l1-misinfo-arc").attr("d", outL1FakeArc).attr("fill", MISINFORMATION_COLOR).attr("transform", "translate(250, 165)");
    outG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "out-l1-reliable-arc").attr("d", outL1RealArc).attr("fill", RELIABLE_COLOR).attr("transform", "translate(250, 165)");
    outG.append("path").attr("class", "arc").attr("class", "l1-arc").attr("id", "out-l1-others-arc").attr("d", outL1OthersArc).attr("fill", OTHERS_COLOR).attr("transform", "translate(250, 165)");

    // define gradient for empty arc
    let outL2EmptyArcGradient = outSvg.append("defs").append("radialGradient");
    outL2EmptyArcGradient.attr("id", "out-l2-empty-arc-gradient");
    outL2EmptyArcGradient.append("stop")
            .attr("offset", "81.5%")
            .attr("stop-color", "#EAEAEA");
    outL2EmptyArcGradient.append("stop")
            .attr("offset", "95%")
            .attr("stop-color", "white");

    // L2 hyperlinks
    let outL2FakeRate = 0, outL2RealRate = 0, outL2OthersRate = 0;
    let outL2Total = outL2FakeNumber + outL2RealNumber + outL2OthersNumber;
    if (outL2Total > 0) {
        outL2FakeRate = outL2FakeNumber / outL2Total;
        outL2RealRate = outL2RealNumber / outL2Total;
        outL2OthersRate = outL2OthersNumber / outL2Total;
    }
    let outL2EmptyArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(2*Math.PI);
    let outL2FakeArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(0).endAngle(outL2FakeRate*360*Math.PI/180);
    let outL2RealArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle(outL2FakeRate*360*Math.PI/180).endAngle((outL2FakeRate+outL2RealRate)*360*Math.PI/180);
    let outL2OthersArc = d3.arc().innerRadius(134.475).outerRadius(165).startAngle((outL2FakeRate+outL2RealRate)*360*Math.PI/180).endAngle((outL2FakeRate+outL2RealRate+outL2OthersRate)*360*Math.PI/180);
    outG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "out-l2-empty-arc").attr("d", outL2EmptyArc).attr("fill", "url(#out-l2-empty-arc-gradient)").attr("transform", "translate(250, 165)");
    outG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "out-l2-misinfo-arc").attr("d", outL2FakeArc).attr("fill", MISINFORMATION_COLOR).attr("transform", "translate(250, 165)");
    outG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "out-l2-reliable-arc").attr("d", outL2RealArc).attr("fill", RELIABLE_COLOR).attr("transform", "translate(250, 165)");
    outG.append("path").attr("class", "arc").attr("class", "l2-arc").attr("id", "out-l2-others-arc").attr("d", outL2OthersArc).attr("fill", OTHERS_COLOR).attr("transform", "translate(250, 165)");

    // Hyperlink percentage
    let graphPercentageDiv = document.createElement("div")
    outGraph = document.getElementById("out-graph");
    graphPercentageDiv.setAttribute("id", "out-graph-percentage");
    graphPercentageDiv.style.color = color;
    if ((outL1FakeNumber+outL1RealNumber+outL1OthersNumber+outL2FakeNumber+outL2RealNumber+outL2OthersNumber) != 0) {
        graphPercentageDiv.innerText = String(Math.round(1000*(outL1FakeNumber+outL2FakeNumber)/(outL1FakeNumber+outL1RealNumber+outL1OthersNumber+outL2FakeNumber+outL2RealNumber+outL2OthersNumber))/10) + "%";
    }
    else {
        graphPercentageDiv.innerText = "0%";
    }
    outGraph.appendChild(graphPercentageDiv);

    // Arc Hovered
    outGraph = d3.select("#out-graph");
    let outHighlightDiv = outGraph.append("div").attr("id", "out-highlight");
    let outHighlightSvg = outHighlightDiv.append("svg").attr("id", "out-highlight-svg");
    let outHighlightG = outHighlightSvg.append("g").attr("id", "out-highlight-svg-g");

    document.getElementById("out-graph-svg-g").addEventListener("mouseover", function (e) {
        let arcElementId = e.target.getAttribute("id");
        let arcElementD = e.target.getAttribute("d")
        let arcElementFill = e.target.getAttribute("fill");
        let arcElementTransform = e.target.getAttribute("transform");

        let outL1Total = outSummaryGraphDiv.outL1FakeNumber*outSummaryGraphDiv.fakeDisplay + outSummaryGraphDiv.outL1RealNumber*outSummaryGraphDiv.realDisplay + outSummaryGraphDiv.outL1OthersNumber*outSummaryGraphDiv.othersDisplay;
        let outL2Total = outSummaryGraphDiv.outL2FakeNumber*outSummaryGraphDiv.fakeDisplay + outSummaryGraphDiv.outL2RealNumber*outSummaryGraphDiv.realDisplay + outSummaryGraphDiv.outL2OthersNumber*outSummaryGraphDiv.othersDisplay;
        let count = 0, percentage = 0;
        let strokeColor = "black";

        if (arcElementId == "out-l1-misinfo-arc") {
            count = outSummaryGraphDiv.outL1FakeNumber
            percentage = (outL1Total!=0)?count/outL1Total:0;
            // strokeColor = "#6A2F00";
        }
        else if (arcElementId == "out-l1-reliable-arc") {
            count = outSummaryGraphDiv.outL1RealNumber;
            percentage = (outL1Total!=0)?count/outL1Total:0;
            // strokeColor = "#004F39";
        }
        else if (arcElementId == "out-l1-others-arc") {
            count = outSummaryGraphDiv.outL1OthersNumber;
            percentage = (outL1Total!=0)?count/outL1Total:0;
            // strokeColor = "#3F3F3F";
        }
        else if (arcElementId == "out-l2-misinfo-arc") {
            count = outSummaryGraphDiv.outL2FakeNumber
            percentage = (outL2Total!=0)?count/outL2Total:0;
            // strokeColor = "#D55E00";
        }
        else if (arcElementId == "out-l2-reliable-arc") {
            count = outSummaryGraphDiv.outL2RealNumber
            percentage = (outL2Total!=0)?count/outL2Total:0;
            // strokeColor = "#009E73";
        }
        else if (arcElementId == "out-l2-others-arc") {
            count = outSummaryGraphDiv.outL2OthersNumber
            percentage = (outL2Total!=0)?count/outL2Total:0;
            // strokeColor = "#7F7F7F";
        }
        percentage = Math.round(1000*percentage)/10;

        if (arcElementId != "out-l1-empty-arc" && arcElementId != "out-l2-empty-arc") {
            outHighlightG.append("path")
                .attr("id", "out-highlight-arc")
                .attr("d", arcElementD)
                .attr("fill", "white")
                .attr("transform", arcElementTransform)
                .attr("opacity", "0.3");
                // .attr("stroke", strokeColor)
                // .attr("stroke-width", "3px");

            let highlightingText = "Count: "+count+"<br>"+"Percentage: "+percentage+"%";
            outHighlightDiv.append("div")
                .style("background-color", "rgba(128, 128, 128, 0.8)")
                .style("color", "white")
                .style("padding", "5px 7px")
                .style("position", "absolute")
                .style("left", e.layerX+2+"px")
                .style("top", e.layerY+8+"px")
                .style("text-align", "left")
                .style("width", "140px")
                .html(highlightingText)
                .attr("id", "out-highlight-info-popup");
        }
    })

    document.getElementById("out-graph-svg-g").addEventListener("mouseout", function (e) {
        d3.select("#out-highlight-arc").remove();
        d3.select("#out-highlight-info-popup").remove();
    })

    // icons
    let twitterIconDiv = document.createElement("div");
    let searchIconDiv = document.createElement("div");
    twitterIconDiv.setAttribute("id", "twitter-icon-div");
    searchIconDiv.setAttribute("id", "search-icon-div");
    iconDiv.appendChild(twitterIconDiv);
    iconDiv.appendChild(searchIconDiv);

    d3.select("#twitter-icon-div")
        .append("svg")
            .attr("id", "twitter-icon-svg")
            .attr("class", "icon-svg")
            .style("cursor", "pointer")
            .on("mouseover", iconButtonHovered)
            .on("mouseout", iconButtonOut)
            .on("click", toggleTwitterPopup)
        .append("g")
            .attr("id", "twitter-icon-g")
            .style("pointer-events", "none")
        .append("path")
            .attr("d", "M 48 0 V 48 H 5 a 5,5 0 0,1 -5,-5 V 5 a 5,5 0 0,1 5,-5 z")
            .attr("fill", "white")
            .attr("id", "twitter-icon-path")
            .style("pointer-events", "none");

    d3.select("#search-icon-div")
        .append("svg")
            .attr("id", "search-icon-svg")
            .attr("class", "icon-svg")
            .style("cursor", "pointer")
            .on("mouseover", iconButtonHovered)
            .on("mouseout", iconButtonOut)
            .on("click", toggleSearchDisplay)
        .append("g")
            .attr("id", "search-icon-g")
            .style("pointer-events", "none")
        .append("path")
            .attr("d", "M 48 0 V 48 H 5 a 5,5 0 0,1 -5,-5 V 5 a 5,5 0 0,1 5,-5 z")
            .attr("fill", "white")
            .attr("id", "search-icon-path")
            .style("pointer-events", "none");

    let twitterIconSpan = document.createElement("span");
    twitterIconSpan.setAttribute("class", "material-icons");
    twitterIconSpan.setAttribute("id", "twitter-icon");
    twitterIconSpan.innerText = "sms";
    twitterIconDiv.appendChild(twitterIconSpan);

    let searchIconSpan = document.createElement("span");
    searchIconSpan.setAttribute("class", "material-icons");
    searchIconSpan.setAttribute("id", "search-icon");
    searchIconSpan.innerText = "search";
searchIconDiv.appendChild(searchIconSpan);


}
