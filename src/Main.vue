<template>
  <div>
    <menu-app />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  data() {
    return { }
  }
})

export default class App extends Vue {}
</script>

<style>
#app, body {
  width: 100%;
  height: 100%;
  background-color: #2d3436;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* 
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  */
}
</style>
