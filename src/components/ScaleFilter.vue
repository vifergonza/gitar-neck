<template>
    <div class="scale-filter">
        <h1>Scale builder</h1>
        <form class="scale-builder" @submit.prevent="submit">
            <div>
                <div class="form-control">
                    <div>Scale type</div>  
                    <div class="select">       
                        <select v-model="selected.scale">
                            <option value="" disabled selected>Select type</option>
                            <option v-for="(scale, index) in scales" v-bind:value="scale" v-bind:key="index">
                                {{ scale.name }}
                            </option>
                        </select>
                        <div class="select_arrow">
                        </div>
                    </div>
                </div>
                <div class="form-control">
                    <div>Tonic</div>            
                    <div class="select">
                        <select v-model="selected.tonic">
                            <option v-for="(note, index) in tonics" v-bind:value="note" v-bind:key="index">
                                {{ note.name }}
                            </option>
                        </select>
                        <div class="select_arrow">
                        </div>
                    </div>
                </div>
                <!--
                <div>
                    <input type="checkbox" :value="selected.pentatonic" v-model="selected.pentatonic" id="pentatonicCheck"/>
                    <label for="pentatonicCheck">Pentatonic</label>
                </div>
                -->
                <div class="form-control result" v-if="result">
                    <div>Scale</div>
                    <ul v-if="result" class="result-scale">
                        <li v-for="(note, index) in result" v-bind:key="index">
                            {{ note.name }}
                        </li>
                    </ul>
                    <div v-if="messages">
                        <span v-for="(message, index) in messages" v-bind:key="index">
                            {{ message }}
                        </span>
                    </div>
                </div>
                <div class="form-control" v-if="result">
                    <button v-on:click="clear()">
                        <img src="delete.svg">
                        Clear
                    </button>
                </div>
            </div>
            
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
                scale: '',
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
            console.log('TODO pentatonic', _pentatonic);
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
                this.submit();
            }
        }, 
        'selected.tonic': function(value) {
            if (this.validate()) {
                this.result = this.getScale(this.selected.scale, value, this.selected.pentatonic);
                this.submit();
            }
        }, 
        'selected.pentatonic': function(value) {
            this.result = this.getScale(this.selected.scale, this.selected.tonic, value);
        }
    }
}

</script>

<style scoped>

.scale-filter {
    max-width: 1000px;
    margin: auto;
}

form > div {
    display: flex;
}

ul.result-scale {
    padding: 9px 0px;
    margin: 0px;
}

ul.result-scale li {
    display: inline;
    list-style: none;
    padding: 5px 10px;
    border-right: 1px solid #000000;
}

ul.result-scale li:last-of-type {
    border-right: unset;
}

form {
    position: relative;
}

div.form-control {
    margin-right: 20px;
}

div.form-control:last-of-type {
    margin-right: 0px;
}

div.form-control button {
    position: absolute;
    bottom: 16px;
    height: 36px;
    background-color: #e6e6e6;
    color: #7b7b7b;
    border: 1px solid;
    border-radius: 4px;
    display: flex;
    align-items: center;
}

div.form-control button img {
    width: 20px;
    margin-right: 5px;
}

div.form-control button:hover {
    cursor: pointer;
    background-color: #cccccc;
}
</style>