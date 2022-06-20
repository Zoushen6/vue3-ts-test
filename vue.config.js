const path = require('path');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = {
    //存储时不需要eslint
    lintOnSave: false,
    //webpack配置
    devServer: {
        port: 8083, //指定启动端口 不与node服务端口冲突（node服务端口为8088）
        proxy: {
            '/api':
                {
                target: 'http://localhost:8088',   //代理地址，这里设置的地址会代替axios中设置的baseURL
                // ws: true,
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': '/'
                    //路径重写 原接口路径是http://localhost:8088/data 而我们是 http://localhost:8080/api/data
                    //所以先target代替axios的baseurl(http://localhost:8080) 为->  http://localhost:8088
                    //之后再把/api去掉  变为http://localhost:8088/data
                }
            },
        },
    },

    css: {
        loaderOptions: {
            sass: {
                additionalData  : `@import "@/assets/scss/_variable.scss";` //引入全局变量
            }
        }
    },


    configureWebpack: {
        // element-plus自动导入插件
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    //     plugins: [],
    //     resolve: {
    //         // 设置别名
    //         alias: {
    //             '@': utils.resolve('src'), // 这样配置后 @ 可以指向 src 目录
    //             '@assets': utils.resolve('src/assets'), // 这样配置后 @assets 可以指向 assets 目录
    //             '@components': utils.resolve('src/components'), // 这样配置后 @components 可以指向 components 目录
    //             '@config': utils.resolve('src/config'), // 这样配置后 @config 可以指向 config 目录
    //             '@filter': utils.resolve('src/filter'), // 这样配置后 @filter 可以指向 filter 目录
    //             '@mixins': utils.resolve('src/mixins'), // 这样配置后 @mixins 可以指向 mixins 目录
    //             '@router': utils.resolve('src/router'), // 这样配置后 @router 可以指向 router 目录
    //             '@store': utils.resolve('src/store'), // 这样配置后 @store 可以指向 store 目录
    //             '@tools': utils.resolve('src/tools'), // 这样配置后 @tools 可以指向 tools 目录
    //             '@views': utils.resolve('src/views'), // 这样配置后 @views 可以指向 views 目录
    //             '@directive': utils.resolve('src/directive'), // 这样配置后 @directive 可以指向 directive 目录
    //         }
    //     },
    },
}
