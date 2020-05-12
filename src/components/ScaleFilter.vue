<template>
    <div>
        <form class="scale-builder" @submit.prevent="submit">

            <fieldset>
                <legend>Scale builder</legend>

                <div>
                    <div>
                        <span>Scale</span>            
                        <select v-model="selected.scale">
                             <option v-for="(scale, index) in scales" v-bind:value="scale" v-bind:key="index">
                                {{ scale.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <span>Tonic</span>            
                        <select v-model="selected.tonic">
                            <option v-for="(note, index) in tonics" v-bind:value="note" v-bind:key="index">
                                {{ note.name }}
                            </option>
                        </select>
                    </div>
                    <!--
                    <div>
                        <input type="checkbox" :value="selected.pentatonic" v-model="selected.pentatonic" id="pentatonicCheck"/>
                        <label for="pentatonicCheck">Pentatonic</label>
                    </div>
                    -->
                    <div>
                        <input type="submit" value="Show on neck">
                        <button v-on:click="clear()">Clear</button>
                    </div>
                </div>
                <div class="result">
                    <ul v-if="result" class="result-scale">
                        <li v-for="(note, index) in result" v-bind:key="index">
                            {{ note.name }}
                        </li>
                    </ul>
                    <ul v-if="messages">
                        <li v-for="(message, index) in messages" v-bind:key="index">
                            {{ message }}
                        </li>
                    </ul>
                </div>
            </fieldset>
        </form>

    </div>
</template>

<script>
import { NOTES } from '../model/note.js';
import { SCALES } from '../model/scales.js';

export default {
    name: 'ScaleFilter',
    data: function() {
        return {
            scales: SCALES,
            tonics: NOTES,
            selected: {
                scale: null,
                tonic: null,
                pentatonic: false
            },
            result: null,
            messages: null,
        }
    },
    methods: {
        validate: function() {
            var errors = [];
            if (null == this.selected.scale) {
                errors.push('Select scale');
            }
            if (null == this.selected.tonic) {
                errors.push('Select tonic');
            }
            if (errors.length > 0) {
                this.messages = errors;
                return false;
            } else {
                this.messages = null;
                return true;
            }
        },
        getScale: function(_scale, _tonic, _pentatonic) {
            console.log('vfg apply pentatonic', _scale, _tonic, _pentatonic);
            return _scale.getScale(_tonic);
        },
        submit: function() {
            if (this.result) {
                this.$emit('applyScale', this.result);
            }
        },
        clear: function() {
            this.selected.scale = null;
            this.selected.tonic = null,
            this.selected.pentatonic = false;
            this.messages = null;
            this.result = null;
            this.$emit('applyScale', this.result);
        }
    },
    watch: {
        'selected.scale': function(value) {
            if (this.validate()) {
                this.result = this.getScale(value, this.selected.tonic, this.selected.pentatonic);
            }
        }, 
        'selected.tonic': function(value) {
            if (this.validate()) {
                this.result = this.getScale(this.selected.scale, value, this.selected.pentatonic);
            }
        }, 
        'selected.pentatonic': function(value) {
            this.result = this.getScale(this.selected.scale, this.selected.tonic, value);
        }
    }
}

</script>

<style scoped>


ul.result-scale li {
    display: inline;
    list-style: none;
    padding: 5px 10px;
    border-right: 1px solid #000000;
}

ul.result-scale li:last-of-type {
    border-right: unset;
}

</style>