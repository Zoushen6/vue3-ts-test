const path = require('path');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
console.log("当前环境:" + process.env.NODE_ENV)

module.exports = {
    //存储时不需要eslint
    lintOnSave: false,
    //不生产.map文件  .map文件可以在生产环境运行报错时准确输出哪一行那一列的错误
    productionSourceMap: false,
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === "production" ? "/vue3-ts-test/" : "./",
    //webpack配置
    devServer: {
        open: true,
        port: 8083, //指定启动端口 不与node服务端口冲突（node服务端口为8088）
        proxy: {
            '/api':
                {
                // target: 'http://localhost:8088',//代理地址，这里设置的地址会代替axios中设置的baseURL
                target: 'http://localhost:3000',//网易api 本地server地址
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
    chainWebpack: config => {
        //打包体积分析
        // if (process.env.NODE_ENV === 'production'){
        //     config
        //         .plugin('webpack-bundle-analyzer')
        //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        // }
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
    },
}
