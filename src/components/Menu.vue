<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="#ccc"
        :ellipsis="false"
        background-color="transparent"
        @select="handleSelect"
    >
      <el-menu-item index="/home">发现音乐</el-menu-item>
      <el-menu-item index="/tsTest">排行榜</el-menu-item>
<!--      <el-menu-item index="3">Info</el-menu-item>-->
<!--      <el-menu-item index="4">Orders</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter();
//vuex存储有点多余了
// const activeIndex = computed(() => store.state.activeIndex);
let activeIndex = computed(() => router.currentRoute.value.path);
const handleSelect = (key: string, keyPath: string[]) => {
  router.push(key)
}
</script>

<style scoped lang="scss">
.el-menu--horizontal {
  border-bottom: 0;
  height: 100%;
}
</style>