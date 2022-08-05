<template>
  <div>
    <canvas ref="canvas" disable-scroll='true'></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue"
import canvasSign  from './BaseSign'
const props = defineProps({
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 800
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
let cv

const clear = () => {
  cv.clear()
}
defineExpose({
  clear
})
onMounted(() => {
  canvas.value.width = props.width
  canvas.value.height = props.height
  canvas.value.style.cssText = `background: ${props.bgColor}`
  cv = new canvasSign(canvas.value);
  console.log(cv)
})
</script>

<style scoped lang="scss">

</style>