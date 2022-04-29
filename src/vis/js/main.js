import { domainName, study, getData, getLabelName, getColor } from "./data.js";
import { MISINFORMATION_COLOR, RELIABLE_COLOR, OTHERS_COLOR } from "./data.js";
import { summaryViewCenterX, summaryViewCenterY } from "./data.js";
import { summaryViewL1InnerRadius, summaryViewL1OuterRadius, summaryViewL2InnerRadius, summaryViewL2OuterRadius } from "./data.js";
import { toggleTwitterPopup, toggleSearchDisplay, iconButtonHovered, iconButtonOut, toggleMask, mask, displayModeChanged } from "./functions.js";

getData().then(
    data => {
        if (!study) console.log(data[domainName]);
        makeMainWindow(domainName, data[domainName]);
    }
);

export function makeMainWindow(domainName, data) {
    let t = d3.transition().duration(1200);
    d3.select("#contents").transition(t).style("width", "702px");
    d3.select("#main").transition(t).style("width", "600px");
    d3.select("#header").transition(t).style("width", "680px");
    d3.select("#setting").transition(t).style("width", "650px");
    d3.select("#domain-search-bar-header").transition(t).style("width", "680px");
    d3.select("#domain-search-list").transition(t).style("width", "680px");
    
    let label, inL1FakeNumber, inL1RealNumber, inL1OthersNumber, inL2FakeNumber, inL2RealNumber, inL2OthersNumber, outL1FakeNumber, outL1RealNumber, outL1OthersNumber, outL2FakeNumber, outL2RealNumber, outL2OthersNumber;

    let mainDiv = document.getElementById("main")
    mainDiv.innerHTML = "";

    let summaryViewGraphDescriptionDiv = document.createElement("div");
    let graphViewGraphDescriptionDiv = document.createElement("div");
    let inSummaryGraphDiv = document.createElement("div");
    let outSummaryGraphDiv = document.createElement("div");
    let iconDiv = document.createElement("div");
    summaryViewGraphDescriptionDiv.setAttribute("id", "summary-view-graph-description");
    graphViewGraphDescriptionDiv.setAttribute("id", "graph-view-graph-description");
    inSummaryGraphDiv.setAttribute("id", "in-summary-graph");
    outSummaryGraphDiv.setAttribute("id", "out-summary-graph");
    summaryViewGraphDescriptionDiv.innerHTML="";
    graphViewGraphDescriptionDiv.innerHTML=
        `<div style="width: 100%; position: absolute; top: 50%; transform: translateY(-50%); -ms-transform: translateY(-50%);">
        <p style="margin-bottom: 17px;">
        Dots are websites. The one you're visiting is shown in the middle.
        </p>
        <p>Color represents websites' reliability<span style="font-size:15px; vertical-align:top;">*</span> :</p>
        <ul style="list-style-type: none">
            <li>
                <span style="color:#e08214;">Controversial (Orange)</span>, 
                <span style="color: #542788; padding-left: 3px;">Verified (Purple)</span>, 
                <span style="color: #808080; padding-left: 3px;">Unlabeled<span style="font-size:15px; vertical-align:top;">**</span> (Gray)</span>.
            </li>
        </ul>
        <p style="margin-bottom: 0px">When website A links to website B,<br>we show an animated line going from A to B.</p>
        `;
    iconDiv.setAttribute("id", "icon");
    mainDiv.appendChild(summaryViewGraphDescriptionDiv);
    mainDiv.appendChild(graphViewGraphDescriptionDiv);
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

    label = getLabelName(data["label"]);
    inL1FakeNumber = data["inL1FakeNumber"];
    inL1RealNumber = data["inL1RealNumber"];
    inL1OthersNumber = data["inL1OthersNumber"];
    inL2FakeNumber = data["inL2FakeNumber"];
    inL2RealNumber = data["inL2RealNumber"];
    inL2OthersNumber = data["inL2OthersNumber"];
    outL1FakeNumber = data["outL1FakeNumber"];
    outL1RealNumber = data["outL1RealNumber"];
    outL1OthersNumber = data["outL1OthersNumber"];
    outL2FakeNumber = data["outL2FakeNumber"];
    outL2RealNumber = data["outL2RealNumber"];
    outL2OthersNumber = data["outL2OthersNumber"];

    inSummaryGraphDiv.domainName = domainName;
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
    inSummaryGraphDiv.inL1Domains = data["L1InLinked"];
    inSummaryGraphDiv.inL2Domains = data["L2InLinked"];

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
    outSummaryGraphDiv.outL1Domains = data["L1OutLinked"];
    outSummaryGraphDiv.outL2Domains = data["L2OutLinked"];

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
    if (label == "misinformation") inNumber = inL1FakeNumber + inL2FakeNumber;
    else if (label == "reliable") inNumber = inL1RealNumber + inL2RealNumber;
    else if (label == "other") inNumber = inL1OthersNumber + inL2OthersNumber;

    let l = (label=="reliable")?"verified":"controversial";
    if (inNumber <= 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + l + " website";  
        inStatementSecondRowDiv.innerText = "is linking to the site you are visiting";
    }
    else if (inNumber > 1) {
        inStatementFirstRowDiv.innerText = String(inNumber) + " " + l + " websites";  
        inStatementSecondRowDiv.innerText = "are linking to the site you are visiting";
    }
    // inStatementThirdRowDiv.innerText = domainName;
    // inStatementThirdRowDiv.innerText = "the site you are visiting";
    // inStatementThirdRowDiv.domainName = domainName;
    // inStatementThirdRowDiv.masked = false;
    // inStatementThirdRowDiv.setAttribute("class", "masked-in-study");

    inStatementDiv.appendChild(inStatementFirstRowDiv);
    inStatementDiv.appendChild(inStatementSecondRowDiv);
    // inStatementDiv.appendChild(inStatementThirdRowDiv);

    let inStatementGraphViewTextDiv = document.createElement("div");
    let inStatementGraphViewDomainNameDiv = document.createElement("div");
    inStatementGraphViewTextDiv.setAttribute("id", "in-statement-graph-view-text");
    inStatementGraphViewDomainNameDiv.setAttribute("id", "in-statement-graph-view-domain-name");
    inStatementGraphViewDomainNameDiv.setAttribute("class", "masked-in-study");
    // inStatementGraphViewTextDiv.innerText = "Sites linking to the site you are visiting";
    inStatementGraphViewDomainNameDiv.innerText = domainName;
    inStatementGraphViewDomainNameDiv.domainName = domainName;
    inStatementGraphViewDomainNameDiv.masked = false;
    inStatementGraphViewDiv.appendChild(inStatementGraphViewTextDiv);
    // inStatementGraphViewDiv.appendChild(inStatementGraphViewDomainNameDiv);

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

    appendSummaryViewArc(inG, "in", "l1", "empty", 0, 2*Math.PI);
    appendSummaryViewArc(inG, "in", "l1", "misinfo", 0, inL1FakeRate*360*Math.PI/180);
    appendSummaryViewArc(inG, "in", "l1", "reliable", inL1FakeRate*360*Math.PI/180, (inL1FakeRate+inL1RealRate)*360*Math.PI/180);
    appendSummaryViewArc(inG, "in", "l1", "others", (inL1FakeRate+inL1RealRate)*360*Math.PI/180, (inL1FakeRate+inL1RealRate+inL1OthersRate)*360*Math.PI/180);

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

    appendSummaryViewArc(inG, "in", "l2", "empty", 0, 2*Math.PI);
    appendSummaryViewArc(inG, "in", "l2", "misinfo", 0, inL2FakeRate*360*Math.PI/180);
    appendSummaryViewArc(inG, "in", "l2", "reliable", inL2FakeRate*360*Math.PI/180, (inL2FakeRate+inL2RealRate)*360*Math.PI/180);
    appendSummaryViewArc(inG, "in", "l2", "others", (inL2FakeRate+inL2RealRate)*360*Math.PI/180, (inL2FakeRate+inL2RealRate+inL2OthersRate)*360*Math.PI/180);

    // Hyperlink percentage
    inGraph = document.getElementById("in-graph");
    let inGraphPercentageDiv = document.createElement("div");
    inGraphPercentageDiv.setAttribute("id", "in-graph-percentage");
    inGraphPercentageDiv.style.color = color;
    if ((inL1FakeNumber+inL1RealNumber+inL1OthersNumber+inL2FakeNumber+inL2RealNumber+inL2OthersNumber) != 0) {
        inGraphPercentageDiv.innerText = String(Math.round(1000*(inL1FakeNumber+inL2FakeNumber)/(inL1FakeNumber+inL1RealNumber+inL1OthersNumber+inL2FakeNumber+inL2RealNumber+inL2OthersNumber))/10) + "%";
    }
    else inGraphPercentageDiv.innerText = "0%";
    inGraph.appendChild(inGraphPercentageDiv);

    // Arc Hovered
    inGraph = d3.select("#in-graph");
    let inHighlightDiv = inGraph.append("div").attr("id", "in-highlight");
    let inHighlightSvg = inHighlightDiv.append("svg").attr("id", "in-highlight-svg");
    let inHighlightG = inHighlightSvg.append("g").attr("id", "in-highlight-svg-g").attr("transform", "translate(200,200)");

    document.getElementById("in-graph-svg-g").addEventListener("mouseover", function (e) {
        let arcElementId = e.target.getAttribute("id");
        let arcElementD = e.target.getAttribute("d")
        let arcElementTransform = e.target.getAttribute("transform");

        let inL1Total = inSummaryGraphDiv.inL1FakeNumber*inSummaryGraphDiv.fakeDisplay + inSummaryGraphDiv.inL1RealNumber*inSummaryGraphDiv.realDisplay + inSummaryGraphDiv.inL1OthersNumber*inSummaryGraphDiv.othersDisplay;
        let inL2Total = inSummaryGraphDiv.inL2FakeNumber*inSummaryGraphDiv.fakeDisplay + inSummaryGraphDiv.inL2RealNumber*inSummaryGraphDiv.realDisplay + inSummaryGraphDiv.inL2OthersNumber*inSummaryGraphDiv.othersDisplay;
        let count = 0, percentage = 0;

        if (arcElementId == "in-l1-misinfo-arc") {
            count = inSummaryGraphDiv.inL1FakeNumber
            percentage = (inL1Total!=0)?count/inL1Total:0;
        }
        else if (arcElementId == "in-l1-reliable-arc") {
            count = inSummaryGraphDiv.inL1RealNumber;
            percentage = (inL1Total!=0)?count/inL1Total:0;
        }
        else if (arcElementId == "in-l1-others-arc") {
            count = inSummaryGraphDiv.inL1OthersNumber;
            percentage = (inL1Total!=0)?count/inL1Total:0;
        }
        else if (arcElementId == "in-l2-misinfo-arc") {
            count = inSummaryGraphDiv.inL2FakeNumber
            percentage = (inL2Total!=0)?count/inL2Total:0;
        }
        else if (arcElementId == "in-l2-reliable-arc") {
            count = inSummaryGraphDiv.inL2RealNumber
            percentage = (inL2Total!=0)?count/inL2Total:0;
        }
        else if (arcElementId == "in-l2-others-arc") {
            count = inSummaryGraphDiv.inL2OthersNumber
            percentage = (inL2Total!=0)?count/inL2Total:0;
        }
        percentage = Math.round(1000*percentage)/10;
        
        if (arcElementId != "in-l1-empty-arc" && arcElementId != "in-l2-empty-arc") {
            inHighlightG.append("path")
                .attr("id", "in-highlight-arc")
                .attr("d", arcElementD)
                .attr("fill", "white")
                .attr("transform", arcElementTransform)
                .attr("opacity", "0.3");

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
    if (label == "misinformation") outNumber = outL1FakeNumber + outL2FakeNumber;
    else if (label == "reliable") outNumber = outL1RealNumber + outL2RealNumber;
    else if (label == "other") outNumber = outL1OthersNumber + outL2OthersNumber;
    l = (label=="reliable")?"verified":"controversial";

    if (outNumber <= 1) outStatementThirdRowDiv.innerText = String(outNumber) + " " + l + " website";  // the number should be changed
    else if (outNumber > 1) outStatementThirdRowDiv.innerText = String(outNumber) + " " + l + " websites";  // the number should be changed
    
    // outStatementFirstRowDiv.innerText = domainName;
    // outStatementFirstRowDiv.innerText = "The site you are visiting";
    // outStatementFirstRowDiv.domainName = domainName;
    // outStatementFirstRowDiv.maksed = false;
    // outStatementFirstRowDiv.setAttribute("class", "masked-in-study")
    // outStatementSecondRowDiv.innerText = "Sites you are visiting is linking to";

    outStatementDiv.appendChild(outStatementFirstRowDiv);
    outStatementDiv.appendChild(outStatementSecondRowDiv);
    outStatementDiv.appendChild(outStatementThirdRowDiv);

    let outStatementGraphViewTextDiv = document.createElement("div");
    let outStatementGraphViewDomainNameDiv = document.createElement("div");
    outStatementGraphViewTextDiv.setAttribute("id", "out-statement-graph-view-text");
    outStatementGraphViewDomainNameDiv.setAttribute("id", "out-statement-graph-view-domain-name");
    // outStatementGraphViewTextDiv.innerText = "Sites linked by the site you are visiting";
    outStatementGraphViewDomainNameDiv.innerText = domainName;
    outStatementGraphViewDomainNameDiv.domainName = domainName;
    outStatementGraphViewDomainNameDiv.maksed = false;
    outStatementGraphViewDomainNameDiv.setAttribute("class", "masked-in-study");
    outStatementGraphViewDiv.appendChild(outStatementGraphViewTextDiv);
    // outStatementGraphViewDiv.appendChild(outStatementGraphViewDomainNameDiv);

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

    appendSummaryViewArc(outG, "out", "l1", "empty", 0, 2*Math.PI);
    appendSummaryViewArc(outG, "out", "l1", "misinfo", 0, outL1FakeRate*360*Math.PI/180);
    appendSummaryViewArc(outG, "out", "l1", "reliable", outL1FakeRate*360*Math.PI/180, (outL1FakeRate+outL1RealRate)*360*Math.PI/180);
    appendSummaryViewArc(outG, "out", "l1", "others", (outL1FakeRate+outL1RealRate)*360*Math.PI/180, (outL1FakeRate+outL1RealRate+outL1OthersRate)*360*Math.PI/180);

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

    appendSummaryViewArc(outG, "out", "l2", "empty", 0, 2*Math.PI);
    appendSummaryViewArc(outG, "out", "l2", "misinfo", 0, outL2FakeRate*360*Math.PI/180);
    appendSummaryViewArc(outG, "out", "l2", "reliable", outL2FakeRate*360*Math.PI/180, (outL2FakeRate+outL2RealRate)*360*Math.PI/180);
    appendSummaryViewArc(outG, "out", "l2", "others", (outL2FakeRate+outL2RealRate)*360*Math.PI/180, (outL2FakeRate+outL2RealRate+outL2OthersRate)*360*Math.PI/180);

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
        let arcElementTransform = e.target.getAttribute("transform");

        let outL1Total = outSummaryGraphDiv.outL1FakeNumber*outSummaryGraphDiv.fakeDisplay + outSummaryGraphDiv.outL1RealNumber*outSummaryGraphDiv.realDisplay + outSummaryGraphDiv.outL1OthersNumber*outSummaryGraphDiv.othersDisplay;
        let outL2Total = outSummaryGraphDiv.outL2FakeNumber*outSummaryGraphDiv.fakeDisplay + outSummaryGraphDiv.outL2RealNumber*outSummaryGraphDiv.realDisplay + outSummaryGraphDiv.outL2OthersNumber*outSummaryGraphDiv.othersDisplay;
        let count = 0, percentage = 0;

        if (arcElementId == "out-l1-misinfo-arc") {
            count = outSummaryGraphDiv.outL1FakeNumber
            percentage = (outL1Total!=0)?count/outL1Total:0;
        }
        else if (arcElementId == "out-l1-reliable-arc") {
            count = outSummaryGraphDiv.outL1RealNumber;
            percentage = (outL1Total!=0)?count/outL1Total:0;
        }
        else if (arcElementId == "out-l1-others-arc") {
            count = outSummaryGraphDiv.outL1OthersNumber;
            percentage = (outL1Total!=0)?count/outL1Total:0;
        }
        else if (arcElementId == "out-l2-misinfo-arc") {
            count = outSummaryGraphDiv.outL2FakeNumber
            percentage = (outL2Total!=0)?count/outL2Total:0;
        }
        else if (arcElementId == "out-l2-reliable-arc") {
            count = outSummaryGraphDiv.outL2RealNumber
            percentage = (outL2Total!=0)?count/outL2Total:0;
        }
        else if (arcElementId == "out-l2-others-arc") {
            count = outSummaryGraphDiv.outL2OthersNumber
            percentage = (outL2Total!=0)?count/outL2Total:0;
        }
        percentage = Math.round(1000*percentage)/10;

        if (arcElementId != "out-l1-empty-arc" && arcElementId != "out-l2-empty-arc") {
            outHighlightG.append("path")
                .attr("id", "out-highlight-arc")
                .attr("d", arcElementD)
                .attr("fill", "white")
                .attr("transform", arcElementTransform)
                .attr("opacity", "0.3");

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
    
    // comment out when default is summary view
    displayModeChanged(false);

    let reliabilityLabelSourceDiv = document.createElement("div");
    reliabilityLabelSourceDiv.setAttribute("id", "reliability-label-source");
    reliabilityLabelSourceDiv.innerHTML = 
        `
        <div style="position:relative; top:3px;">
            <span style="font-size:14px; color:#404040; font-weight:100;">*</span> Reliability labels are based on credible sources:
            <a href="https://www.cjr.org" target="_blank">Columbia Journalism Review</a>,
            <a href="https://mediabiasfactcheck.com/fake-news/" target="_blank">Media Bias Fact Check</a>,
            <a href="https://github.com/KaiDMML/FakeNewsNet" target="_blank">FakeNewsNet</a>
        </div>
        <div>
            <span style="font-size:14px; color:#404040; font-weight:100;">**</span> <span style="color: #808080;">Unlabeled</span> websites are typically content aggregators like google.com
        </div>
        `;
    mainDiv.appendChild(reliabilityLabelSourceDiv);

    // icons
    let twitterIconDiv = document.createElement("div");
    let searchIconDiv = document.createElement("div");
    let settingIconDiv = document.createElement("div");
    let userStudyIconDiv = document.createElement("div");
    twitterIconDiv.setAttribute("id", "twitter-icon-div");
    searchIconDiv.setAttribute("id", "search-icon-div");
    settingIconDiv.setAttribute("id", "setting-icon-div");
    userStudyIconDiv.setAttribute("id", "user-study-icon-div");
    iconDiv.appendChild(twitterIconDiv);
    if (!study) iconDiv.appendChild(searchIconDiv);
    iconDiv.appendChild(settingIconDiv);
    if (!study) iconDiv.appendChild(userStudyIconDiv);

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
            
    d3.select("#setting-icon-div")
        .append("svg")
            .attr("id", "setting-icon-svg")
            .attr("class", "icon-svg")
            .style("cursor", "pointer")
            .on("mouseover", iconButtonHovered)
            .on("mouseout", iconButtonOut)
            .on("click", function () {
                let t = d3.transition().duration(1000);
                if (d3.select("#setting").style("opacity") == "0") {
                    d3.select("#setting").style("pointer-events", "auto").transition(t).style("opacity", "1");
                    d3.select("#main").transition(t)
                    .styleTween("border-radius", function (t) {
                        return d3.interpolateString("0 0 20px 20px", "0 0 0px 0px");
                    });
                }
                else if (d3.select("#setting").style("opacity") == "1") {
                    d3.select("#setting").style("pointer-events", "none").transition(t).style("opacity", "0");
                    d3.select("#main").transition(t)
                    .styleTween("border-radius", function (t) {
                        return d3.interpolateString("0 0 0px 0px", "0 0 20px 20px");
                    });
                }
            })
        .append("g")
            .attr("id", "setting-icon-g")
            .style("pointer-events", "none")
        .append("path")
            .attr("d", "M 48 0 V 48 H 5 a 5,5 0 0,1 -5,-5 V 5 a 5,5 0 0,1 5,-5 z")
            .attr("fill", "white")
            .attr("id", "setting-icon-path")
            .style("pointer-events", "none");
            
    d3.select("#user-study-icon-div")
        .append("svg")
            .attr("id", "user-study-icon-svg")
            .attr("class", "icon-svg")
            .style("cursor", "pointer")
            .on("mouseover", iconButtonHovered)
            .on("mouseout", iconButtonOut)
            .on("click", () => {
                d3.selectAll(".masked-in-study")
                    .html((_,i,dom) => toggleMask(dom[i]))
            })
        .append("g")
            .attr("id", "user-study-icon-g")
            .style("pointer-events", "none")
        .append("path")
            .attr("d", "M 48 0 V 48 H 5 a 5,5 0 0,1 -5,-5 V 5 a 5,5 0 0,1 5,-5 z")
            .attr("fill", "white")
            .attr("id", "user-study-icon-path")
            .style("pointer-events", "none");

    if (study) d3.selectAll(".masked-in-study").html((_,i,dom) => mask(dom[i]));
            
    let twitterIconSpan = document.createElement("span");
    twitterIconSpan.setAttribute("class", "material-icons");
    twitterIconSpan.setAttribute("id", "twitter-icon");
    twitterIconSpan.innerText = "sms";
    twitterIconDiv.appendChild(twitterIconSpan);

    let searchIconSpan = document.createElement("span");
    searchIconSpan.setAttribute("class", "material-icons");
    searchIconSpan.setAttribute("id", "search-icon");
    searchIconSpan.innerHTML = "search";
    if (!study) searchIconDiv.appendChild(searchIconSpan);

    let settingIconSpan = document.createElement("span");
    settingIconSpan.setAttribute("class", "material-icons-outlined");
    settingIconSpan.setAttribute("id", "setting-icon");
    settingIconSpan.innerHTML = "settings";
    settingIconDiv.appendChild(settingIconSpan);

    let userStudyIconSpan = document.createElement("span");
    userStudyIconSpan.setAttribute("class", "material-icons-outlined");
    userStudyIconSpan.setAttribute("id", "user-study-icon");
    userStudyIconSpan.innerHTML = "poll";
    if (!study) userStudyIconDiv.appendChild(userStudyIconSpan);
}



function appendSummaryViewArc(g, direction, level, label, startAngle, endAngle) {
    let color, r1, r2;
    if (label == "empty") color = "url(#in-l1-empty-arc-gradient)";
    else if (label == "misinfo") color = MISINFORMATION_COLOR;
    else if (label == "reliable") color = RELIABLE_COLOR;
    else if (label == "others") color = OTHERS_COLOR;

    if (level == "l1") r1 = summaryViewL1InnerRadius, r2=summaryViewL1OuterRadius;
    else if (level == "l2") r1 = summaryViewL2InnerRadius, r2=summaryViewL2OuterRadius;

    let arc = d3.arc().innerRadius(r1).outerRadius(r2).startAngle(startAngle).endAngle(endAngle);
    g.append("path")
        .attr("class", `summary-view-arc ${level}-arc`)
        .attr("id", `${direction}-${level}-${label}-arc`)
        .attr("d", arc)
        .attr("fill", color)
        .attr("transform", `translate(${summaryViewCenterX},${summaryViewCenterY})`);
}