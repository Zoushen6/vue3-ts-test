import router from './router/router'
import store from './store'

router.afterEach((to, from) => {
    //刷新记忆上次激活的menu
    store.commit('setActiveIndex', to.fullPath);
});
