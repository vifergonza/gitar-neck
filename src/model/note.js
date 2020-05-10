class Note {

    name;
    semitones;

    constructor(_semitone, _name) {
        this.name = _name;
        this.semitones = _semitone;
    }

}

function initNotes() {
    var tempNotes = new Array(12);
    tempNotes[0] = new Note(0, 'A');
    tempNotes[1] = new Note(1, 'A#');
    tempNotes[2] = new Note(2, 'B');
    tempNotes[3] = new Note(3, 'C');
    tempNotes[4] = new Note(4, 'C#');
    tempNotes[5] = new Note(5, 'D');
    tempNotes[6] = new Note(6, 'D#');
    tempNotes[7] = new Note(7, 'E');
    tempNotes[8] = new Note(8, 'F');
    tempNotes[9] = new Note(9, 'F#');    
    tempNotes[10] = new Note(10, 'G');
    tempNotes[11] = new Note(11, 'G#');
    return tempNotes;
}


var NOTES = initNotes();

var DEFAULT_TUNE = [
    NOTES[7], NOTES[2], NOTES[10], NOTES[5], NOTES[0], NOTES[7]
]

function normalize(tones) {
    return tones%12;
}

function getNote(string, freat) {
    var airNote = DEFAULT_TUNE[string];
    var freatSemintones = airNote.semitones + freat;
    var normalizedSemitones = normalize(freatSemintones);
    return NOTES[normalizedSemitones];
}

function getNoteFromSemitone(semitones) {
    var normalizedSemitones = normalize(semitones);
    return NOTES[normalizedSemitones];
}

export {NOTES, DEFAULT_TUNE, getNote, getNoteFromSemitone};