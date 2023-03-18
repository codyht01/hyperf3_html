<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <div class="system-user-search mb15">
        <el-input v-model="whereData.name" placeholder="请输入角色名称" size="default" style="max-width: 180px"></el-input>
        <el-button v-loading="tableData.loading" class="ml10" size="default" type="primary" @click="tableData.fetchData()">
          <el-icon>
            <ele-Search/>
          </el-icon>
          查询
        </el-button>
        <el-button class="ml10" size="default" type="success" @click="onOpenAddRole('add')">
          <el-icon>
            <ele-FolderAdd/>
          </el-icon>
          新增角色
        </el-button>
      </div>
      <el-table v-loading="tableData.loading" :data="tableData.data" style="width: 100%">
        <el-table-column label="ID" prop="id" width="60"/>
        <el-table-column label="角色名" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="标识" prop="roleSign" show-overflow-tooltip></el-table-column>
        <el-table-column label="排序" prop="sort" show-overflow-tooltip></el-table-column>
        <el-table-column label="角色状态" prop="status" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-if="scope.row.status" type="success">启用</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatTime" label="创建时间" prop="create_time" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onOpenEditUser('edit', scope.row)">修改</el-button>
            <el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:current-page="tableData.pagination.current"
          v-model:page-size="tableData.pagination.pageSize"
          :page-sizes="tableData.pagination.pageList"
          :pager-count="5"
          :total="tableData.pagination.total"
          background
          class="mt15"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="tableData.handleSizeChange"
          @current-change="tableData.handleCurrentChange"
      >
      </el-pagination>
    </div>
    <RoleDialog ref="roleDialogRef" @refresh="getTableData()"/>
  </div>
</template>

<script lang="ts" name="systemRole" setup>
import {defineAsyncComponent, onMounted, reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import usePagination from "/@/utils/usePagination"
import {formatTime} from "/@/utils/formatTime"

// 引入组件
const RoleDialog = defineAsyncComponent(() => import('/@/views/system/role/dialog.vue'))

// 定义变量内容
const roleDialogRef = ref()
const whereData = reactive({
  name: ''
})
const tableData = usePagination({
  path: 'role',
  page: undefined,
  size: undefined
}, whereData)
// 初始化表格数据
// 打开新增角色弹窗
const onOpenAddRole = (type: string) => {
  roleDialogRef.value.openDialog(type)
}
// 打开修改角色弹窗
const onOpenEditUser = (type: string, row: Object) => {
  roleDialogRef.value.openDialog(type, row)
}
// 删除角色
const onRowDel = (row: RowRoleType) => {
  ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.roleName}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {

        ElMessage.success('删除成功')
      })
      .catch(() => {
      })
}
// 分页改变

// 页面加载时
onMounted(() => {
  tableData.fetchData()
})
</script>

<style lang="scss" scoped>
.system-role-container {
  .system-role-padding {
    padding: 15px;

    .el-table {
      flex: 1;
    }
  }
}
</style>
