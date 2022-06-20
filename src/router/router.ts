
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

import Index from '@/views/Index.vue'
import HelloWorld from '@/components/HelloWorld.vue'    //
import NowTimes from '@/components/NowTimes.vue'  //
import TsTest from '@/views/TsTest/index.vue'

/**
 * 定义路由模块
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        redirect: {name : 'helloWorld'},
        component: Index,
        children: [
            {
                path: 'helloWorld',
                name: 'helloWorld',
                component: HelloWorld,
            },
            {
                path: '/nowTimes',
                name: 'nowTimes',
                component: NowTimes
            },
            {
                path: '/tsTest',
                name: 'tsTest',
                component: TsTest
            }
        ]
    },

]

/**
 * 定义返回模块
 */
const router = createRouter({
    //createWebHashHistory是hash模式，它在 SEO 中有不好的影响
    history: createWebHistory('/'),  // 设置为history模式，就是路径里面没有#,  createWebHashHistory 是默认的，括号里面的就是基础路径，可以理解为项目名称，就是请求路径的基础url
    routes
})

export default router