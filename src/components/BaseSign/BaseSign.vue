<template>
  <div>
    <canvas ref="canvas" disable-scroll='true'></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue"
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
    default: '#fff'
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
watch(() => props.bgColor,(val) => {
  canvas.value.style.background = props.bgColor;
  cv.setBackgroundColor(props.bgColor)
})
const canvas = ref()
let cv

const clear = () => {
  cv.clear()
}
const download = () => {
  if(cv.hasDrawn) {
    let img = document.createElement("a");
    img.href = cv.getPNGImage();
    img.download = "canvas-sign.png";
    img.style.display = "none";
    document.body.appendChild(img);
    img.click();
    document.body.removeChild(img);
  }
}
const toBase64 = () => {
  cv.generate({isCrop: props.isCrop}).then(res => {
    console.log(res)
  }).catch(e => {
    console.warn(e)
  })
}
defineExpose({
  clear,
  download,
  toBase64
})
onMounted(() => {
  canvas.value.width = props.width
  canvas.value.height = props.height
  canvas.value.style.background = props.bgColor
  cv = new canvasSign(canvas.value);
  cv.setBackgroundColor(props.bgColor)
  console.log(cv)
})
</script>

<style scoped lang="scss">

</style>