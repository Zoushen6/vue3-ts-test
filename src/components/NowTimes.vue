<template>
  <h1>时间显示模块</h1>
  <div>{{nowTime}}</div>
  <div><button @click="getNowTime">显示时间</button></div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import {nowTime,getNowTime} from '../hooks/useNowTimes';
import useUrlAxios from '../hooks/useUrlAxios';

export default defineComponent({
    name: 'NowTimes',
    setup() {
        const res= useUrlAxios('/api/data')
        console.log(res);
        
        return {
            nowTime,
            getNowTime
        }
    }
});
</script>

<style>
</style>
