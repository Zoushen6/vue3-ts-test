<template>
  <div class="top-bar background-white">
    <div class="content">
      <router-link class="title" to="/" title="My Demo">My Demo</router-link>
      <div class="login pointer" @click="showLogin">登录</div>
    </div>
    <!--    登录弹窗-->
    <login-dialog :dialogFormVisible="dialogFormVisible" @close="dialogClose"></login-dialog>
    <!--    /登录弹窗-->
  </div>
</template>

<script lang="ts">
import {onMounted, ref, toRef} from "vue"
import LoginDialog from "@/views/LoginDialog.vue"
export default {
  name: "TopBar",

  components: {LoginDialog},

  setup() {

    let dialogFormVisible = ref(false)

    const showLogin = () => {
      dialogFormVisible.value = true
    }

    const dialogClose = () => {
      dialogFormVisible.value = false
    }
    return {
      showLogin,
      dialogFormVisible,
      dialogClose
    }
  }
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
  .content {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .title {
      color: $theme-color;
    }

    .login {
      color: $font-color-base;
      &:hover {
        text-decoration: underline;
        color: #787878;
      }
    }
  }
}

</style>