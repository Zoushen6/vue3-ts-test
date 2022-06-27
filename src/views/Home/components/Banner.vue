<template>
  <div class="main">
    <!-- 虚化背景-->
    <div class="bg"></div>
    <!-- 轮播图-->
    <section >
      <!-- 放图片的盒子 -->
      <div class="tupian">
        <img :src="imgUrl" class="image">
      </div>
      <!-- 放小圆点的盒子，里面的小圆点数量通过js动态添加 -->
      <div class="select" >
        <div class="dian" v-for="(item,index) in imgList.length" :key="index"></div>
      </div>
      <!-- 左右切换按钮 -->
      <div class="bt left"><el-icon :size="40" :color="'#ffffff'"><ArrowLeft /></el-icon></div>
      <div class="bt right"><el-icon :size="40" :color="'#ffffff'"><ArrowRight /></el-icon></div>
    </section>

  </div>
</template>

<script setup lang="ts">
import {nextTick, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref} from "vue"
import {getBanner} from "@/api/api"

let bgImg = document.getElementsByClassName('bg') //背景元素
let imgElement = document.getElementsByClassName('image') //轮播图元素
let imgList:Array = ref([]); //图片列表
let imgUrl:string = ref('');//src绑定的url
let index = 0;//轮播图起始位置
let interval = '' //定时器
// 获取轮播图并处理数据
function anner(){
  getBanner().then(res => {
    imgList.value = res.data.banners.map(item => item.imageUrl)
    console.log(imgList.value)
  })
}
anner()

const play = () => {
  index++;
  if(index === imgList.length) {
    index = 0
  }
  setImg(imgList[index])
}

const setImg = (url) => {
  imgUrl.value = url
  bgImg[0].style.cssText = `background:url(${url})`
}

onBeforeMount(() => {

})

onMounted(() => {
  console.log(imgList.value)
  // setImg(imgList.value[index])
  imgUrl.value = imgList.value[index]
  // bgImg[0].style.cssText = `background:url(${url})`
  imgElement[0].classList.add('blur-style')
})

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
        &:hover {
          background-color: $theme-color;
          cursor: pointer;
        }
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