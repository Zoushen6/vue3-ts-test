<template>
  <div class="top-bar text-left background-white">
      <span class="title">My Demo</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "TopBar"
}
</script>

<style scoped lang="scss">

.top-bar {
  height: 48px;
  width: 100%;
  border-bottom: 1px solid #e8e9e8;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  line-height: 48px;
  .title {
    margin-left: 40px;
    color: $theme-color;
  }
}

</style>