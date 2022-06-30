<template>
  <div class="box">
    <img :src="info.picUrl" class="pointer"/>
    <a class="pointer">{{info.name}}</a>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  info: Object,
})

</script>

<style scoped lang="scss">
.box {
  width: 100%;
  margin: 0 auto;
  img {
    width: 100%;
    //height: 100%;
    border-radius: 3px;
  }
  a {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }
}

</style>