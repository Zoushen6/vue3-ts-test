import router from './router/router'

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    next()
})