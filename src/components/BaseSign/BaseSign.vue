<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue"
const props = defineProps({
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 300
  },
  lineWidth: {
    type: Number,
    default: 4
  },
  lineColor: {
    type: String,
    default: '#000000'
  },
  bgColor: {
    type: String,
    default: ''
  },
  isCrop: {
    type: Boolean,
    default: false
  },
  isClearBgColor: {
    type: Boolean,
    default: true
  },
  format: {
    type: String,
    default: 'image/png'
  },
  quality: {
    type: Number,
    default: 1
  }
})
const canvas = ref()

onMounted(() => {
  canvas.value.width = props.width
  canvas.value.height = props.height
  console.log(canvas)
})
</script>

<style scoped lang="scss">

</style>