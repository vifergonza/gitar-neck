<template>
    <div class="guitar-neck">
        <h1>Guitar Neck (strings: {{stringsNumber}}, freats: {{freatsNumber}})</h1>
        <div class="neck-container">
            <div class="neck-string" v-for="(string, index) in strings" v-bind:key="index">
                <div class="neck-freat" v-for="(freat, index) in string" v-bind:key="index">
                    {{ freat.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNote } from '../model/note.js';

export default {
    name: 'GuitarNeck',
    props: {
        stringsNumber: Number,
        freatsNumber: Number,
    },
    data: function() {
        return {
            strings: []
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
</style>
