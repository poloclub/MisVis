import { domainName } from "./data.js";

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
displaySettingSummaryDiv.setAttribute("class", "display-setting setting-option-left");
displaySettingToggleDiv.setAttribute("class", "display-setting setting-toggle");
displaySettingGraphDiv.setAttribute("class", "display-setting setting-option-right");
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

let categorySettingMisinfoCheckboxDiv = document.createElement("div");
let categorySettingMisinfoTextDiv = document.createElement("div");
categorySettingMisinfoCheckboxDiv.setAttribute("class", "multiple-checkbox");
categorySettingMisinfoTextDiv.setAttribute("class", "category-setting-text");
categorySettingMisinfoTextDiv.innerText = "Misinformation";
categorySettingMisinfoDiv.appendChild(categorySettingMisinfoCheckboxDiv);
categorySettingMisinfoDiv.appendChild(categorySettingMisinfoTextDiv);

let categorySettingMisinfoCheckboxInput = document.createElement("input");
categorySettingMisinfoCheckboxInput.setAttribute("type", "checkbox");
categorySettingMisinfoCheckboxInput.setAttribute("class", "multiple-checkbox");
categorySettingMisinfoCheckboxInput.setAttribute("id", "category-setting-misinfo-checkbox");
categorySettingMisinfoCheckboxInput.setAttribute("checked", "true");
categorySettingMisinfoCheckboxInput.targetCategory = "misinformation";
categorySettingMisinfoCheckboxDiv.appendChild(categorySettingMisinfoCheckboxInput);

let categorySettingReliableCheckboxDiv = document.createElement("div");
let categorySettingReliableTextDiv = document.createElement("div");
categorySettingReliableCheckboxDiv.setAttribute("class", "multiple-checkbox");
categorySettingReliableTextDiv.setAttribute("class", "category-setting-text");
categorySettingReliableTextDiv.innerText = "Reliable";
categorySettingReliableDiv.appendChild(categorySettingReliableCheckboxDiv);
categorySettingReliableDiv.appendChild(categorySettingReliableTextDiv);

let categorySettingReliableCheckboxInput = document.createElement("input");
categorySettingReliableCheckboxInput.setAttribute("type", "checkbox");
categorySettingReliableCheckboxInput.setAttribute("class", "multiple-checkbox");
categorySettingReliableCheckboxInput.setAttribute("id", "category-setting-reliable-checkbox");
categorySettingReliableCheckboxInput.setAttribute("checked", "true");
categorySettingReliableCheckboxInput.targetCategory = "reliable";
categorySettingReliableCheckboxDiv.appendChild(categorySettingReliableCheckboxInput);

let categorySettingOthersCheckboxDiv = document.createElement("div");
let categorySettingOthersTextDiv = document.createElement("div");
categorySettingOthersCheckboxDiv.setAttribute("class", "multiple-checkbox");
categorySettingOthersTextDiv.setAttribute("class", "category-setting-text");
categorySettingOthersTextDiv.innerText = "Unlabeled";
categorySettingOthersDiv.appendChild(categorySettingOthersCheckboxDiv);
categorySettingOthersDiv.appendChild(categorySettingOthersTextDiv);

let categorySettingOthersCheckboxInput = document.createElement("input");
categorySettingOthersCheckboxInput.setAttribute("type", "checkbox");
categorySettingOthersCheckboxInput.setAttribute("class", "multiple-checkbox");
categorySettingOthersCheckboxInput.setAttribute("id", "category-setting-others-checkbox");
categorySettingOthersCheckboxInput.setAttribute("checked", "true");
categorySettingOthersCheckboxInput.targetCategory = "others";
categorySettingOthersCheckboxDiv.appendChild(categorySettingOthersCheckboxInput);

// Link level to Display
let levelSettingTitleDiv = document.createElement("div");
let levelSettingDirectDiv = document.createElement("div");
let levelSettingIndirectDiv = document.createElement("div");
levelSettingTitleDiv.setAttribute("class", "level-setting setting-title");
levelSettingTitleDiv.innerText = "Link Level to Display";
levelSettingDirectDiv.setAttribute("class", "level-setting setting-option-1");
levelSettingIndirectDiv.setAttribute("class", "level-setting setting-option-2");
levelSettingDiv.appendChild(levelSettingTitleDiv);
levelSettingDiv.appendChild(levelSettingDirectDiv);
levelSettingDiv.appendChild(levelSettingIndirectDiv);

let levelSettingDirectCheckboxDiv = document.createElement("div");
let levelSettingDirectTextDiv = document.createElement("div");
levelSettingDirectCheckboxDiv.setAttribute("class", "multiple-checkbox");
levelSettingDirectTextDiv.setAttribute("class", "level-setting-text");
levelSettingDirectTextDiv.innerText = "Only direct links";
levelSettingDirectDiv.appendChild(levelSettingDirectCheckboxDiv);
levelSettingDirectDiv.appendChild(levelSettingDirectTextDiv);

let levelSettingDirectCheckboxInput= document.createElement("input");
levelSettingDirectCheckboxInput.setAttribute("type", "radio");
levelSettingDirectCheckboxInput.setAttribute("class", "radio-checkbox");
levelSettingDirectCheckboxInput.setAttribute("id", "level-setting-direct-checkbox");
levelSettingDirectCheckboxDiv.appendChild(levelSettingDirectCheckboxInput);

let levelSettingIndirectCheckboxDiv = document.createElement("div");
let levelSettingIndirectTextDiv = document.createElement("div");
levelSettingIndirectCheckboxDiv.setAttribute("class", "radio-checkbox");
levelSettingIndirectTextDiv.setAttribute("class", "level-setting-text");
levelSettingIndirectTextDiv.innerText = "Both direct and indirect links";
levelSettingIndirectDiv.appendChild(levelSettingIndirectCheckboxDiv);
levelSettingIndirectDiv.appendChild(levelSettingIndirectTextDiv);

let levelSettingIndirectCheckboxInput= document.createElement("input");
levelSettingIndirectCheckboxInput.setAttribute("type", "radio");
levelSettingIndirectCheckboxInput.setAttribute("class", "radio-checkbox");
levelSettingIndirectCheckboxInput.setAttribute("id", "level-setting-indirect-checkbox");
levelSettingIndirectCheckboxInput.setAttribute("checked", "true");
levelSettingIndirectCheckboxDiv.appendChild(levelSettingIndirectCheckboxInput);

// Pointing direction
let directionSettingCheckboxDiv = document.createElement("div");
let directionSettingTextDiv = document.createElement("div");
directionSettingCheckboxDiv.setAttribute("class", "multiple-checkbox");
directionSettingTextDiv.setAttribute("id", "direction-setting-text");
directionSettingDiv.appendChild(directionSettingCheckboxDiv);
directionSettingDiv.appendChild(directionSettingTextDiv);

let directionSettingCheckboxInput = document.createElement("input");
directionSettingCheckboxInput.setAttribute("type", "checkbox");
directionSettingCheckboxInput.setAttribute("class", "multiple-checkbox");
directionSettingCheckboxInput.setAttribute("id", "direction-setting-checkbox");
directionSettingCheckboxDiv.appendChild(directionSettingCheckboxInput);

let directionSettingTextStatement1 = document.createElement("div");
let directionSettingTextDomain = document.createElement("div");
let directionSettingTextStatement2 = document.createElement("div");
directionSettingTextStatement1.innerText = "Show the websites that";
directionSettingTextStatement1.setAttribute("id", "direction-setting-text-statement-1");
directionSettingTextDomain.innerText = domainName;
directionSettingTextDomain.setAttribute("id", "direction-setting-text-domain");
directionSettingTextStatement2.innerText = "is mentioning";
directionSettingTextStatement2.setAttribute("id", "direction-setting-text-statement-2");
directionSettingTextDiv.appendChild(directionSettingTextStatement1);
directionSettingTextDiv.appendChild(directionSettingTextDomain);
directionSettingTextDiv.appendChild(directionSettingTextStatement2);