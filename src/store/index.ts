import { createStore } from 'vuex'
import {getStatus} from '@/api/login'

export default createStore({
    state: {
        nickname:'',
        avatarUrlL: '',
        isLogin: false,
        cookie: null,
        activeIndex: '',
    },
    mutations: {
        //设定用户cookie
        setCookie(state, data) {
            state.cookie = data;
        },
        //设定用户昵称
        setNickname(state, data) {
            state.nickname = data;
        },
        //设定用户头像
        setAvatar(state, data) {
            state.avatarUrlL = data;
        },
        //设定用户登录状态
        setIsLogin(state, data) {
            state.isLogin = data;
        },

        //清除用户数据
        removeUser(state) {
            state.nickname = '',
            state.avatarUrlL = '',
            state.isLogin = false,
            state.cookie = null
        },

        setActiveIndex(state,data) {
            state.activeIndex = data
        }
    },
    actions: {
        getUserInfo({commit}) {
            return getStatus().then(res => {
                if(res && res.data.data.code === 200) {
                    commit('setAvatar',res.data.data.profile.avatarUrl)
                    commit('setNickname',res.data.data.profile.nickname)
                    commit('setIsLogin',true)
                }
            })
        }
    },
    modules: {
    }
})