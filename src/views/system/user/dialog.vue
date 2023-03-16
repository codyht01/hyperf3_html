<template>
  <div class="system-user-dialog-container">
    <el-dialog v-model="isShowDialog" :close-on-click-modal="false" :title="dialogTitle" width="769px">
      <el-form ref="userDialogFormRef" :model="dialogForm" :rules="dialogRules" autocapitalize="off" label-width="90px" size="default">
        <el-row :gutter="35">
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="账户名称" prop="userName">
              <el-input v-model="dialogForm.userName" clearable placeholder="请输入账户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="dialogForm.phone" clearable placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="账户密码" prop="password">
              <el-input v-model="dialogForm.password" clearable placeholder="请输入" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="确认密码" prop="password_confirmation">
              <el-input v-model="dialogForm.password_confirmation" clearable placeholder="请输入" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="邮箱">
              <el-input v-model="dialogForm.email" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="用户状态">
              <el-switch v-model="dialogForm.status" :active-value="1" :inactive-value="0" active-text="启" inactive-text="禁" inline-prompt></el-switch>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
            <el-form-item label="用户描述">
              <el-input v-model="dialogForm.description" :maxlength="200" placeholder="请输入用户描述" show-word-limit type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="isShowDialog = false">取 消</el-button>
					<el-button :loading="submitLoading" size="default" type="primary" @click="onSubmit">提 交</el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" name="systemUserDialog" setup>
import {reactive, ref} from 'vue'
import {ElMessage, FormRules} from "element-plus"
import {useBaseApi} from "/@/api/base"

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])

// 定义变量内容
const userDialogFormRef = ref()
const dialogTitle = ref('')
const dialogSubmitTitle = ref('')
const dialogForm = reactive({
  id: 0,
  userName: '',
  password: '',
  password_confirmation: '',
  phone: '',
  email: '',
  status: 1,
  description: ''
})
const isShowDialog = ref(false)
const submitLoading = ref(false)
const dialogRules = reactive<FormRules>({
  userName: [
    {required: true, message: '请输入用户名', trigger: ['blur', 'change']},
    {min: 5, max: 25, message: '用户名的长度在5-25位', trigger: ['blur', 'change']},
  ],
  password: [
    {min: 6, max: 55, message: '用户名的长度在6-55位', trigger: ['blur', 'change']},
    {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入6-20位由字母和数字组成', trigger: ['blur', 'change']}
  ],
  password_confirmation: {
    validator(rule, value) {
      return dialogForm.password === value
    },
    message: '两次密码输入不一致',
  },
  phone: [
    {pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/, message: '请输入正确的手机号', trigger: ['blur', 'change']}
  ],
  email: [
    {pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/, message: '请输入正确的手机号', trigger: ['blur', 'change']}
  ],
})

// 打开弹窗
const openDialog = (type: string, row: any) => {
  dialogForm.password = ''
  dialogForm.password_confirmation = ''
  if (type == 'edit') {
    dialogForm.id = row.id
    dialogForm.userName = row.userName
    dialogForm.phone = row.phone
    dialogForm.email = row.email
    dialogForm.status = row.status
    dialogForm.description = row.description
    dialogTitle.value = "编 辑"
    dialogSubmitTitle.value = "修 改"
  } else {
    dialogForm.id = 0
    dialogForm.userName = ''
    dialogForm.phone = ''
    dialogForm.email = ''
    dialogForm.status = 1
    dialogForm.description = ''
    dialogTitle.value = "新 增"
    dialogSubmitTitle.value = "添 加"
  }

  isShowDialog.value = true
}
// 提交
const onSubmit = () => {
  submitLoading.value = true
  useBaseApi().add('user', {
    ...dialogForm
  }).then(res => {
    if (res.code == 1) {
      ElMessage.success(res.msg)
      isShowDialog.value = false
      submitLoading.value = false
      emit('refresh')
    }
  }).catch(() => {
    submitLoading.value = false
  })

  // if (state.dialog.type === 'add') { }
}

// 暴露变量
defineExpose({
  openDialog,
})
</script>
