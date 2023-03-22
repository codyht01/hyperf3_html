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
          新增分类
        </el-button>
      </div>
      <el-table v-loading="tableData.loading" :data="tableData.data" style="width: 100%">
        <el-table-column label="序号" type="index" width="60"/>
        <el-table-column label="标题" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="图标" prop="status" show-overflow-tooltip>
          <template #default="scope">
            <el-image :src="scope.row.logo" style="width:40px;height: 40px"/>
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
    </el-card>
    <UserDialog ref="userDialogRef" @refresh="tableData.fetchData()"/>
  </div>
</template>

<script lang="ts" name="systemUser" setup>
import {defineAsyncComponent, onMounted, reactive, ref} from 'vue'
import {ElMessageBox} from 'element-plus'
import usePagination from "/@/utils/usePagination"
import {formatTime} from "/@/utils/formatTime"
import {useBaseApi} from "/@/api/base"

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/goods/category/dialog.vue'))

// 定义变量内容
const userDialogRef = ref()

const whereData = reactive({})
const tableData = usePagination({
  path: 'goodsCategory',
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
const onRowDel = (row: { id: string | number; }) => {
  ElMessageBox.confirm(`此操作将永久删除，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    useBaseApi().del('goodsCategory', row.id).then(res => {
      if (res.code == 1) {
        tableData.fetchData()
        ElMessage.success('删除成功')
      }
    })
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
