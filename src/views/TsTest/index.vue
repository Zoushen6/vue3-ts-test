<template>
  <div class="test-obj">
    <div>对象相关</div>
    <el-button @click="change">点击改变</el-button>
    <div>
      <h3>person</h3>
      <p>姓名：{{person.name}}</p>
      <p>年龄：{{person.age}}</p>
      <p>介绍：{{person.introduce}}</p>
      <el-button @click="person.sayHi()">sayHi</el-button>
    </div>
    <div>------------------------------------------------</div>
    <div>拷贝</div>
    <div>
      <h3>person1</h3>
      <p>姓名：{{person1.name}}</p>
      <p>年龄：{{person1.age}}</p>
      <p>介绍：{{person1.introduce}}</p>
      <el-button @click="person1.sayHi()">sayHi</el-button>
    </div>
    <div>------------------------------------------------</div>
    <div>
      <h3>person2</h3>
      <p>姓名：{{person2.name}}</p>
      <p>年龄：{{person2.age}}</p>
      <p>介绍：{{person2.introduce}}</p>
      <el-button @click="person2.sayHi()">sayHi</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive} from 'vue'
import _ from "lodash"
type Person = {
  name: string
  age: number
  introduce?: string
  sayHi(): void
}
export default {
  name: "index",

  setup() {
    let person:Person = reactive({
      name: 'zoushen',
      age: 22,
      introduce: '介绍',
      sayHi() {
        this.introduce = 'hi,' + `I am ${this.name}`
        console.log(this.introduce)
      }
    })

    const change = () => {
      Object.assign(person,{
        name: 'aaaa',
        age: '33',
      })
    }

    let someValue: any = '1122331144';
    //类型断言： 浏览器觉得someValue是any类型，而我们可以进行断言，强制转化any为string类型，好比其它语言里的类型转换
    let strLength: number = (<string>someValue).length;

    //浅拷贝
    let person1 = person

    //深拷贝
    let person2 = reactive(_.cloneDeep(person1))


    return {
      person,
      person1,
      person2,
      strLength,
      change
    }
  }
}
</script>

<style scoped lang="scss">
.test-obj {
  width: 500px;
  border: 1px solid pink;
  display: inline-block;
}

</style>