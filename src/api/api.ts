import axios from "./index"

//轮播图
// type :资源类型 默认为0（pc）
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
export const getBanner = () => {
    return axios.request({
        url: '/banner',
        params: {
        },
        method: 'GET'
    })
}

//热门推荐歌单
// limit：取出数量 , 默认为 10 (不支持 offset)
export const getRecommend = () => {
    return axios.request({
        url: '/personalized',
        params: {
            limit: 8
        },
        method: 'GET'
    })
}

