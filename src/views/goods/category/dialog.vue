<template>
  <div class="system-user-dialog-container">
    <el-dialog v-model="isShowDialog" :close-on-click-modal="false" :title="dialogTitle" width="769px">
      <el-form ref="userDialogFormRef" :model="dialogForm" :rules="dialogRules" autocapitalize="off" label-width="90px" size="default">
        <el-row :gutter="35">
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
            <el-form-item label="选择分类" prop="parent_id">
              <el-cascader v-model="dialogForm.parent_id" :options="categoryList" :props="{value:'id',label:'title',checkStrictly:true,emitPath:true}" :show-all-levels="true" clearable collapse-tags style="width:100%">
                <template #default="{ node, data }">
                  <span>{{ data.title }}</span>
                  <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                </template>
              </el-cascader>
            </el-form-item>
          </el-col>
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
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
            <el-form-item label="分类图标">
              <div v-if="!dialogForm.logo" class="picture_img" @click="btnClickPicture">
                <SvgIcon :size="30" name="ele-Plus"/>
              </div>
              <div v-else class="picture_icon" @click="btnClickPicture">
                <el-image :src="dialogForm.logo" class="icon_img"/>
              </div>
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
    <PictureDialog ref="pictureRef" :maxLength="0" minType="image" @refresh="pictureRefresh"/>
  </div>
</template>

<script lang="ts" name="systemUserDialog" setup>
import {defineAsyncComponent, reactive, ref} from 'vue'
import {ElMessage, FormRules} from "element-plus"
import {useBaseApi} from "/@/api/base"
import {useGoodsCategoryApi} from "/@/api/goodsCategory"

const PictureDialog = defineAsyncComponent(() => import('/@/components/picture/index.vue'))

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])
const pictureRef = ref()
const pictureRefresh = (row: { url: any; }[]) => {
  dialogForm.logo = row[0].url
}
const btnClickPicture = () => {
  pictureRef.value.openDialog()
}
const categoryList = ref([])
// 定义变量内容
const userDialogFormRef = ref()
const dialogTitle = ref('')
const dialogSubmitTitle = ref('')
const dialogForm = reactive({
  id: 0,
  logo: '',
  title: '',
  sort: 0,
  parent_id: []
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
    dialogForm.logo = row.logo
    dialogTitle.value = "编 辑"
    dialogSubmitTitle.value = "修 改"
    if (row.parent_ids.length >= 3) {
      row.parent_ids = [row.parent_ids[0], row.parent_ids[1]]
    } else if (row.parent_ids.length === 2) {
      row.parent_ids = [row.parent_ids[0]]
    }
    if (row.parent_id == 0) {
      dialogForm.parent_id = []
    } else {
      dialogForm.parent_id = row.parent_ids
    }
  } else {
    dialogForm.id = 0
    dialogForm.title = ''
    dialogForm.sort = 0
    dialogForm.logo = ''
    dialogForm.parent_id = []
    dialogTitle.value = "新 增"
    dialogSubmitTitle.value = "添 加"
  }
  getCategoryChild()
  isShowDialog.value = true
}
const getCategoryChild = () => {
  useGoodsCategoryApi().getGoodsCategoryByList().then(res => {
    if (res.code) {
      categoryList.value = res.data
    }
  })
}
// 提交
const onSubmit = () => {
  submitLoading.value = true
  useBaseApi().add('goodsCategory', {
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
