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
      <img id="qrImg" />
      <div id="info" class="info"></div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="submit"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, defineProps,toRefs} from 'vue'
import http from '@/utils/promise'
import axios from "axios";
type Form = {
account: string,
password: string,
}
const props = defineProps ({
  dialogFormVisible: {
    type: Boolean,
    default: () => {
      return true
    }
  }
})

const {dialogFormVisible} = toRefs(props)

let formLabelWidth = ref('60px')

let loginForm: Form = reactive({
  account: '',
  password: ''
})

const emits = defineEmits(['close']);

const dialogClose = () => {
  emits('close')
}
// const submit = () => {
//   console.log(loginForm)
//   // emits('close')
// }

</script>

<style scoped lang="scss">
/deep/.el-overlay {
}
</style>