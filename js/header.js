let searchBarHeader = document.getElementById("domain-search-bar-header");
let searchBarListDiv = document.getElementById("domain-search-list");
searchBarHeader.style.display = "none";
searchBarListDiv.style.display = "none";
let headerDiv = document.getElementById("header");

let headerStatementDiv = document.createElement("div");
headerStatementDiv.setAttribute("id", "header-statement-div");
headerDiv.appendChild(headerStatementDiv);

import { domainName } from "./data.js";
import { getData } from "./data.js";
import { getLabelName } from './data.js';
import { getColor } from './data.js';
import { searchBarClicked, searchBarBlurred, searchBarEntryClicked, searchBarEntryHovered, searchBarEntryMouseOut, searchBarFunction } from "./functions.js";

// Search box for domain
let searchBarInput = document.createElement("input");
searchBarInput.setAttribute("type", "text");
searchBarInput.setAttribute("id", "domain-search-bar");
searchBarInput.setAttribute("placeholder", "Search for domain names..");
searchBarHeader.appendChild(searchBarInput);

searchBarInput.addEventListener("input", searchBarFunction);
searchBarInput.addEventListener("focus", searchBarClicked);
searchBarInput.addEventListener("blur", searchBarBlurred);

getData().then(
    data => {
        d3.select("#domain-search-list")
            .append("ul")
                .attr("id", "domain-search-bar-list")
                .style("display", "none")
                .style("opacity", "0")
            .selectAll()
                .data(Object.entries(data))
                .enter()
                .append("li")
                .text(d => d[0])
                .attr("id", d => "domain-search-bar-entry-"+d[0].split(".")[0])
                .attr("class", "domain-search-bar-entry")
                .on("click", searchBarEntryClicked)
                .on("mouseover", searchBarEntryHovered)
                .on("mouseout", searchBarEntryMouseOut);
        let label = getLabelName(data[domainName]["label"]);
        let color = getColor(label);
        makeHeader(domainName, label, color)
    }
);

export function makeHeader(domainName, label, color) {
    let headerStatementDiv = document.getElementById("header-statement-div");
    headerStatementDiv.innerHTML = '';

        let headerStatementDomainDiv = document.createElement("div");
        let headerStatementTextDiv = document.createElement("div");
        let headerStatementClassDiv = document.createElement("div");
        let headerStatementExclamationDiv = document.createElement("div");
        headerStatementDomainDiv.setAttribute("id", "header-statement-domain");
        headerStatementDomainDiv.setAttribute("class", "header-statement");
        headerStatementDomainDiv.innerText = domainName;
        headerStatementTextDiv.setAttribute("id", "header-statement-text");
        headerStatementTextDiv.setAttribute("class", "header-statement");
        if (label == "misinformation") {
            // headerStatementTextDiv.innerText = "contains";
            headerStatementTextDiv.innerText = "is a";
        }
        else if (label == "reliable") {
            headerStatementTextDiv.innerText = "is a";
        }
        headerStatementClassDiv.setAttribute("id", "header-statement-class");
        headerStatementClassDiv.setAttribute("class", "header-statement");
        headerStatementClassDiv.style.color = color;
        headerStatementClassDiv.innerText = label;
        headerStatementExclamationDiv.setAttribute("id", "header-statement-exclamation");
        headerStatementExclamationDiv.setAttribute("class", "header-statement");
        headerStatementExclamationDiv.innerText = " website!";
        headerStatementDiv.appendChild(headerStatementDomainDiv);
        headerStatementDiv.appendChild(headerStatementTextDiv);
        headerStatementDiv.appendChild(headerStatementClassDiv);
        headerStatementDiv.appendChild(headerStatementExclamationDiv);
    // }
// );

}