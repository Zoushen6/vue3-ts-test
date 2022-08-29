<template>
  <input
      type="file"
      ref="excelRef"
      :accept="accept"
      @change="onChange"
      class="excel m-t-20"
  />
  <button @click="copy" class="btn" data-clipboard-target="#data">复制</button>
  <h1 class="m-t-20">解析数据：</h1>
  <h2 id="data">
    <code>{{ excelData }}</code>
  </h2>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as XLSX from 'xlsx'
import ClipboardJS from "clipboard";

// interface Props {
//   accept: string
// }
//
// const props = withDefaults(defineProps<Props>(), {
//   accept:
//       '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
// })

const accept = '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

const excelRef: any = ref(null)
const excelData: any[] = reactive([])

const clearFile = () => {
  excelRef.value.value = "";
};
const clipboard = new ClipboardJS('.btn');
clipboard.on('success', function (e) {
  ElMessage( {
    message: '复制成功',
    type: 'success',
  })
});
clipboard.on('error', function (e) {
  ElMessage( {
    message: '复制失败',
    type: 'warning',
  })
});
const copy = () => {
}


// 标准化 JSON 数据
const excelDataToJson = (sheetJson: any[]) => {
  if (!sheetJson.length) return;

  let result = sheetJson;
  const hasTableHead = !!sheetJson[0].__EMPTY;

  // 拥有表头的数据，需要取正确的值
  if (hasTableHead) {
    const header = sheetJson.shift();
    const data: any[] = [];
    Object.keys(header).forEach((key) => {
      sheetJson.forEach((item, index) => {
        const obj = data[index] || {};
        obj[header[key]] = item[key];
        data[index] = obj;
      });
    });

    console.log("【】【】", data);
    result = data;
  }

  // 将表格对应的文字转换为 key
  result.forEach((item) => {
    const newItem: any = {};
    Object.keys(item).forEach((key) => {
      newItem.title = key;
      newItem[key] = item[key];
    });
    excelData.push(newItem);
  });
};

// 读取对应表格文件
const readerExcel = (file: File) => {
  const fileReader = new FileReader();

  // 以二进制的方式读取表格内容
  fileReader.readAsBinaryString(file);

  // 表格内容读取完成
  fileReader.onload = (event: any) => {
    try {
      const fileData = event.target.result;
      const workbook = XLSX.read(fileData, {
        type: "binary",
      });

      // 表格是有序列表，因此可以取多个 Sheet，这里取第一个 Sheet
      const wsname = workbook.SheetNames[0];
      // 将表格内容生成 json 数据
      const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);

      console.log(sheetJson);

      // 标准化 JSON 数据
      excelDataToJson(sheetJson);

    } catch (e) {
      console.log(e);
      return false;
    }
  };
};

// 文件变化时触发
const onChange = (event) => {
  // 获取文件对象
  const file = event.target.files[0];

  // 读取文件内容
  readerExcel(file);

  // 清除数据
  clearFile();
};
</script>