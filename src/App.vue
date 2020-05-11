<template>
  <div id="app">
    <ScaleFilter @applyScale="updateScale"></ScaleFilter>
    <GuitarNeck v-bind:stringsNumber="6" v-bind:freatsNumber="18" v-bind:scale="currentScale"></GuitarNeck>
  </div>
</template>

<script>
import GuitarNeck from './components/GuitarNeck.vue';
import ScaleFilter from './components/ScaleFilter.vue'

export default {
  name: 'App',
  components: {
    GuitarNeck,
    ScaleFilter
  },
  data: function() {
    return {
      currentScale: null
    };
  },
  methods: {
    updateScale(value) {
      this.currentScale= value;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
