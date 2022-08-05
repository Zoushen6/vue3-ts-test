<template>
  <div class="content">
    <div>
      <el-button @click="reset">清除</el-button>
    </div>
    <base-sign class="baseSign" ref="baseSign" :bg-color="'pink'"></base-sign>
  </div>
</template>

<script setup lang="ts">
import BaseSign from './BaseSign/BaseSign.vue'
import {ref, onMounted} from "vue";

const baseSign = ref()

const reset = () => {
    baseSign.value.clear()
}
const restore = () => {

}
const download = () => {

}
const colorChange = (e) => {

}
onMounted(() => {
  // console.log(baseSign)
})
</script>

<style scoped lang="scss">
.content {
  margin: 100px auto;
  width: 80%;
  height: 800px;
  border: 2px dashed #d3d3d3;
  .container {
  }
}
</style>