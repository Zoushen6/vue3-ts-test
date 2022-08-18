
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const Index = () => import('@/views/Index.vue')
const Home = () =>import('@/views/Home/Index.vue')  //
const NowTimes = () =>import('@/components/NowTimes.vue')   //
const TsTest = () =>import('@/views/TsTest/index.vue')
const Sign = () =>import('@/components/Sign.vue')
const ListRender = () =>import('@/views/ListRender/index.vue')
/**
 * 定义路由模块
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        redirect: {name : 'home'},
        component: Index,
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
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
            },
            {
                path: '/sign',
                name: 'sign',
                component: Sign
            },
            {
                path: '/list',
                name: 'list',
                component: ListRender
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