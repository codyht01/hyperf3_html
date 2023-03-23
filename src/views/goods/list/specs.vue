<template>
  <div class="wrapper">
    <el-dialog v-model="showSpecs" :close-on-click-modal="false" style="width:70%">
      <el-container>
        <el-aside class="con_left">
          <div class="aside_con">
            <el-input v-model="dialogForm.keywords" class="input-with-select" placeholder="Please input" size="small">
              <template #append>
                <el-button size="small">添加</el-button>
              </template>
            </el-input>
            <div v-for="(item,index) in leftList" :key="index" :class="leftIndex === index ? 'active' : ''" class="aside_title" @click="clickAside(index)">
              <div class="left">{{ item.title }}</div>
              <div v-if="index === leftIndex" class="right">
                <el-icon>
                  <Check/>
                </el-icon>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main class="con_right">
          <div class="main_input">
            <el-input v-model="title" clearable placeholder="请输入规格值 回车后添加" size="small" @keyup.enter.native="handleTitle">
              <template #append>
                <el-button size="small">添加</el-button>
              </template>
            </el-input>
          </div>
          <div class="main_con mt-4">
            <el-checkbox-group v-if="rightList.length > 0" v-model="checkValue">
              <el-checkbox v-for="(item,index) in rightList" :key="index" :label="item.id" border>{{ item.title }}</el-checkbox>
            </el-checkbox-group>
            <div v-else>
              请添加规格值吧
            </div>
          </div>
        </el-main>
      </el-container>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSpecs = false">关闭</el-button>
        <el-button type="primary" @click="okDialog">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus"

const showSpecs = ref(false)
const leftList = ref([])
const leftIndex = ref(0)
const rightList = ref([])
const dialogForm = reactive({
  keywords: ''
})
//需要添加的值
const title = ref('')
//选择的值
const checkValue = ref([])

//修改父类的值
const emit = defineEmits(['isSpecsRefresh'])
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
const getSpecsValue = () => {
  //获取规格值
  // useSpecsValueApi().getSpecsValueByListInfo({
  //   specs_id: leftList.value[leftIndex.value]['id']
  // }).then(res => {
  //   if (res.code == 101) {
  //     rightList.value = res.data
  //   }
  // })
}
const clickAside = (index: any) => {
  leftIndex.value = index
  rightList.value = []
  checkValue.value = []
  getSpecsValue()
}
const handleTitle = () => {
  let specs_id = leftList.value[leftIndex.value]['id']
  // useSpecsValueApi().addSpecsValue({
  //   specs_id,
  //   title: title.value
  // }).then(res => {
  //   if (res.code == 101) {
  //     rightList.value = []
  //     getSpecsValue()
  //   }
  // })
}
const okDialog = () => {
  if (checkValue.value.length == 0) {
    ElMessage.error("请选择规格值")
    return
  }
  //选择的值
  let value = checkValue.value.join(',')
  emit('isSpecsRefresh', value)
  showSpecs.value = false
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
