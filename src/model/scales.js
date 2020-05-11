import { getNoteFromSemitone } from './note.js';

class Scale {

    name;
    semitones;

    constructor(_name, _semitones) {
        this.name = _name;
        this.semitones = _semitones;
    }

    getScale(tonic) {
        var notes = [];
        var current = tonic.semitones;
        notes.push(getNoteFromSemitone(current));
        for (var interval of this.semitones) {
            current += interval;
            notes.push(getNoteFromSemitone(current));
        }
        return notes;
    }
}

function initScales() {
    var tempScales = [];
    tempScales.push(new Scale('Major - Ionian', [2, 2, 1, 2, 2, 2, 1]));
    tempScales.push(new Scale('Natural Minor - Aeolian', [2, 1, 2, 2, 1, 2, 2]));
    tempScales.push(new Scale('Harmonic Minor - Aeolian #7', [2, 1, 2, 2, 1, 3, 1]));
    return tempScales;
}

var SCALES = initScales();

export { SCALES };