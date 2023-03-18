<template>
  <div class="system-role-dialog-container">
    <el-dialog v-model="isShowDialog" :title="dialogTitle" width="769px">
      <el-form ref="roleDialogFormRef" :model="dialogForm" label-width="90px" size="default">
        <el-row :gutter="35">
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="dialogForm.roleName" clearable placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="角色标识">
              <template #label>
                <el-tooltip content="用于 `router/route.ts` meta.roles" effect="dark" placement="top-start">
                  <span>角色标识</span>
                </el-tooltip>
              </template>
              <el-input v-model="dialogForm.roleSign" clearable placeholder="请输入角色标识"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="排序">
              <el-input-number v-model="dialogForm.sort" :max="999" :min="0" class="w100" controls-position="right" placeholder="请输入排序"/>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
            <el-form-item label="角色状态">
              <el-switch v-model="dialogForm.status" :active-value="1" :inactive-value="0" active-text="启" inactive-text="禁" inline-prompt></el-switch>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
            <el-form-item label="角色描述">
              <el-input v-model="dialogForm.description" maxlength="150" placeholder="请输入角色描述" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
            <el-form-item label="菜单权限">
              <el-tree ref="treeFilter" :data="menuData" :props="menuProps" class="menu-data-tree" node-key="id" show-checkbox/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="isShowDialog = false">取 消</el-button>
					<el-button v-loading="submitLoading" size="default" type="primary" @click="onSubmit">{{ dialogSubmitTxt }}</el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" name="systemRoleDialog" setup>
import {reactive, ref} from 'vue'
import {ElTree} from "element-plus"
import {useBaseApi} from "/@/api/base"

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])

// 定义变量内容
const roleDialogFormRef = ref()
const dialogForm = reactive({
  roleName: '', // 角色名称
  roleSign: '', // 角色标识
  sort: 0, // 排序
  status: 1, // 角色状态
  description: '', // 角色描述
  id: 0
})
const isShowDialog = ref(false)
const dialogTitle = ref('')
const menuData = ref([] as TreeType[])
const menuProps = reactive({
  children: 'children',
  label: 'label',
})
const dialogSubmitTxt = ref('')
const treeFilter = ref<InstanceType<typeof ElTree>>()
const submitLoading = ref(false)
const rules = reactive({})
// 打开弹窗
const openDialog = (type: string, row: { roleName: string; roleSign: string; sort: number; status: number; id: number; menuProps: string }) => {
  if (type === 'edit') {
    dialogForm.roleName = row.roleName
    dialogForm.roleSign = row.roleSign
    dialogForm.sort = row.sort
    dialogForm.status = row.status
    dialogForm.id = row.id
    treeFilter.value?.setCheckedKeys(JSON.parse(row.menuProps))
    dialogTitle.value = '修改角色'
    dialogSubmitTxt.value = '修 改'
  } else {
    dialogForm.roleName = ''
    dialogForm.roleSign = ''
    dialogForm.sort = 0
    dialogForm.status = 0
    dialogForm.id = 0
    dialogTitle.value = '新增角色'
    dialogSubmitTxt.value = '新 增'
    // 清空表单，此项需加表单验证才能使用
    // nextTick(() => {
    // 	roleDialogFormRef.value.resetFields();
    // });
  }
  isShowDialog.value = true
  getMenuData()
}
// 提交
const onSubmit = () => {
  submitLoading.value = true
  const treeKeys = treeFilter.value!.getCheckedKeys(false)
  useBaseApi().add('role', {
    ...dialogForm,
    menuProps: treeKeys
  }).then(res => {

  }).catch(() => {
    submitLoading.value = false
  })
  //emit('refresh')
  // if (state.dialog.type === 'add') { }
}
// 获取菜单结构数据
const getMenuData = () => {
  menuData.value = [
    {
      id: 1,
      label: '系统管理',
      children: [
        {
          id: 11,
          label: '菜单管理',
          children: [
            {
              id: 111,
              label: '菜单新增',
            },
            {
              id: 112,
              label: '菜单修改',
            },
            {
              id: 113,
              label: '菜单删除',
            },
            {
              id: 114,
              label: '菜单查询',
            },
          ],
        },
        {
          id: 12,
          label: '角色管理',
          children: [
            {
              id: 121,
              label: '角色新增',
            },
            {
              id: 122,
              label: '角色修改',
            },
            {
              id: 123,
              label: '角色删除',
            },
            {
              id: 124,
              label: '角色查询',
            },
          ],
        },
        {
          id: 13,
          label: '用户管理',
          children: [
            {
              id: 131,
              label: '用户新增',
            },
            {
              id: 132,
              label: '用户修改',
            },
            {
              id: 133,
              label: '用户删除',
            },
            {
              id: 134,
              label: '用户查询',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: '权限管理',
      children: [
        {
          id: 21,
          label: '前端控制',
          children: [
            {
              id: 211,
              label: '页面权限',
            },
            {
              id: 212,
              label: '页面权限',
            },
          ],
        },
        {
          id: 22,
          label: '后端控制',
          children: [
            {
              id: 221,
              label: '页面权限',
            },
          ],
        },
      ],
    },
  ]
}

// 暴露变量
defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
.system-role-dialog-container {
  .menu-data-tree {
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    padding: 5px;
  }
}
</style>
