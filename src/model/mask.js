function getMaskOne() {
    var strings = new Array(6);
    strings[0] = [1, 3, 5];
    strings[1] = [1, 3, 5];
    strings[2] = [2, 4, 5];
    strings[3] = [2, 3, 5];
    strings[4] = [2, 3, 5];
    strings[5] = [1, 3, 5];
    return {
        name: 'Mask 1',
        strings: strings
    };
}

function getMaskTwo() {
    var strings = new Array(6);
    strings[0] = [5, 7, 8];
    strings[1] = [5, 6, 8];
    strings[2] = [4, 5, 7];
    strings[3] = [5, 7, 9];
    strings[4] = [5, 7, 8];
    strings[5] = [5, 7, 8];
    return {
        name: 'Mask 2',
        strings: strings
    };
}

function getMaskThree() {
    var strings = new Array(6);
    strings[0] = [7, 8, 10];
    strings[1] = [6, 8, 10];
    strings[2] = [7, 9, 10];
    strings[3] = [7, 9, 10];
    strings[4] = [7, 8, 10];
    strings[5] = [7, 8, 10];
    return {
        name: 'Mask 3',
        strings: strings
    };
}

function getMaskFour() {
    var strings = new Array(6);
    strings[0] = [8, 10, 12];
    strings[1] = [8, 10, 12];
    strings[2] = [9, 10, 12];
    strings[3] = [9, 10, 12];
    strings[4] = [8, 10, 12];
    strings[5] = [8, 10, 12];
    return {
        name: 'Mask 4',
        strings: strings
    };
}

function getMaskFive() {
    var strings = new Array(6);
    strings[0] = [12, 13, 15];
    strings[1] = [12, 13, 15];
    strings[2] = [12, 14, 16];
    strings[3] = [12, 14, 15];
    strings[4] = [12, 14, 15];
    strings[5] = [12, 13, 15];
    return {
        name: 'Mask 5',
        strings: strings
    };
}

function getMaskSix() {
    var strings = new Array(6);
    strings[0] = [0, 1, 3];
    strings[1] = [0, 1, 3];
    strings[2] = [0, 2, 4];
    strings[3] = [0, 2, 3];
    strings[4] = [0, 2, 3];
    strings[5] = [0, 1, 3];
    return {
        name: 'Mask 6',
        strings: strings
    };
}

function initMasks() {
    var masks = [];
    masks.push(getMaskOne());
    masks.push(getMaskTwo());
    masks.push(getMaskThree());
    masks.push(getMaskFour());
    masks.push(getMaskFive());
    masks.push(getMaskSix());
    return masks;
}

var MASKS = initMasks();

export { MASKS };