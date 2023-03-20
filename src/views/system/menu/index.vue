<template>
  <div class="system-menu-container layout-pd">
    <el-card shadow="hover">
      <div class="system-menu-search mb15">
        <el-button class="ml10" size="default" type="primary">
          <el-icon>
            <ele-Search/>
          </el-icon>
          查询
        </el-button>
        <el-button class="ml10" size="default" type="success" @click="onOpenAddMenu('add',{})">
          <el-icon>
            <ele-FolderAdd/>
          </el-icon>
          新增菜单
        </el-button>
      </div>
      <el-table
          v-loading="state.tableData.loading"
          :data="state.tableData.data"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          row-key="path"
          style="width: 100%"
      >
        <el-table-column label="菜单名称" show-overflow-tooltip>
          <template #default="scope">
            <SvgIcon :name="scope.row.meta.icon"/>
            <span class="ml10">{{ $t(scope.row.meta.title) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="路由路径" prop="path" show-overflow-tooltip></el-table-column>
        <el-table-column label="组件路径" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.component }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" show-overflow-tooltip width="80">
          <template #default="scope">
            {{ scope.row.sort }}
          </template>
        </el-table-column>
        <el-table-column label="类型" show-overflow-tooltip width="80">
          <template #default="scope">
            <el-tag size="small" type="success">{{ scope.row.xx }}菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="140">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onOpenAddMenu('add',scope.row)">新增</el-button>
            <el-button size="small" text type="primary" @click="onOpenEditMenu('edit', scope.row)">修改</el-button>
            <el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <MenuDialog ref="menuDialogRef" @refresh="getTableData()"/>
  </div>
</template>

<script lang="ts" name="systemMenu" setup>
import {defineAsyncComponent, onMounted, reactive, ref} from 'vue'
import {RouteRecordRaw} from 'vue-router'
import {ElMessage, ElMessageBox} from 'element-plus'
import {storeToRefs} from 'pinia'
import {useRoutesList} from '/@/stores/routesList'
import {setBackEndControlRefreshRoutes} from "/@/router/backEnd"
import {useBaseApi} from "/@/api/base"

// 引入组件
const MenuDialog = defineAsyncComponent(() => import('/@/views/system/menu/dialog.vue'))

// 定义变量内容
const stores = useRoutesList()
const {routesList} = storeToRefs(stores)
const menuDialogRef = ref()
const state = reactive({
  tableData: {
    data: [] as RouteRecordRaw[],
    loading: true,
  },
})

// 获取路由数据，真实请从接口获取
const getTableData = async () => {
  await setBackEndControlRefreshRoutes()
  // state.tableData.loading = true
  // useMenuApi().getAdminMenu().then(data => {
  //   state.tableData.loading = false
  //   state.tableData.data = data
  //   state.tableData.loading = false
  // })

  state.tableData.loading = true
  state.tableData.data = routesList.value
  setTimeout(() => {
    state.tableData.loading = false
  }, 500)
}
// 打开新增菜单弹窗
const onOpenAddMenu = (type: string, row: any) => {
  menuDialogRef.value.openDialog(type, row)
}
// 打开编辑菜单弹窗
const onOpenEditMenu = (type: string, row: RouteRecordRaw) => {
  menuDialogRef.value.openDialog(type, row)
}
// 删除当前行
const onTabelRowDel = (row: RouteRecordRaw) => {
  ElMessageBox.confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    useBaseApi().del('menu', row.id).then(async res => {
      if (res.code == 1) {
        ElMessage.success('删除成功')
        await getTableData()
        window.location.reload()
        await setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
      } else {
        ElMessage.error(res.msg)
      }
    })

  }).catch(() => {
  })
}
// 页面加载时
onMounted(() => {
  getTableData()
})
</script>
