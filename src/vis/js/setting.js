import { domainName, study } from "./data.js";
import { mask } from "./functions.js"

let settingDiv = document.getElementById("setting");

let displaySettingDiv = document.createElement("div");
let viewSettingDiv = document.createElement("div");
let categorySettingDiv = document.createElement("div");
let levelSettingDiv = document.createElement("div");
let directionSettingDiv = document.createElement("div");
displaySettingDiv.setAttribute("class", "setting-group");
viewSettingDiv.setAttribute("class", "setting-group");
categorySettingDiv.setAttribute("class", "setting-group");
levelSettingDiv.setAttribute("class", "setting-group");
directionSettingDiv.setAttribute("class", "setting-group");
settingDiv.appendChild(displaySettingDiv);
settingDiv.appendChild(viewSettingDiv);
settingDiv.appendChild(categorySettingDiv);
settingDiv.appendChild(levelSettingDiv);
settingDiv.appendChild(directionSettingDiv);

// Display mode
let displaySettingTitleDiv = document.createElement("div");
let displaySettingSummaryDiv = document.createElement("div");
let displaySettingToggleDiv = document.createElement("div");
let displaySettingGraphDiv = document.createElement("div");
displaySettingTitleDiv.setAttribute("class", "display-setting setting-title");
// displaySettingSummaryDiv.setAttribute("class", "display-setting setting-option-left");
displaySettingSummaryDiv.setAttribute("class", "display-setting setting-option-right");
displaySettingToggleDiv.setAttribute("class", "display-setting setting-toggle");
// displaySettingGraphDiv.setAttribute("class", "display-setting setting-option-right");
displaySettingGraphDiv.setAttribute("class", "display-setting setting-option-left");
displaySettingTitleDiv.innerText = "Display Mode";
displaySettingSummaryDiv.innerText = "Summary View";
displaySettingGraphDiv.innerText = "Graph View";
displaySettingDiv.appendChild(displaySettingTitleDiv);
displaySettingDiv.appendChild(displaySettingSummaryDiv);
displaySettingDiv.appendChild(displaySettingToggleDiv);
displaySettingDiv.appendChild(displaySettingGraphDiv);

// toggle switch
let displaySettingToggleLabel = document.createElement("label");
displaySettingToggleLabel.setAttribute("class", "toggle");
displaySettingToggleDiv.appendChild(displaySettingToggleLabel);

let displaySettingToggleInput = document.createElement("input");
let displaySettingToggleSpan = document.createElement("span");
displaySettingToggleInput.setAttribute("type", "checkbox");
displaySettingToggleInput.setAttribute("id", "display-mode-setting-toggle");
displaySettingToggleSpan.setAttribute("class", "slider");
displaySettingToggleLabel.appendChild(displaySettingToggleInput);
displaySettingToggleLabel.appendChild(displaySettingToggleSpan);

// Summary View Mode
let viewSettingTitleDiv = document.createElement("div");
let viewSettingNormalizedDiv = document.createElement("div");
let viewSettingToggleDiv = document.createElement("div");
let viewSettingAbsoluteDiv = document.createElement("div");
viewSettingTitleDiv.setAttribute("class", "view-setting setting-title")
viewSettingNormalizedDiv.setAttribute("class", "view-setting setting-option-left")
viewSettingToggleDiv.setAttribute("class", "view-setting setting-toggle");
viewSettingAbsoluteDiv.setAttribute("class", "view-setting setting-option-right");
viewSettingTitleDiv.innerText= "Summary View Mode";
viewSettingNormalizedDiv.innerText = "Normalized";
viewSettingAbsoluteDiv.innerText = "Absolute";
viewSettingDiv.appendChild(viewSettingTitleDiv);
viewSettingDiv.appendChild(viewSettingNormalizedDiv);
viewSettingDiv.appendChild(viewSettingToggleDiv);
viewSettingDiv.appendChild(viewSettingAbsoluteDiv);

let viewSettingToggleLabel = document.createElement("label");
viewSettingToggleLabel.setAttribute("class", "toggle");
viewSettingToggleDiv.appendChild(viewSettingToggleLabel);

let viewSettingToggleInput = document.createElement("input");
let viewSettingToggleSpan = document.createElement("span");
viewSettingToggleInput.setAttribute("type", "checkbox");
viewSettingToggleInput.setAttribute("id", "summary-view-mode-setting-toggle");
viewSettingToggleSpan.setAttribute("class", "slider");
viewSettingToggleLabel.append(viewSettingToggleInput);
viewSettingToggleLabel.append(viewSettingToggleSpan);

// Categories to Display
let categorySettingTitleDiv = document.createElement("div");
let categorySettingMisinfoDiv = document.createElement("div");
let categorySettingReliableDiv = document.createElement("div");
let categorySettingOthersDiv = document.createElement("div");
categorySettingTitleDiv.setAttribute("class", "category-setting setting-title");
categorySettingTitleDiv.innerText = "Categories to Display";
categorySettingMisinfoDiv.setAttribute("class", "category-setting setting-option-1")
categorySettingReliableDiv.setAttribute("class", "category-setting setting-option-2")
categorySettingOthersDiv.setAttribute("class", "category-setting setting-option-3")
categorySettingDiv.appendChild(categorySettingTitleDiv);
categorySettingDiv.appendChild(categorySettingMisinfoDiv);
categorySettingDiv.appendChild(categorySettingReliableDiv);
categorySettingDiv.appendChild(categorySettingOthersDiv);

let categorySettingMisinfoCheckboxInput = document.createElement("input");
let categorySettingMisinfoTextDiv = document.createElement("div");
categorySettingMisinfoCheckboxInput.setAttribute("type", "checkbox");
categorySettingMisinfoCheckboxInput.setAttribute("class", "category-multiple-checkbox");
categorySettingMisinfoCheckboxInput.setAttribute("id", "category-setting-misinfo-checkbox");
categorySettingMisinfoCheckboxInput.setAttribute("checked", "true");
categorySettingMisinfoCheckboxInput.targetCategory = "misinformation";
categorySettingMisinfoTextDiv.setAttribute("class", "category-setting-text");
categorySettingMisinfoTextDiv.setAttribute("id", "category-setting-text-misinfo");
categorySettingMisinfoTextDiv.innerText = "Controversial";
categorySettingMisinfoDiv.appendChild(categorySettingMisinfoCheckboxInput);
categorySettingMisinfoDiv.appendChild(categorySettingMisinfoTextDiv);

let categorySettingReliableCheckboxInput = document.createElement("input");
let categorySettingReliableTextDiv = document.createElement("div");
categorySettingReliableCheckboxInput.setAttribute("type", "checkbox");
categorySettingReliableCheckboxInput.setAttribute("class", "category-multiple-checkbox");
categorySettingReliableCheckboxInput.setAttribute("id", "category-setting-reliable-checkbox");
categorySettingReliableCheckboxInput.setAttribute("checked", "true");
categorySettingReliableCheckboxInput.targetCategory = "reliable";
categorySettingReliableTextDiv.setAttribute("class", "category-setting-text");
categorySettingReliableTextDiv.setAttribute("id", "category-setting-text-reliable");
categorySettingReliableTextDiv.innerText = "Verified";
categorySettingReliableDiv.appendChild(categorySettingReliableCheckboxInput);
categorySettingReliableDiv.appendChild(categorySettingReliableTextDiv);

let categorySettingOthersCheckboxInput = document.createElement("input");
let categorySettingOthersTextDiv = document.createElement("div");
categorySettingOthersCheckboxInput.setAttribute("type", "checkbox");
categorySettingOthersCheckboxInput.setAttribute("class", "category-multiple-checkbox");
categorySettingOthersCheckboxInput.setAttribute("id", "category-setting-others-checkbox");
categorySettingOthersCheckboxInput.setAttribute("checked", "true");
categorySettingOthersCheckboxInput.targetCategory = "others";
categorySettingOthersTextDiv.setAttribute("class", "category-setting-text");
categorySettingOthersTextDiv.setAttribute("id", "category-setting-text-others");
categorySettingOthersTextDiv.innerText = "Unlabeled";
categorySettingOthersDiv.appendChild(categorySettingOthersCheckboxInput);
categorySettingOthersDiv.appendChild(categorySettingOthersTextDiv);


// Link Level to Display - fixed
let levelSettingCheckboxInput = document.createElement("input");
let levelSettingTextDiv = document.createElement("div");
levelSettingCheckboxInput.setAttribute("type", "checkbox");
levelSettingCheckboxInput.setAttribute("class", "multiple-checkbox");
levelSettingCheckboxInput.setAttribute("id", "level-setting-checkbox");
levelSettingTextDiv.setAttribute("id", "level-setting-text");
levelSettingCheckboxInput.checked = true;
levelSettingDiv.appendChild(levelSettingCheckboxInput);
levelSettingDiv.appendChild(levelSettingTextDiv);

let levelSettingTextStatement = document.createElement("div");
let levelSettingTextDomain = document.createElement("div");
levelSettingTextStatement.innerText = "Show outer ring"
levelSettingTextStatement.setAttribute("id", "level-setting-text-statement");
levelSettingTextDomain.innerText = domainName;
levelSettingTextDomain.domainName = domainName;
levelSettingTextDomain.masked = false;
levelSettingTextDomain.setAttribute("id", "level-setting-text-domain");
levelSettingTextDomain.setAttribute("class", "masked-in-study");
levelSettingTextDiv.appendChild(levelSettingTextStatement);
// levelSettingTextDiv.appendChild(levelSettingTextDomain);

// Pointing direction
let directionSettingCheckboxInput = document.createElement("input");
let directionSettingTextDiv = document.createElement("div");
directionSettingCheckboxInput.setAttribute("type", "checkbox");
directionSettingCheckboxInput.setAttribute("class", "multiple-checkbox");
directionSettingCheckboxInput.setAttribute("id", "direction-setting-checkbox");
directionSettingTextDiv.setAttribute("id", "direction-setting-text");
directionSettingDiv.appendChild(directionSettingCheckboxInput);
directionSettingDiv.appendChild(directionSettingTextDiv);

let directionSettingTextStatement1 = document.createElement("div");
let directionSettingTextDomain = document.createElement("div");
let directionSettingTextStatement2 = document.createElement("div");
directionSettingTextStatement1.innerText = "Show the websites that";
directionSettingTextStatement1.setAttribute("id", "direction-setting-text-statement-1");
directionSettingTextDomain.innerText = domainName;
directionSettingTextDomain.domainName = domainName;
directionSettingTextDomain.maksed = false;
directionSettingTextDomain.setAttribute("id", "direction-setting-text-domain");
directionSettingTextDomain.setAttribute("class", "masked-in-study");
directionSettingTextStatement2.innerText = "is linking to";
directionSettingTextStatement2.setAttribute("id", "direction-setting-text-statement-2");
directionSettingTextDiv.appendChild(directionSettingTextStatement1);
directionSettingTextDiv.appendChild(directionSettingTextDomain);
directionSettingTextDiv.appendChild(directionSettingTextStatement2);

if (study) d3.selectAll(".masked-in-study").html((_,i,dom) => mask(dom[i]));