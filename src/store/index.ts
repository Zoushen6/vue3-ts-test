import { createStore } from 'vuex'

export default createStore({
    state: {
        nickname:'zoushen',
        avatarUrlL: '',
        isLogin: false,
        cookie: null,
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
    },
    actions: {
    },
    modules: {
    }
})