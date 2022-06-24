<template>
  <div class="top-bar background-white">
    <div class="content">
      <div class="flex">
        <router-link class="title" to="/" title="My Demo">My Demo</router-link>
        <Menu></Menu>
      </div>
      <div class="right-info flex">
        <div class="info" v-show="isLogin">
          <span>{{nickname}}</span>
          <img alt=""  id="avatar" style="width:36px;height:36px" />
        </div>
        <div class="">
          <div class="login pointer" @click="showLogin" v-show="!isLogin" >登录</div>
          <div class="login pointer" @click="logOut" v-show="isLogin">退出登录</div>
        </div>
      </div>
    </div>
    <!--    登录弹窗-->
    <login-dialog v-if="dialogFormVisible" :dialogFormVisible="dialogFormVisible" @close="dialogClose"></login-dialog>
    <!--    /登录弹窗-->
  </div>
</template>

<script lang="ts">
import {onMounted, ref, toRef,computed} from "vue"
import LoginDialog from "@/views/LoginDialog.vue"
import { useStore } from "vuex";
import store from "@/store"
import Menu from "@/components/Menu.vue"
export default {
  name: "TopBar",

  components: {LoginDialog,Menu},

  setup() {

    const store = useStore();

    let isLogin = computed(() => store.state.isLogin);
    let nickname = computed(() => store.state.nickname);
    let avatarUrlL = computed(() => store.state.avatarUrlL);
    onMounted(() => {
      let queryList:any = document.querySelector('#avatar')
      if(queryList) {
        queryList.src = avatarUrlL.value
      }
    })

    let dialogFormVisible = ref(false)

    const showLogin = () => {
      dialogFormVisible.value = true
    }
    const logOut = () => {
      localStorage.clear()
      store.commit('removeUser')
    }

    const dialogClose = () => {
      dialogFormVisible.value = false
    }
    return {
      showLogin,
      dialogFormVisible,
      dialogClose,
      isLogin,
      nickname,
      avatarUrlL,
      logOut
    }
  }
}
</script>

<style scoped lang="scss">

.top-bar {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #e8e9e8;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  line-height: 60px;
  background-color: $theme-color2;
  .content {
    width: 60%;
    margin: 0 auto;
    display: flex;
    height: 100%;
    justify-content: space-between;
    .title {
      color: $font-color-white;
    }

    .info {
      color: $font-color-white;
      img {
        display: inline-block;
        vertical-align: middle;
        border-radius: 18px;
      }
    }

    .login {
      color: #787878;
      &:hover {
        text-decoration: underline;
        color: $font-color-auxiliary;
      }
    }
  }
}

</style>