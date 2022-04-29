import { displayModeChanged, summaryViewModeChanged, categorySettingChanged, levelCheckboxFunction, directionCheckboxFunction } from './functions.js';

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

let levelSettingCheckboxInput = document.getElementById("level-setting-checkbox");
levelSettingCheckboxInput.addEventListener("change", levelCheckboxFunction)

let directionSettingCheckboxInput = document.getElementById("direction-setting-checkbox");
directionSettingCheckboxInput.addEventListener("change", directionCheckboxFunction);
