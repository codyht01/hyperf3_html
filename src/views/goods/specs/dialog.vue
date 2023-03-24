<template>
  <div class="system-user-dialog-container">
    <el-dialog v-model="isShowDialog" :close-on-click-modal="false" :title="dialogTitle" width="769px">
      <el-form ref="userDialogFormRef" :model="dialogForm" :rules="dialogRules" autocapitalize="off" label-width="90px" size="default">
        <el-row :gutter="35">
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
            <el-form-item label="分类名称" prop="title">
              <el-input v-model="dialogForm.title" clearable placeholder="请输入账户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
            <el-form-item label="排序">
              <el-input-number v-model="dialogForm.sort" class="w100" controls-position="right" placeholder="请输入排序"/>
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
  logo: '',
  title: '',
  sort: 0
})
const isShowDialog = ref(false)
const submitLoading = ref(false)
const dialogRules = reactive<FormRules>({
  title: [
    {required: true, message: '请输入标题', trigger: ['blur', 'change']}
  ],
})

// 打开弹窗
const openDialog = (type: string, row: any) => {
  if (type == 'edit') {
    dialogForm.id = row.id
    dialogForm.title = row.title
    dialogForm.sort = row.sort
    dialogTitle.value = "编 辑"
    dialogSubmitTitle.value = "修 改"
  } else {
    dialogForm.id = 0
    dialogForm.title = ''
    dialogForm.sort = 0
    dialogTitle.value = "新 增"
    dialogSubmitTitle.value = "添 加"
  }
  isShowDialog.value = true
}
// 提交
const onSubmit = () => {
  submitLoading.value = true
  useBaseApi().add('specs', {
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
<style lang="scss">
.picture_img {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.picture_icon {
  .icon_img {
    width: 80px;
    height: 80px;
  }
}
</style>
