import { getData, domainName } from "./data.js"



getData().then(
    data => {
        makeTwitterWindow(domainName, data[domainName]);
    }
);

export function makeTwitterWindow(domainName, data) {
    let twitterDiv = document.getElementById("twitter");
    twitterDiv.innerHTML = "";

    /* Twitter popup window */
    let twitterWindowDiv = document.createElement("div");
    twitterWindowDiv.setAttribute("id", "twitter-window");
    twitterDiv.appendChild(twitterWindowDiv);

    twitterWindowDiv = d3.select("#twitter-window");
    let twitterWindowSvg = twitterWindowDiv.append("svg").attr("id", "twitter-window");
    let twitterWindowG = twitterWindowSvg.append("g");
    twitterWindowG.append("path")
    //.attr("d", "M 30 0 h 570 v 346 H 30 V 39 L 30 39 C 7 24, 7 24, 30 9 L 30 9 v -9")
    .attr("d", "M 30 0 h 570 v 346 H 30 V 39 L 30 39 L 13 24 L 30 9 v -9")
    // .attr("fill", "#FAFAFA")
    .attr("fill", "white")
    .attr("stroke", "#444444");

    /* Twitter graph 1 - websites shared by common users */
    let twitterDomainDiv = document.createElement("div");
    twitterDomainDiv.setAttribute("id", "twitter-domain");
    twitterDiv.appendChild(twitterDomainDiv);

    let twitterDomainGraphDiv = document.createElement("div");
    let twitterDomainDescDiv = document.createElement("div");
    twitterDomainGraphDiv.setAttribute("id", "twitter-domain-graph");
    twitterDomainDescDiv.setAttribute("id", "twitter-domain-desc");
    twitterDomainDiv.appendChild(twitterDomainGraphDiv);
    twitterDomainDiv.appendChild(twitterDomainDescDiv);

    // graph
    let twitterDomainGraphIcon = document.createElement("span");
    twitterDomainGraphIcon.setAttribute("class", "material-icons-outlined");
    twitterDomainGraphIcon.setAttribute("id", "twitter-domain-graph-icon")
    twitterDomainGraphIcon.innerHTML = "person";
    twitterDomainGraphDiv.appendChild(twitterDomainGraphIcon);

    twitterDomainGraphDiv = d3.select("#twitter-domain-graph");
    let twitterDomainGraphSvg = twitterDomainGraphDiv.append("svg").attr("id", "twitter-domain-graph-svg");
    let twitterDomainGraphG = twitterDomainGraphSvg.append("g");

    let fakeDomainNumber = data["twitter_sim_domain"]["misinformation"];
    let realDomainNumber = data["twitter_sim_domain"]["reliable"];
    let othersDomainNumber = data["twitter_sim_domain"]["others"];
    let totalDomainNumber = fakeDomainNumber + realDomainNumber + othersDomainNumber;
    let fakeDomainRate = (totalDomainNumber!=0)?fakeDomainNumber/totalDomainNumber:0;
    let realDomainRate = (totalDomainNumber!=0)?realDomainNumber/totalDomainNumber:0;
    let otherDomainRate = (totalDomainNumber!=0)?othersDomainNumber/totalDomainNumber:0;
    let emptyArc = d3.arc().innerRadius(46.5).outerRadius(62).startAngle(0).endAngle(2*Math.PI);
    let fakeArc = d3.arc().innerRadius(46.5).outerRadius(62).startAngle(0).endAngle(fakeDomainRate*2*Math.PI);
    let realArc = d3.arc().innerRadius(46.5).outerRadius(62).startAngle(fakeDomainRate*2*Math.PI).endAngle((fakeDomainRate+realDomainRate)*2*Math.PI);
    let othersArc = d3.arc().innerRadius(46.5).outerRadius(62).startAngle((fakeDomainRate+realDomainRate)*2*Math.PI).endAngle((fakeDomainRate+realDomainRate+otherDomainRate)*2*Math.PI);
    twitterDomainGraphG.append("path").attr("id", "twitter-domain-graph-empty-arc").attr("d", emptyArc).attr("fill", "#E9E9E9").attr("transform", "translate(120,90)");
    twitterDomainGraphG.append("path").attr("id", "twitter-domain-graph-fake-arc").attr("d", fakeArc).attr("fill", "#D55E00").attr("transform", "translate(120,90)");
    twitterDomainGraphG.append("path").attr("id", "twitter-domain-graph-real-arc").attr("d", realArc).attr("fill", "#009E73").attr("transform", "translate(120,90)");
    twitterDomainGraphG.append("path").attr("id", "twitter-domain-graph-others-arc").attr("d", othersArc).attr("fill", "#D9D9D9").attr("transform", "translate(120,90)");

    // statement
    let twitterDomainDescPercentDiv = document.createElement("div");
    let twitterDomainDescTextDiv = document.createElement("div");
    twitterDomainDescPercentDiv.setAttribute("class", "twitter-desc-percent");
    let percent = Math.round(1000*fakeDomainRate)/10;
    twitterDomainDescPercentDiv.innerHTML = String(percent)+"%";
    twitterDomainDescTextDiv.setAttribute("id", "twitter-domain-desc-text");
    if (percent >= 50) {
        twitterDomainDescPercentDiv.setAttribute("style", "color: #D55E00");
    } else {
        twitterDomainDescPercentDiv.setAttribute("style", "color: #009E73");
    }
    twitterDomainDescDiv.appendChild(twitterDomainDescPercentDiv);
    twitterDomainDescDiv.appendChild(twitterDomainDescTextDiv);

    let twitterDomainDescTextLine1 = document.createElement("div");
    let twitterDomainDescTextLine2 = document.createElement("div");
    let twitterDomainDescTextLine3 = document.createElement("div");
    let twitterDomainDescTextLine2Statement = document.createElement("div");
    let twitterDomainDescTextLine2SWebsite = document.createElement("div");

    twitterDomainDescTextLine1.setAttribute("class", "twitter-desc-text");
    twitterDomainDescTextLine2.setAttribute("class", "twitter-desc-text");
    twitterDomainDescTextLine3.setAttribute("class", "twitter-desc-text");
    twitterDomainDescTextLine2Statement.setAttribute("id", "twitter-domain-desc-text-statement");
    twitterDomainDescTextLine2SWebsite.setAttribute("id", "twitter-domain-desc-text-website");

    let website = domainName;
    twitterDomainDescTextLine1.innerText = "of the other websites shared by the";
    twitterDomainDescTextLine2Statement.innerText = "Twitter users mentioning";
    twitterDomainDescTextLine2SWebsite.innerText = website;
    twitterDomainDescTextLine3.innerText = "contain misinformation";

    twitterDomainDescTextDiv.appendChild(twitterDomainDescTextLine1);
    twitterDomainDescTextDiv.appendChild(twitterDomainDescTextLine2);
    twitterDomainDescTextDiv.appendChild(twitterDomainDescTextLine3);
    twitterDomainDescTextLine2.appendChild(twitterDomainDescTextLine2Statement);
    twitterDomainDescTextLine2.appendChild(twitterDomainDescTextLine2SWebsite);

    /* Twitter graph 2 - bot ratio */
    let twitterBotDiv = document.createElement("div");
    twitterBotDiv.setAttribute("id", "twitter-bot");
    twitterDiv.appendChild(twitterBotDiv);

    let twitterBotGraphDiv = document.createElement("div");
    let twitterBotDescDiv = document.createElement("div");
    twitterBotGraphDiv.setAttribute("id", "twitter-bot-graph");
    twitterBotDescDiv.setAttribute("id", "twitter-bot-desc");
    twitterBotDiv.appendChild(twitterBotGraphDiv);
    twitterBotDiv.appendChild(twitterBotDescDiv);

    // let twitterBotGraphIcon = document.createElement("span");
    // twitterBotGraphIcon.setAttribute("class", "material-icons-outlined");
    // twitterBotGraphIcon.setAttribute("id", "twitter-bot-graph-icon");
    // twitterBotGraphIcon.innerHTML = "smart_toy";
    // twitterBotGraphDiv.appendChild(twitterBotGraphIcon);

    // twitterBotGraphDiv = d3.select("#twitter-bot-graph");
    // let twitterBotGraphSvg = twitterBotGraphDiv.append("svg").attr("id", "twitter-bot-graph-svg");
    // let twitterBotGraphG = twitterBotGraphSvg.append("g").attr("id", "twitter-bot-graph-g");

    let botNumber = data["twitter_bot_user_cnt"];
    let botRatio = botNumber/data["twitter_user_cnt"]
    // emptyArc = d3.arc().innerRadius(46.5).outerRadius(62).startAngle(0).endAngle(2*Math.PI);
    // let botArc = d3.arc().innerRadius(46.5).outerRadius(62).startAngle(0).endAngle(botRatio*2*Math.PI);
    // twitterBotGraphG.append("path").attr("id", "twitter-bot-graph-nonbot-arc").attr("d", emptyArc).attr("fill", "#D9D9D9").attr("transform", "translate(120,83)");
    // twitterBotGraphG.append("path").attr("id", "twitter-bot-graph-bot-arc").attr("d", botArc).attr("fill", "#D55E00").attr("transform", "translate(120,83)");

    for (let i=0;i<3;i++) {
        let twitterBotGraphLine = document.createElement("div");
        twitterBotGraphLine.setAttribute("class", "twitter-bot-graph-line");
        twitterBotGraphDiv.appendChild(twitterBotGraphLine);
        for (let j=0;j<3;j++) {
            let twitterBotGraphIcon = document.createElement("span");
            twitterBotGraphIcon.setAttribute("class", "material-icons-outlined twitter-bot-graph-icon");
            twitterBotGraphIcon.setAttribute("id", "twitter-bot-graph-icon-"+String(i*3+j+1));
            twitterBotGraphIcon.innerHTML = "smart_toy";
            twitterBotGraphLine.appendChild(twitterBotGraphIcon);
        }
    }

    for (let i=0 ; i<botNumber ; i++) {
        let botIcon = document.getElementById("twitter-bot-graph-icon-"+String(i+1));
        botIcon.style.color = "#D55E00";
    }


    let twitterBotDescTextLine0 = document.createElement("div");
    twitterBotDescTextLine0.innerText = "At least";
    twitterBotDescTextLine0.setAttribute("class", "twitter-desc-text");
    twitterBotDescDiv.appendChild(twitterBotDescTextLine0);

    let twitterBotDescPercentDiv = document.createElement("div");
    let twitterBotDescTextDiv = document.createElement("div");
    // let botPercent = Math.round(botRatio*1000)/10;
    twitterBotDescPercentDiv.innerText = String(botNumber);
    twitterBotDescPercentDiv.setAttribute("class", "twitter-desc-percent");
    if (botNumber >= 1) {
        twitterBotDescPercentDiv.setAttribute("style", "color: #D55E00");
    } else {
        twitterBotDescPercentDiv.setAttribute("style", "color: #009E73");
    }
    twitterBotDescDiv.appendChild(twitterBotDescPercentDiv);
    twitterBotDescDiv.appendChild(twitterBotDescTextDiv);

    let twitterBotDescTextLine1 = document.createElement("div");
    let twitterBotDescTextLine2 = document.createElement("div");
    let twitterBotDescTextLine2Website = document.createElement("div");
    let twitterBotDescTextLine2Statement = document.createElement("div");
    twitterBotDescTextLine1.innerText = "of the Twitter users mentioning";
    twitterBotDescTextLine2Website.innerText = website;
    twitterBotDescTextLine2Statement.innerText = "are bots";
    twitterBotDescTextLine1.setAttribute("class", "twitter-desc-text");
    twitterBotDescTextLine2.setAttribute("class", "twitter-desc-text");
    twitterBotDescTextLine2Website.setAttribute("id", "twitter-bot-desc-text-website");
    twitterBotDescTextLine2Statement.setAttribute("id", "twitter-bot-desc-text-statement");
    twitterBotDescTextDiv.appendChild(twitterBotDescTextLine1);
    twitterBotDescTextDiv.appendChild(twitterBotDescTextLine2);
    twitterBotDescTextLine2.appendChild(twitterBotDescTextLine2Website);
    twitterBotDescTextLine2.appendChild(twitterBotDescTextLine2Statement);
}