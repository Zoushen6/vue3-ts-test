<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="#fff"
        :ellipsis="false"
        background-color="transparent"
        @select="handleSelect"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/tsTest">排行榜</el-menu-item>
<!--      <el-menu-item index="3">Info</el-menu-item>-->
<!--      <el-menu-item index="4">Orders</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();
const activeIndex = computed(() => store.state.activeIndex);
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