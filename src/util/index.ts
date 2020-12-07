function getStringBetween(string: string, left: string, right: string) {
    let startIndex = -1;
    let stopIndex = -1;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === left && startIndex === -1) {
            startIndex = i + 1;
            continue;
        }
        if (string[i] === right) {
            stopIndex = i;
            break;
        }
    }

    return string.substring(startIndex, stopIndex);
}

function isNumeric(string: string) {
    return !isNaN(Number(string));
}

export { getStringBetween, isNumeric };
