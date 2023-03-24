<template>
  <div class="wrapper">
    <el-dialog v-model="showSpecs" :close-on-click-modal="false" style="width:70%">
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSpecs = false">关闭</el-button>
        <el-button type="primary" @click="showSpecs = false">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"

const showSpecs = ref(false)

const openDialog = () => {
  //获取所有规格
  // useSpecsApi().getSpecsByListInfo().then(res => {
  //   if (res.code == 101) {
  //     //获取分类
  //     leftList.value = res.data
  //     getSpecsValue()
  //   }
  // })
  showSpecs.value = true
}


defineExpose({openDialog})
</script>

<style lang="scss" scoped>
.con_left {
  width: 200px;
}

.aside_con {
  max-height: 500px;
  overflow-y: auto;
  width: 200px;

  .aside_title {
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .active {
    background-color: #4eb8ff;
    color: #fff;
  }
}

.main_con {
  margin-top: 10px;
  width: 100%;
}
</style>
