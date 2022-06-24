import axios from "./index"
import {AxiosPromise, AxiosRequestConfig} from 'axios'



// export interface ResponseCheckData {
//     code: number
//     cookie: any
//     message: string
//     data?: any  //data就算沒有也得加上 因为泛型定义了
// }

// export interface AxiosResponse<T = any>  {
//     data: T;  ！！！！！！！！！！
//     status: number;
//     statusText: string;
//     headers: any;
//     config: AxiosRequestConfig;
//     request?: any;
// }

//获取key
export const loginGetKey = () => {
    return axios.request({
        url: '/login/qr/key',
        params: {
        },
        method: 'GET'
    })
}

//获取二维码img
export const loginGetImg = (key:string) => {
    return axios.request({
        url: '/login/qr/create',
        params: {
            key:key,
            qrimg: true,
        },
        method: 'GET'
    })
}

//轮询检查登录状态
export const loginQrCheck = (key:string) => {
    return axios.request({
        url: '/login/qr/check',
        params: {
            key:key,
        },
        method: 'GET'
    })
}

//获取用户信息
export const getStatus = () => {
    return axios.request({
        url: '/login/status',
        params: {},
        method: 'GET'
    })
}


