<template>
  <div class="top-bar background-white">
    <div class="content">
      <div class="flex">
        <router-link class="title" to="/" title="My Demo">My Demo test</router-link>
        <Menu></Menu>
      </div>
      <div class="right-info flex">
        <el-popover popper-class="disable-popper-padding">
          <template #reference>
            <div class="info" v-show="userInfo.isLogin">
              <span>{{userInfo.nickname}}</span>
              <img alt=""  id="avatar" style="width:36px;height:36px" class="m-l-10 pointer avatar" />
            </div>
          </template>
          <el-button @click="logOut">退出登录</el-button>
        </el-popover>

        <div class="m-l-15">
          <div class="login pointer" @click="showLogin" v-show="!userInfo.isLogin" >登录</div>
        </div>
      </div>
    </div>
    <!--    登录弹窗-->
    <login-dialog v-if="dialogFormVisible" :dialogFormVisible="dialogFormVisible" @close="dialogClose"></login-dialog>
    <!--    /登录弹窗-->
  </div>
</template>

<script lang="ts">
import {onMounted, ref, toRef, computed, watch} from "vue"
import LoginDialog from "@/components/LoginDialog.vue"
import { userStore } from "@/store/userStore"
import { storeToRefs } from 'pinia';
import Menu from "@/components/Menu.vue"
export default {
  name: "TopBar",

  components: {LoginDialog,Menu},

  setup() {

    const { userInfo,removeUser } = userStore()

    const setAvatar = (avatar) => {
      let queryList:any = document.querySelector('#avatar')
      if(queryList) {
        queryList.src = avatar
      }
    }

    onMounted(() => {
      //刷新页面显示头像
      setAvatar(userInfo.avatarUrlL)
    })

    watch(() => userInfo.avatarUrlL,(newVal,oldVal) => {
      console.log('watch',newVal)
      //登录后弹窗关闭显示头像
      setAvatar(newVal)
    })

    let dialogFormVisible = ref(false)

    const showLogin = () => {
      dialogFormVisible.value = true
    }
    const logOut = () => {
      localStorage.clear()
      removeUser()
    }

    const dialogClose = () => {
      dialogFormVisible.value = false
    }
    return {
      showLogin,
      dialogFormVisible,
      dialogClose,
      userInfo,
      logOut
    }
  }
}
</script>

<style scoped lang="scss">

.top-bar {
  height: 60px;
  width: 100%;
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

    .avatar:hover {
      transform: rotate(666turn);
      transition-delay: 1s;
      transition-property: all;
      transition-duration: 59s;
      transition-timing-function: cubic-bezier(.34,0,.84,1);
    }
  }
}

</style>