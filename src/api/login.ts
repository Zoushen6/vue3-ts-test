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

export const loginGetKey = () => {
    return axios.request({
        url: '/login/qr/key',
        params: {
            timestamp: new Date().getTime()
        },
        method: 'GET'
    })
}

export const loginGetImg = (key:string) => {
    return axios.request({
        url: '/login/qr/create',
        params: {
            key:key,
            qrimg: true,
            timestamp: new Date().getTime()
        },
        method: 'GET'
    })
}

export const loginQrCheck = (key:string) => {
    return axios.request({
        url: '/login/qr/check',
        params: {
            key:key,
            timestamp: new Date().getTime()
        },
        method: 'GET'
    })
}

export const getStatus = (cookie:string) => {
    return axios.request({
        url: '/login/status',
        params: {
            cookie:cookie,
        },
        method: 'GET'
    })
}


