<template>
  <el-dialog v-model="dialogVisible" :close-on-click-modal="false" :modal="false" title="Tips" width="900px">
    <el-container class="dialog">
      <el-aside width="250px">
        <div class="aside">
          <el-card class="aside_card">
            <div class="top">
              <el-input class="input-with-select" placeholder="请输入关键字" size="small">
                <template #prepend>
                  <el-button size="small" type="primary">添加</el-button>
                </template>
                <template #append>
                  <el-button size="small" type="primary">搜索</el-button>
                </template>
              </el-input>

            </div>
            <div class="bottom">
              <div class="bottom_li">
                全部
              </div>
              <div class="bottom_li">
                这是分类这是分类这是分类这是分类这是分类111
              </div>
              <div class="bottom_li">
                这是分类
              </div>
              <div class="bottom_li">
                这是分类
              </div>

            </div>
          </el-card>
        </div>
      </el-aside>
      <el-container>
        <el-card class="dialog_con">
          <el-button-group>
            <el-button size="small">使用选中的图片</el-button>
            <el-button size="small">上传图片</el-button>
            <el-button size="small">删除图片</el-button>
          </el-button-group>
          <div class="content">
            <div v-for="(item,index) in 50" :key="index" class="content_li">
              <el-image class="li_img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
              <div class="li_title">啊手动阀</div>
            </div>
          </div>
          <el-pagination
              v-model:current-page="tableData.pagination.current"
              v-model:page-size="tableData.pagination.pageSize"
              :page-sizes="tableData.pagination.pageList"
              :pager-count="5"
              :total="tableData.pagination.total"
              background
              class="mt15"
              layout="total, sizes, prev, pager, next, jumper"
              small
              @size-change="tableData.handleSizeChange"
              @current-change="tableData.handleCurrentChange"
          >
          </el-pagination>
        </el-card>
      </el-container>
    </el-container>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue"
import usePagination from "/@/utils/usePagination"

const dialogVisible = ref(false)

const whereData = reactive({})
const tableData = usePagination({
  path: 'goods_category',
  page: undefined,
  size: undefined
}, whereData)
const openDialog = () => {
  dialogVisible.value = true
}
defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.dialog {
  height: 400px;
}

.aside {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  .aside_card {
    height: 400px;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    width: 100%;
    padding-bottom: 5px;
    background: #fff;
  }

  .top_input {
    //width: 110px;
  }

  .bottom {
    margin-top: 5px;

    .bottom_li {
      cursor: pointer;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 10px;
    }

    .active {
      color: #4eb8ff;
    }
  }
}

.dialog_con {
  margin-left: 10px;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    overflow: auto;
    margin-top: 10px;

    .content_li {
      margin-top: 10px;
      margin-right: 10px;
      text-align: center;

      .li_img {
        width: 100px;
        height: 100px;
      }

      .li_title {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
