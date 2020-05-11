<template>
    <div class="guitar-neck">
        <div>
            <span>Mask</span>            
            <select v-model="selected.mask">
                <option v-for="(mask, index) in masks" v-bind:value="mask" v-bind:key="index">
                    {{ mask.name }}
                </option>
            </select>
        </div>
        <div>
            <button v-on:click="decreaseOffset()">&lt;</button>
            <button v-on:click="increaseOffset()">&gt;</button>
            <button v-on:click="clear()">Clear</button>
        </div>

        <div class="neck-container" v-bind:class="{ scale: scale != null }">
            <div class="neck-string" v-for="(string, string_index) in strings" v-bind:key="string_index">
                <div class="neck-freat" v-bind:class="{ 'in-mask': isInMask(string_index, freat_index) }" v-for="(freat, freat_index) in string" v-bind:key="freat_index">
                    <span v-bind:class="{ 'in-scale': isInScale(freat), 'is-tonic': isTonic(freat) }">
                        {{ freat.name }}
                     </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNote } from '../model/note.js';
import { MASKS } from '../model/mask.js';

export default {
    name: 'GuitarNeck',
    props: {
        stringsNumber: Number,
        freatsNumber: Number,
        scale: null
    },
    data: function() {
        return {
            strings: [],
            masks: MASKS,
            selected: {
                mask: null,
                offset: 0
            }
        }
    },
    mounted() {
        this.initNeck(this.stringsNumber, this.freatsNumber);
    },
    watch: {
        stringsNumber: function(val) {
            this.initNeck(val, this.freatsNumber);
        },
        freatsNumber: function(val) {
            this.initNeck(this.stringsNumber, val);
        },
        scale: function(val) {
            this.scale = val;
        }
    },
    methods: {
        initNeck(strings, freats) {
            this.strings = new Array(strings);
            for (var i = 0; i < this.strings.length; i++) {
                this.strings[i] = new Array(freats);
                for (var j = 0; j < this.strings[i].length; j++) {
                    this.strings[i][j] = getNote(i, j);
                }
            }
        },
        isInScale(note) {
            if (this.scale) {
                return this.scale.some(n => n.semitones === note.semitones);
            } else {
                return true;
            }
        },
        isInMask(stringIndex, freatIndex) {
            if (this.selected.mask) {
                console.log('vfg', stringIndex, freatIndex, this.selected.mask, this.selected.mask.strings[stringIndex]);
                var currentString = this.selected.mask.strings[stringIndex];
                return currentString.some( n => freatIndex === (n + this.selected.offset))
            } else {
                return false;
            }
        },
        isTonic(note) {
            if (this.scale) {
                return note.semitones === this.scale[0].semitones;
            } else {
                return true;
            }
        },
        increaseOffset() {
            this.selected.offset++;
        },
        decreaseOffset() {
            this.selected.offset--;
        },
        clear() {
            this.selected.mask = null;
            this.selected.offset = 0;
        }
    }
}
</script>

<style scoped>
    
    .guitar-neck {
        padding: 20px;
    }

    .neck-container {
        background-color: #FDD998;
    }

    .neck-string {
        display: flex;
        flex-direction: row;
    }
    
    .neck-freat {
        padding: 10px;
        width: 30px;
        text-align: center;
        border-right: 2px solid brown;
    }

    .neck-string .neck-freat:first-of-type {
        background-color: #FFFFFF;
    }

    div.neck-string div.neck-freat.in-mask {
        background-color: #d0ff80;
    }
    
    div.neck-container.scale .neck-freat:not(:first-of-type) span {
        opacity: 0.3;
    }

    div.neck-container.scale .neck-freat:not(:first-of-type) span.in-scale {
        opacity: 1;
    }

    div.neck-container.scale .neck-freat span.is-tonic {
        font-weight: bolder;
    }
</style>
