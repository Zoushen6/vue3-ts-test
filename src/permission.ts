import router from './router/router'
import store from "./store";
import {reactive, ref,toRaw} from 'vue'

router.beforeEach(async (to, from, next) => {
    // console.log(to)
    // console.log(from)
    if (!store.state.cookie) {
        const cookie = localStorage.getItem('cookie');
        if (cookie) {
            //保存数据到store
            store.commit('setCookie',cookie);
        }
    }
    const hasCookie = store.state.cookie;
    if(hasCookie) {
        await store.dispatch('getUserInfo').finally(() => {
            next()
        })
    }else {
        next()
    }
})