<template>
  <div class="main" @mouseenter="mouseEnter" @mouseleave="mouseLeave" v-loading="loading">
    <!-- 虚化背景-->
    <div class="bg" ref="bg"></div>
    <!-- 轮播图-->
    <section >
      <!-- 放图片的盒子 -->
      <div class="tupian">
        <img :src="imgUrl" class="image" ref="image">
      </div>
      <!-- 放小圆点的盒子，里面的小圆点数量通过js动态添加 -->
      <div class="select" v-if="imgList.length">
        <div class="dian" v-for="(item,idx) in imgList" :class="index === idx ? 'check' : ''" :key="idx" @click="handleSelect(idx)"></div>
      </div>
      <!-- 左右切换按钮 -->
      <div class="bt left" @click="handleLeft"><el-icon :size="40" :color="'#ffffff'"><ArrowLeft /></el-icon></div>
      <div class="bt right" @click="handleRight"><el-icon :size="40" :color="'#ffffff'"><ArrowRight /></el-icon></div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref} from "vue"
import {getBanner} from "@/api/api"

//setup中直接获取dom节点，直接log是空值但是在getBanner().then()中可以获取到，不知道为啥
// const bgImg = document.getElementsByClassName('bg')
// const imgElement = document.getElementsByClassName('image')
const bg = ref()//背景元素
const image = ref()//轮播图元素
let imgList:Array<string> = reactive([]); //图片列表
let imgUrl = ref('');//src绑定的url
let index = ref(0);//轮播图起始位置
let interval:number //定时器
let loading = ref(false)
// 获取轮播图并处理数据
loading.value = true
getBanner().then(res => {
  // imgList.value = res.data.banners.map(item => item.imageUrl)
  imgList.push(...res.data.banners.map(item => item.imageUrl))
  setImg(imgList[index.value])
  image.value.classList.add('blur-style')
  interval = setInterval(play,5000)
  loading.value = false
})

const setImg = (url) => {
  imgUrl.value = url
  bg.value.style.cssText = `background:url(${url})`
}

const play = () => {
  index.value++;
  if(index.value === imgList.length) {
    index.value = 0
  }
  setImg(imgList[index.value])
}

const handleSelect = (idx) => {
  index.value = idx
  setImg(imgList[idx])
}

const handleLeft = () => {
  if(index.value!==0) {
    index.value--;
  }else {
    index.value = imgList.length-1;
  }
  setImg(imgList[index.value])

}

const handleRight = () => {
  if(index.value!==imgList.length-1) {
    index.value++;
  }else {
    index.value = 0;
  }
  setImg(imgList[index.value])
}

const mouseEnter = () => {
  image.value.classList.remove('blur-style')
  clearInterval(interval)
}

const mouseLeave = () => {
  image.value.classList.add('blur-style')
  interval = setInterval(play,5000)
}

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  .bg {
    position: absolute;
    width: 200%;
    height: 100%;
    background: url("http://p1.music.126.net/Pd-IX7Ho4k6N-akqQiZmTQ==/109951167593762443.jpg?imageView&blur=40x20");
    background-size: 100% 100%;
    filter: blur(60px);
    overflow: hidden;
  }
  section {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 100%;
    max-width: 980px;
    .tupian {
      width: 100%;
      height: 100%;
      .image{
        width: 100%;
        height: 100%;
      }
    }

    //左右按钮
    .bt{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 20%;
      cursor: pointer;
      transition: all 0.3s;
      .el-icon {
        position: absolute;
        right: 50%;
        bottom: 50%;
        transform: translate(50%, 50%);
      }
      &:hover {
        background-color: rgba(82, 81, 81, 0.4);
      }
    }
    .left{
      left: -60px;
    }
    .right{
      right: -60px;
    }

    //小圆点
    .select{
      position: absolute;
      bottom: 10px;
      height: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .dian{
        margin: 0 10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $font-color-white;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background-color: $theme-color;
        }
      }
      .check {
        background-color: $theme-color;
      }
    }

  }

  .blur-style{
    animation: bian 5s linear infinite;
  }


  @keyframes bian{
    100%{
      opacity: 0.2;
      backdrop-filter: blur(10px);
    }

    30%,80%{
      opacity: 1;
      backdrop-filter: blur(0px);
    }

  }

}

</style>