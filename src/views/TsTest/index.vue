<template>
  <div>
    <el-button @click="change">点击改变</el-button>
    <div>
      <p>姓名：{{person.name}}</p>
      <p>年龄：{{person.age}}</p>
      <p>介绍：{{person.introduce}}</p>
      <el-button @click="person.sayHi()">sayHi</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive} from 'vue'

export default {
  name: "index",

  setup() {
    type Person = {
      name: string
      age: number
      introduce?: string
      sayHi(): void
    }
    let person:Person = reactive({
      name: 'zoushen',
      age: 22,
      introduce: '介绍',
      sayHi() {
        this.introduce = 'hi,' + `I am ${this.name}`
        console.log(this.introduce)
      }
    })

    let someValue: any = '1122331144';
    //类型断言： 浏览器觉得someValue是any类型，而我们可以进行断言，强制转化any为string类型，好比其它语言里的类型转换
    let strLength: number = (<string>someValue).length;

    const change = () => {
      Object.assign(person,{
        name: 'aaaa',
        age: '33',
      })
    }
    return {
      person,
      strLength,
      change
    }
  }
}
</script>

<style scoped lang="scss">

</style>