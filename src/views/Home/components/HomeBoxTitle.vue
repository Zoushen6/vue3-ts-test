<template>
  <div class="title-box flex p-r-10">
    <div class="title-name" >{{ props.title }}</div>
    <div class="classify m-l-20" v-if="classify">
      <div class="item" v-for="(item,index) in classify" :key="item.value"><span class="pointer">{{item.name}}</span></div>
    </div>
    <div class="more">更多</div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  title: String,
  classify: Array
})
</script>

<style scoped lang="scss">
.title-box {
  height: 35px;
  line-height: 35px;
  border-bottom: 2px solid #C10D0C;

  .title-name {
    font-size: 20px;
  }

  .classify {
    .item {
      display: inline-block;
      width: 50px;
      position: relative;
      color: #666;
      font-size: 12px;
      &:after {
        content: '';
        position: absolute;
        right: -1px;
        top: 50%;
        transform: translateY(-50%);
        height: 10px;
        width: 1px;
        background-color: #ccc;
      }
      &:last-of-type:after {
        content: '';
        width: 0px;
      }
    }
  }

  .more {
    margin-left: auto;
  }
}
</style>