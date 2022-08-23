import router from './router/router'
import {reactive, ref,toRaw} from 'vue'
import {userStore} from "@/store/userStore";

router.beforeEach(async (to, from, next) => {
    // console.log(to)
    // console.log(from)
    const { userInfo,getUserInfo } = userStore()
    if (!userInfo.cookie) {
        const cookie = localStorage.getItem('cookie');
        if (cookie) {
            //保存数据到store
            userInfo.cookie=cookie;
        }
    }
    const hasCookie = userInfo.cookie;
    if(hasCookie) {
        await getUserInfo().finally(() => {
            next()
        })
    }else {
        next()
    }
})