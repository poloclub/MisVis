// get L1, L2 data
export let domainName, study;
if (sessionStorage.getItem("domain")) {
    domainName = sessionStorage.getItem("domain");
    study = true;
}
else {
    domainName = "thegatewaypundit.com";
    study = false;
}

export const getData = () => fetch("./data/summary.json")
    .then((response) => response.json());

export const getLabelName = (label) => {
    if (label == "Real") label = "reliable";
    else if (label == "Fake") label = "misinformation";
    else label = "other";
    return label;
}

export const MISINFORMATION_COLOR = "#e08214";
export const RELIABLE_COLOR = "#542788";
export const OTHERS_COLOR = "#c8c8c8";

export const getColor = (label) => {
    if (label == "Fake" || label == "misinformation") return MISINFORMATION_COLOR;
    else if (label == "Real" || label == "reliable") return RELIABLE_COLOR;
    else return OTHERS_COLOR;
}

export const l1CircleRadius = 112.5;
export const l2CircleRadius = 185;
export const bubbleRadius = 8;
export const graphViewCenterX = 210, graphViewCenterY = 210;
export const summaryViewCenterX = 250, summaryViewCenterY = 165;
export const summaryViewL1InnerRadius = 100, summaryViewL1OuterRadius = 125;
export const summaryViewL2InnerRadius = 134.475, summaryViewL2OuterRadius = 165;