
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'    //
import NowTimes from '@/components/NowTimes.vue'  //

/**
 * 定义路由模块
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'helloWorld',
        component: HelloWorld
    },
    {
        path: '/NowTimes',
        name: 'nowTimes',
        component: NowTimes
    }
]

/**
 * 定义返回模块
 */
const router = createRouter({
    history: createWebHistory('/test/'),  // 设置为history模式，就是路径里面没有#,  createWebHashHistory 是默认的，括号里面的就是基础路径，可以理解为项目名称，就是请求路径的基础url
    routes
})

export default router