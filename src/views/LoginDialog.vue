<template>
  <div>
    <el-dialog :model-value="dialogFormVisible" @close="dialogClose" :width="500" title="登录">
<!--      <el-form :model="loginForm">-->
<!--        <el-form-item label="账号" :label-width="formLabelWidth">-->
<!--          <el-input v-model="loginForm.account" autocomplete="off" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" :label-width="formLabelWidth">-->
<!--          <el-input v-model="loginForm.password" autocomplete="off" type="password" show-password />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
      <div class="qr-code">
        <div class="left">
          <img  alt="" style="height: 260px"  src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png" />
        </div>
        <div class="right" v-loading="loading">
          <div style="font-size: 18px;font-weight: 500;color: #333333" class="text-center">{{msg}}</div>
          <img  alt=""  id="qrImg" style="width:200px;height:200px;margin-left: 50%;transform: translatex(-50%);" />
          <div style="opacity: 0.4" class="text-center">使用 <i style="color: #0c73c2">网易云音乐APP</i>  扫码登录</div>
        </div>
      </div>

        <div class="text-center">
          <el-button round plain :disabled="loading">选择其他登录方式</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {reactive, ref, toRefs, onMounted, watch, onBeforeMount} from 'vue'
import {loginGetKey,loginGetImg,loginQrCheck,getStatus} from '@/api/login'
import store from "@/store"

export default {
  name: 'LoginDialog',
  props:{
    dialogFormVisible: {
      type: Boolean,
      default: true
    }
  },
  setup(props:any,context:any) {
    type Form = {
      account: string,
      password: string,
    }

    const dialogFormVisible = ref(props['dialogFormVisible'])

    let formLabelWidth = ref('60px')

    let loginForm: Form = reactive({
      account: '',
      password: ''
    })


    const dialogClose = () => {
      clearInterval(interval)
      context.emit('close')
    }

    const getImg =  () => {
      loginGetKey().then(res => {
        let qrKey = res.data.data.unikey
        loginGetImg(res.data.data.unikey).then(res => {
          let queryList:any = document.querySelector('#qrImg')
          if(queryList) {
            queryList.src = res.data.data.qrimg
          }
          qrCheck(qrKey)
        })
      })
    }

    getImg()

    let msg = ref('扫码登录')
    let interval:any = ref()
    let loading = ref(false)

    const qrCheck = (qrKey) => {
      interval = setInterval(() => {
        loginQrCheck(qrKey).then(res => {
          //二维码已过期
          if(res.data.code === 800){}
          if(res.data.code === 803) {
            clearInterval(interval)
            console.log(interval + '800/803')
            localStorage.setItem('cookie',res.data.cookie)
            store.commit('setCookie',res.data.cookie)
            loading.value = true
            msg.value = '授权登录成功，正在获取用户信息'
            store.dispatch('getUserInfo').finally(() => {
              loading.value = false
              context.emit('close')
            })
          }
        })
      },3000)

    }

    onBeforeMount(() => {
    })

    const submit = () => {

    }
    return {
      dialogFormVisible,
      formLabelWidth,
      loginForm,
      dialogClose,
      msg,
      loading,
      submit
    }
  }
}

</script>

<style scoped lang="scss">
.qr-code {
  display: flex;
  justify-content: space-around
}
</style>