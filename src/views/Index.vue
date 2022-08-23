<template>
  <div>
    <top-bar></top-bar>
      <div class="content">
        <router-view v-slot="{ Component }">
<!--          transition动画导致banner组件中的mouseenter和mouseLeave方法在动画中触发，导致报错-->
<!--          <transition name="fade-transform" mode="out-in">-->
            <component :is="Component" />
<!--          </transition>-->
        </router-view>
      </div>
  </div>
</template>

<script lang="ts">
import TopBar from "@/components/TopBar.vue";
export default {
  name: "Index",

  components: {TopBar}
}
</script>

<style scoped lang="scss">
.content {
  text-align: center;
  color: $font-color-base;
  margin-top: 60px;
  background-color: $bg-color-grey;
}
</style>