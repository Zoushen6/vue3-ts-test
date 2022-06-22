import axios, {AxiosRequestConfig} from 'axios';

const axiosDefault = axios.create({
    baseURL: '/api',
    timeout: 300000
});
// 请求数据之前回调--处理传送固定参数
axiosDefault.interceptors.request.use((config: AxiosRequestConfig) => {
    //非登录接口添加token属性
    if (config.url.indexOf('qr') > 0) {
        config.url.params['timestamp'] = new Date.getTime()
        //console.log
        console.log(config)
    }
    return config;
});

export default axiosDefault;
