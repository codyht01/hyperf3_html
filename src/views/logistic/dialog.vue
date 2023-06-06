<template>
  <div class="system-user-dialog-container">
    <el-dialog v-model="isShowDialog" :close-on-click-modal="false" :title="dialogTitle" width="769px">
      <el-form ref="userDialogFormRef" :model="dialogForm" :rules="dialogRules" autocapitalize="off" label-width="90px" size="default">
        <el-row :gutter="35">
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb24">
            <el-form-item label="名称" prop="title">
              <el-input v-model="dialogForm.title" clearable placeholder="请输入模板名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb24">
            <el-form-item label="计费方式" prop="userName">
              <el-radio-group v-model="dialogForm.type">
                <el-radio :label="1">按件数</el-radio>
                <el-radio :label="2">按重量</el-radio>
                <el-radio :label="3">按体积 C</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb24">
            <el-form-item label="配送区域及运费" prop="userName">
              <el-table :data="areaAndFreight" style="width: 100%">
                <el-table-column label="区域" prop="address" width="180">
                  <template #header>
                    <el-text>区域</el-text>
                  </template>
                  <template #default="scope">
                    <el-input v-model="scope.row.address"/>
                  </template>
                </el-table-column>
                <el-table-column label="首件" prop="first" width="180">
                  <template #header>
                    <el-text v-if="dialogForm.type === 1">首件</el-text>
                    <el-text v-if="dialogForm.type === 2">首件重量（KG）</el-text>
                    <el-text v-if="dialogForm.type === 3">首件体积（m³）</el-text>
                  </template>
                  <template #default="scope">
                    <el-input-number v-model="scope.row.first" :min="1"/>
                  </template>
                </el-table-column>
                <el-table-column label="运费（元）" prop="price" width="180">
                  <template #default="scope">
                    <el-input-number v-model="scope.row.price" :min="0" :precision="2"/>
                  </template>
                </el-table-column>
                <el-table-column label="续件" prop="second" width="180">
                  <template #header>
                    <el-text v-if="dialogForm.type === 1">续件</el-text>
                    <el-text v-if="dialogForm.type === 2">续件重量（KG）</el-text>
                    <el-text v-if="dialogForm.type === 3">续件体积（m³）</el-text>
                  </template>
                  <template #default="scope">
                    <el-input v-model="scope.row.second"/>
                  </template>
                </el-table-column>
                <el-table-column label="续费" prop="second_price" width="180">
                  <template #default="scope">
                    <el-input-number v-model="scope.row.second_price" :min="0" :precision="2"/>
                  </template>
                </el-table-column>
                <el-table-column label="操作" prop="date" width="180">
                  <template #default>
                    <el-button link size="small" type="primary">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary">添加区域</el-button>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb24">
            <el-form-item label="指定包邮" prop="userName">
              <el-table :data="specifyPackageShipping">

              </el-table>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb24">
            <el-form-item label="指定不送达" prop="userName">
              <el-table :data="designatedNonDelivery"></el-table>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb24">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="dialogForm.sort" :min="0" :precision="0"></el-input-number>
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
  title: '',
  type: 1,
  second: 0,
  second_price: 0,
  sort: 0
})
const areaAndFreight = ref([])  //区域及配送费
const specifyPackageShipping = ref([]) //指定包邮
const designatedNonDelivery = ref([]) //指定不送达
const isShowDialog = ref(false)
const submitLoading = ref(false)
const dialogRules = reactive<FormRules>({})

// 打开弹窗
const openDialog = (type: string, row: any) => {
  if (type == 'edit') {
    dialogForm.id = row.id

    dialogTitle.value = "编 辑"
    dialogSubmitTitle.value = "修 改"
  } else {
    dialogForm.id = 0

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
