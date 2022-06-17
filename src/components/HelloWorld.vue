<template>
  <div class="hello">
    <button @click="routeToTime">跳转到时间组件</button>
    <div>
        <button v-for="(item,index) in list" :key="index" @click="selectFun(index)">{{item}}</button>
    </div>
    <h1>{{selected}}</h1>
    <div><button @click="overAction">选择完毕</button></div>
    <div>{{overText}}</div>
    <div><button @click="changeObj">改变对象键值</button> reactive: {{reactiveObj}}</div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  // onRenderTracked,
  onRenderTriggered,
watch
  } from 'vue';

import { useRouter } from 'vue-router'
interface DataProps{
  list:string[];
  selected: string;
  selectFun: (index:number) => void;
}
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    console.log('1-开始创建组件-------setup()');
    const data : DataProps = reactive({
      list:['a','b','c'],
      selected:"",
      selectFun: (index:number) => {
      data.selected = data.list[index];
    }
    });

    onBeforeMount(() => {
        console.log('2-组件挂载到页面之前执行-------onBeforeMount');
    });

    onMounted(() => {
        console.log('3-组件挂载到页面之后执行-------onMounted');
    });

    onBeforeUpdate(() => {
        console.log('4-组件更新之前执行-------onBeforeUpdate');
    });

    onUpdated(() => {
        console.log('5-组件更新之后执行-------onUpdated');
    });

    // onRenderTracked((event) => {
    //   console.log("状态跟踪钩子函数------------------>");
    //   console.log(event);
    // })

    onRenderTriggered((event) => {
      console.log("状态跟踪钩子函数------------------>");
      console.log(event);
    })

    const refData = toRefs(data);
    const overText = ref('aaa');
    const overAction = () => {
      overText.value = "选择完毕|" + overText.value
    }
    watch([overText,()=>data.selected],(newValue,oldValue) => {
      console.log(`new----->${newValue}`);
      console.log(`old----->${oldValue}`);
      // document.title = newValue[0]
    })

    // let reactiveObj = {a:1}  这样是无法响应式的
    let reactiveObj = reactive({a:1})
    const changeObj = () => {
      reactiveObj.a = 222
    }


    const router = useRouter();

    const routeToTime = () => {
        router.push("/nowTimes")
    }
  
    return {
      ...refData,
      overText,
      overAction,
      reactiveObj,
      changeObj,
      routeToTime
    }
  },

  // beforeCreate() {
  //   console.log('1.1-开始创建组件-------beforeCreate()'); //vue3中的生命周期钩子函数会比vue2中对应的钩子早一步执行
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
