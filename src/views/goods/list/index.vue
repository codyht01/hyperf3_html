<template>
  <div class="system-user-container layout-padding">
    <el-card class="layout-padding-auto" shadow="hover">
      <div class="system-user-search mb15">
        <el-input placeholder="请输入用户名称" size="default" style="max-width: 180px"></el-input>
        <el-button v-loading="tableData.loading" class="ml10" size="default" type="primary" @click="tableData.fetchData()">
          <el-icon>
            <ele-Search/>
          </el-icon>
          查询
        </el-button>
        <el-button class="ml10" size="default" type="success" @click="onOpenAddUser('add')">
          <el-icon>
            <ele-FolderAdd/>
          </el-icon>
          新增用户
        </el-button>
      </div>
      <el-table v-loading="tableData.loading" :data="tableData.data" style="width: 100%">
        <el-table-column label="序号" type="index" width="60"/>
        <el-table-column label="账户名称" prop="userName" show-overflow-tooltip></el-table-column>
        <el-table-column label="最后登录ip" prop="last_login_ip" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="formatTime" label="最后登录时间" prop="last_login_time" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户状态" prop="status" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-if="scope.row.status" type="success">启用</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatTime" label="创建时间" prop="create_time" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onOpenEditUser('edit', scope.row)">修改</el-button>
            <el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
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
    </el-card>
    <UserDialog ref="userDialogRef" @refresh="tableData.fetchData()"/>
  </div>
</template>

<script lang="ts" name="systemUser" setup>
import {defineAsyncComponent, onMounted, reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import usePagination from "/@/utils/usePagination"
import {formatTime} from "/@/utils/formatTime"

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/goods/list/dialog.vue'))

// 定义变量内容
const userDialogRef = ref()

const whereData = reactive({})
const tableData = usePagination({
  path: 'user',
  page: undefined,
  size: undefined
}, whereData)

// 打开新增用户弹窗
const onOpenAddUser = (type: string) => {
  userDialogRef.value.openDialog(type)
}
// 打开修改用户弹窗
const onOpenEditUser = (type: string, row: RowUserType) => {
  userDialogRef.value.openDialog(type, row)
}
// 删除用户
const onRowDel = (row: RowUserType) => {
  ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    tableData.fetchData()
    ElMessage.success('删除成功')
  }).catch(() => {
  })
}
// 页面加载时
onMounted(() => {
  tableData.fetchData()
})
</script>

<style lang="scss" scoped>
.system-user-container {
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    .el-table {
      flex: 1;
    }
  }
}
</style>
