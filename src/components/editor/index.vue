<template>
  <div class="editor-container">
    <Toolbar :editor="editorRef" :mode="mode"/>
    <Editor
        v-model="state.editorVal"
        :defaultConfig="state.editorConfig"
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
import {onBeforeUnmount, reactive, shallowRef, watch} from 'vue'
import {IDomEditor} from '@wangeditor/editor'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

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

const editorConfig = {MENU_CONF: {}}

editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/upload-image',
  fieldName: 'your-custom-name',
  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 1 * 1024 * 1024, // 1M
  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 50,
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],
  // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
  meta: {
    token: 'xxx',
    otherKey: 'yyy'
  },
  // 将 meta 拼接到 url 参数中，默认 false
  metaWithUrl: false,
  headers: {
    Accept: 'text/x-json',
    otherKey: 'xxx'
  },
  // 超时时间，默认为 10 秒
  timeout: 5 * 1000, // 5 秒
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
