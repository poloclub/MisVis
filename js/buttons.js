import {toggleTwitterPopup, toggleHelpDisplay, twitterIconButtonHovered, twitterIconButtonOut, displayModeChanged, summaryViewModeChanged, categorySettingChanged, levelSettingDirectCheckboxFunction, levelSettingIndirectCheckboxFunction, directionCheckboxFunction} from './functions.js';

let displayModeSettingToggleInput = document.getElementById("display-mode-setting-toggle");
displayModeSettingToggleInput.addEventListener("change", displayModeChanged);

let viewSettingToggleInput = document.getElementById("summary-view-mode-setting-toggle");
viewSettingToggleInput.addEventListener("change", summaryViewModeChanged);

let categorySettingMisinfoCheckboxDiv = document.getElementById("category-setting-misinfo-checkbox");
let categorySettingReliableCheckboxDiv = document.getElementById("category-setting-reliable-checkbox");
let categorySettingOthersCheckboxDiv = document.getElementById("category-setting-others-checkbox");
categorySettingMisinfoCheckboxDiv.addEventListener("change", (event) => {categorySettingChanged(event);});
categorySettingReliableCheckboxDiv.addEventListener("change", categorySettingChanged);
categorySettingOthersCheckboxDiv.addEventListener("change", categorySettingChanged);

let levelSettingDirectCheckboxInput = document.getElementById("level-setting-direct-checkbox");
let levelSettingIndirectCheckboxInput = document.getElementById("level-setting-indirect-checkbox");
levelSettingDirectCheckboxInput.addEventListener("click", levelSettingDirectCheckboxFunction)
levelSettingIndirectCheckboxInput.addEventListener("click", levelSettingIndirectCheckboxFunction)

let directionSettingCheckboxInput = document.getElementById("direction-setting-checkbox");
directionSettingCheckboxInput.addEventListener("change", directionCheckboxFunction);
