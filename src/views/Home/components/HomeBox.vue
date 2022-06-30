<template>
  <div class="m-b-40">
    <home-box-title :title="title" :classify="classify"></home-box-title>
    <div class="content m-t-20">
      <el-row :gutter="42" class="flex">
        <el-col :span="6" v-for="(item,index) in recommendList" :key="item.id" class="m-b-20">
          <play-list :info="item"></play-list>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeBoxTitle from "@/views/Home/components/HomeBoxTitle.vue";
import PlayList from "@/components/PlayList.vue";
import {defineProps} from "vue";

const props = defineProps({
  title: String,
  classify: Array,
  recommendList: Array,
})


</script>

<style scoped lang="scss">

</style>