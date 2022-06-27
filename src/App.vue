<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <router-view></router-view>
<!--  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
<!--  <div style="margin-top: 10%">-->
<!--    <NowTimes ></NowTimes>-->
<!--  </div>-->
  
</template>

<script lang="ts">
import { defineComponent,onMounted } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    onMounted(() => {
      document.body.style.setProperty('--el-color-primary', '#c20c0c');
      document.body.style.setProperty('--el-color-primary-light-9', '#ffffff');
      document.body.style.setProperty('--el-color-primary-light-5', '#c20c0c');
      document.body.style.setProperty('--el-color-primary-light-7', '#c20c0c');
      document.body.style.setProperty('--el-menu-active-color', '#ffffff');
    })
  }
});
</script>

<style>

</style>
