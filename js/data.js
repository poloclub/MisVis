// get L1, L2 data
export const domainName = "blacklistednews.com";
export const getData = () => fetch("./data/summary.json")
    .then((response) => response.json());

export const getLabelName = (label) => {
    if (label == "Real") {
        label = "reliable";
    }
    else if (label == "Fake") {
        label = "misinformation";
    }
    else {
        label = "other";
    }
    return label;
}

export const MISINFORMATION_COLOR = "#D55E00";
export const RELIABLE_COLOR = "#009E73";
export const OTHERS_COLOR = "#7F7F7F";

export const getColor = (label) => {
    if (label == "Fake" || label == "misinformation") {
        return MISINFORMATION_COLOR;
    }
    else if (label == "Real" || label == "reliable") {
        return RELIABLE_COLOR;
    }
    else {
        return OTHERS_COLOR;
    }
}
