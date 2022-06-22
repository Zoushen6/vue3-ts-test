import { ref } from "vue";
import axios from 'axios'
import http from '@/utils/promise'

function useUrlAxios(url:string,params:object) {
    const result = ref(null); 
    const loading = ref(true);
    const loaded = ref(false);
    const error = ref(null)

    http.get(url,{params}).then(res => {
        loading.value = false;
        loaded.value = true;
        console.log(res.data.name);
        //result是响应式的 如果接口请求慢的话，result是没有值的，请求到以后页面updated一下才有值
        setTimeout(() => {
            result.value = res.data
        },5000)
        console.log(result.value);
    }).catch(e => {
        error.value = e;
        loading.value = false
    })
        
    return {result,loading,loaded}
   
}

export default useUrlAxios