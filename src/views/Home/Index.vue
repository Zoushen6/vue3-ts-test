<template>
<!--  v-ripple="{ duration: 300 }"-->
  <div class="home" >
    <the-banner></the-banner>
    <div class="content">
      <home-box :title="'热门推荐'" :classify="classify" :recommendList="recommendList"></home-box>
      <home-box :title="'新碟上架'" ></home-box>
      <home-box :title="'榜单'" ></home-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  toRefs,
  ref,
  watch
  } from 'vue';
import TheBanner from "./components/TheBanner.vue"
import { useRouter } from 'vue-router'
import HomeBox from "@/views/Home/components/HomeBox.vue"
import {getRecommend} from "@/api/api";

let recommendList:Array = reactive([])
const classify:Array = [
  {
    name: '华语',
    value: '1'
  },{
    name: '流行',
    value: '2'
  },{
    name: '摇滚',
    value: '3'
  },{
    name: '民谣',
    value: '4'
  },{
    name: '电子',
    value: '5'
  },
]

getRecommend().then(res => {
  recommendList.push(...res.data.result)
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  .content {
    width: 980px;
    margin: 0 auto;
    padding: 20px 20px 0px 20px;
    box-sizing: border-box;
    background-color: $bg-color-white;
  }
}

</style>
