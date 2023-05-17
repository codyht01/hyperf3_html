<template>
    <div class="system-user-container layout-padding">
        <el-card class="layout-padding-auto" shadow="hover">
            <div class="system-user-search mb15">
                <el-input placeholder="请输入用户名称" size="default" style="max-width: 180px"></el-input>
                <el-button v-loading="tableData.isLoading" class="ml10" size="default" type="primary" @click="tableData.fetchData()">
                    <el-icon>
                        <ele-Search/>
                    </el-icon>
                    查询
                </el-button>
                <el-button class="ml10" size="default" type="success" @click="onOpenAdd('add',{})">
                    <el-icon>
                        <ele-FolderAdd/>
                    </el-icon>
                    新增优惠券
                </el-button>
            </div>
            <el-table v-loading="tableData.isLoading" :data="tableData.data" style="width: 100%">
                <el-table-column label="ID" prop="id" width="60"/>
                <el-table-column label="商品图片" prop="url" show-overflow-tooltip>
                    <template #default="scope">
                        <el-image :src="scope.row.url" style="width: 36px;height: 36px"/>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="title" show-overflow-tooltip></el-table-column>
                <el-table-column label="商品类型" prop="type" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag v-if="scope.row.type === 1" size="small">普通商品</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="商品售价" prop="price" show-overflow-tooltip></el-table-column>
                <el-table-column label="销量" prop="sales" show-overflow-tooltip></el-table-column>
                <el-table-column label="库存" prop="stock" show-overflow-tooltip></el-table-column>
                <el-table-column label="排序" prop="sort" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatTime" label="创建时间" prop="create_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="状态" prop="sort" show-overflow-tooltip>
                    <template #default="scope">
                        <el-switch v-if="scope.row.status == 0 || scope.row.status == 1" v-model="scope.row.status" :active-value="1" :inactive-value="0" active-text="上架" inactive-text="下架" inline-prompt size="small"/>
                        <el-tag v-else-if="scope.row.status == 2" size="small" type="danger">下架</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template #default="scope">
                        <el-button size="small" text type="primary" @click="onOpenAdd('edit', scope.row)">修改</el-button>
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
        <AddDialog ref="dialogRef"/>
    </div>
</template>
<script lang="ts" setup>
import {formatTime} from "/@/utils/formatTime"
import usePagination from "/@/utils/usePagination"
import {reactive, ref} from "vue"
import AddDialog from "./dialog.vue"

const whereData = reactive({})
const tableData = usePagination({
    path: 'goods',
    page: undefined,
    size: undefined
}, whereData)
const dialogRef = ref()
//新增
const onOpenAdd = (type: string, row: any) => {
    if (type == 'add') {

    } else {

    }
    dialogRef.value.openDialog(type, row)
}
</script>
<style lang="scss" scoped>

</style>
