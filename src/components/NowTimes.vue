<template>
  <div>
    <h1>时间显示模块</h1>
    <div>{{nowTime}}</div>
    <div><el-button @click="getNowTime">显示时间</el-button></div>

    <h1 class="animate__animated animate__backInDown">result: {{result}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,onUpdated,onBeforeUpdate,ref } from 'vue';
import {nowTime,getNowTime} from '@/hooks/useNowTimes';
import useUrlAxios from '@/hooks/useUrlAxios';
import _ from 'lodash'

export default defineComponent({
    name: 'NowTimes',
    setup() {
        // const {result,loading,loaded} = useUrlAxios('/api/search',{keywords:'海阔天空'})
        const result = ref(1)
        const a = [1,2,3]
        const b = _.concat(a,[4,5,6])
        console.log(b);

        
        // onBeforeUpdate(() => {
        // // console.log(result.value,loaded.value,loading.value);
        // })
        return {
            nowTime,
            result,
            getNowTime
        }
    }
});
</script>

<style>
</style>
