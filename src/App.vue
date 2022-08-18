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
    let timer:number = 0
    onMounted(() => {
      document.body.style.setProperty('--el-color-primary', '#c20c0c');
      document.body.style.setProperty('--el-color-primary-light-9', '#ffffff');
      document.body.style.setProperty('--el-color-primary-light-5', '#c20c0c');
      document.body.style.setProperty('--el-color-primary-light-7', '#c20c0c');
      document.body.style.setProperty('--el-menu-active-color', '#ffffff');
      window.addEventListener('scroll', function(ev) {
        document.body.toggleAttribute('scroll', true)
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          document.body.toggleAttribute('scroll')
        }, 500)
      })
    })
  }
});
</script>

<style>
/*body{*/
/*  margin: 0;*/
/*  overflow: overlay;*/
/*}*/
/*::-webkit-scrollbar{*/
/*  background-color: transparent;*/
/*  width: 12px;*/
/*}*/
/*::-webkit-scrollbar-thumb{*/
/*  background-color: transparent;*/
/*  border-radius: 8px;*/
/*  background-clip: content-box;*/
/*  border: 2px solid transparent;*/
/*}*/
/*body[scroll]::-webkit-scrollbar-thumb,*/
/*::-webkit-scrollbar-thumb:hover{*/
/*  background-color: rgba(0,0,0,.5);*/
/*}*/
</style>
