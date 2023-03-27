<template>
  <div class="editor-container">
    <Toolbar :editor="editorRef" :mode="mode"/>
    <Editor
        v-model="state.editorVal"
        :defaultConfig="editorConfig"
        :mode="mode"
        :style="{ height }"
        @onChange="handleChange"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts" name="wngEditor" setup>
// https://www.wangeditor.com/v5/for-frame.html#vue3
import '@wangeditor/editor/dist/css/style.css'
import {onBeforeUnmount, onMounted, reactive, shallowRef, watch} from 'vue'
import {IDomEditor} from '@wangeditor/editor'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Session} from "/@/utils/storage"
import {ElMessage} from "element-plus"

// 定义父组件传过来的值
const props = defineProps({
  // 是否禁用
  disable: {
    type: Boolean,
    default: () => false,
  },
  // 内容框默认 placeholder
  placeholder: {
    type: String,
    default: () => '请输入内容...',
  },
  // https://www.wangeditor.com/v5/getting-started.html#mode-%E6%A8%A1%E5%BC%8F
  // 模式，可选 <default|simple>，默认 default
  mode: {
    type: String,
    default: () => 'default',
  },
  // 高度
  height: {
    type: String,
    default: () => '310px',
  },
  // 双向绑定，用于获取 editor.getHtml()
  getHtml: String,
  // 双向绑定，用于获取 editor.getText()
  getText: String,
})

// 定义子组件向父组件传值/事件
const emit = defineEmits(['update:getHtml', 'update:getText'])

// 定义变量内容
const editorRef = shallowRef()
const state = reactive({
  editorConfig: {
    placeholder: props.placeholder,
  },
  editorVal: props.getHtml,
})

const editorConfig = {
  MENU_CONF: {},
  placeholder: props.placeholder,
  editorVal: props.getHtml
}
onMounted(() => {
  //getUploadCateList()
  if (Session.get('token')) {
    uploadHeader.Authorization = `Bearer ${Session.get('token')}`
  }
})
const uploadHeader = reactive({
  Authorization: ''
})
type InsertFnType = (url: string, alt: string, href: string) => void;
editorConfig.MENU_CONF['uploadImage'] = {
  fieldName: 'file',
  server: '/api/upload/image',
  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 2 * 1024 * 1024, // 1M
  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 50,
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],
  // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
  // meta: {
  //   token: 'xxx',
  //   otherKey: 'yyy'
  // },
  // 将 meta 拼接到 url 参数中，默认 false
  metaWithUrl: false,
  headers: uploadHeader,
  // 超时时间，默认为 10 秒
  timeout: 5 * 1000, // 5 秒
  customInsert(res: any, insertFn: InsertFnType) {  // TS 语法
    if (res.code) {
      insertFn(res.data.url, res.data.alt, res.data.href)
    } else {
      ElMessage.error(res.msg)

    }
  },
  // // 上传之前触发
  // onBeforeUpload(file: File) { // TS 语法
  //   // onBeforeUpload(file) {    // JS 语法
  //   // file 选中的文件，格式如 { key: file }
  //   return file
  //
  //   // 可以 return
  //   // 1. return file 或者 new 一个 file ，接下来将上传
  //   // 2. return false ，不上传这个 file
  // },
  //
  // // 上传进度的回调函数
  // onProgress(progress: number) {  // TS 语法
  //   // onProgress(progress) {       // JS 语法
  //   // progress 是 0-100 的数字
  //   console.log('progress', progress)
  // },
  //
  // // 单个文件上传成功之后
  // onSuccess(file: File, res: any) {  // TS 语法
  //   // onSuccess(file, res) {          // JS 语法
  //   console.log(`${file.name} 上传成功`, res)
  // },
  //
  // // 单个文件上传失败
  // onFailed(file: File, res: any) {   // TS 语法
  //                                    // onFailed(file, res) {           // JS 语法
  //   console.log(`${file.name} 上传失败`, res)
  // },

  // // 上传错误，或者触发 timeout 超时
  // onError(file: File, err: any, res: any) {  // TS 语法
  //   // onError(file, err, res) {               // JS 语法
  //   console.log(`${file.name} 上传出错`, err, res)
  // },
}
// 编辑器回调函数
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}
// 编辑器内容改变时
const handleChange = (editor: IDomEditor) => {
  emit('update:getHtml', editor.getHtml())
  emit('update:getText', editor.getText())
}
// 页面销毁时
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
// 监听是否禁用改变
// https://gitee.com/lyt-top/vue-next-admin/issues/I4LM7I
watch(
    () => props.disable,
    (bool) => {
      const editor = editorRef.value
      if (editor == null) return
      bool ? editor.disable() : editor.enable()
    },
    {
      deep: true,
    }
)
// 监听双向绑定值改变，用于回显
watch(
    () => props.getHtml,
    (val) => {
      state.editorVal = val
    },
    {
      deep: true,
    }
)
</script>
