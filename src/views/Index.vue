<template>
  <div>
    <top-bar></top-bar>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
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