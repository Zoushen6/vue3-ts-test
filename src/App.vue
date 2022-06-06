<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view></router-view>
<!--  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
<!--  <div style="margin-top: 10%">-->
<!--    <NowTimes ></NowTimes>-->
<!--  </div>-->
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import NowTimes from './components/NowTimes.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    NowTimes
  }
});
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
