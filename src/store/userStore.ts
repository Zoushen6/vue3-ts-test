import { defineStore } from 'pinia';
import { reactive } from 'vue'
import {getStatus} from '@/api/login'

interface infoType {
    nickname: string,
    avatarUrlL: string,
    isLogin: boolean,
    cookie: string,
}
export const userStore = defineStore('userStore', () => {
    const userInfo = reactive<infoType>({
        nickname: '',
        avatarUrlL: '',
        isLogin: false,
        cookie: '',
    })

    const getUserInfo = () => {
        return getStatus().then(res => {
            if(res && res.data.data.code === 200) {
                userInfo.avatarUrlL = res.data.data.profile.avatarUrl
                userInfo.nickname = res.data.data.profile.nickname
                userInfo.isLogin = true
            }
        })
    }

    const removeUser = () => {
        userInfo.nickname = '',
        userInfo.avatarUrlL = '',
        userInfo.isLogin = false,
        userInfo.cookie = ''
    }
    return { userInfo,getUserInfo,removeUser }
})