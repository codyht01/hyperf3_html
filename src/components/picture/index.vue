<template>
  <el-dialog v-model="dialogVisible" :close-on-click-modal="false" :modal="false" title="Tips" width="900px">
    <el-container class="dialog">
      <el-aside width="250px">
        <div class="aside">
          <el-card class="aside_card">
            <div class="top">
              <el-input v-model="cate_data.keywords" class="input-with-select" placeholder="请输入关键字" size="small">
                <template #prepend>
                  <el-button size="small" type="primary" @click="submitKeywords">添加</el-button>
                </template>
                <template #append>
                  <el-button :loading="tableCate.isLoading" size="small" type="primary" @click="tableCate.fetchData()">搜索</el-button>
                </template>
              </el-input>
            </div>
            <div class="bottom">
              <div v-loading="tableCate.isLoading" class="bottom_con">
                <div :class="cate_index == 0 ? 'active' : ''" class="bottom_li" @click="SelectCate(0)">
                  全部
                </div>
                <div v-for="(item,index) in tableCate.data" :key="index" :class="cate_index == item.id ? 'active' : ''" class="bottom_li" @click="SelectCate(item.id)">
                  {{ item.title }}
                </div>
              </div>
              <el-pagination
                  v-model:current-page="tableCate.pagination.current"
                  v-model:page-size="tableCate.pagination.pageSize"
                  :page-sizes="tableCate.pagination.pageList"
                  :pager-count="5"
                  :total="tableCate.pagination.total"
                  background
                  class="mt15"
                  layout=" prev,pager,next"
                  small
                  @size-change="tableCate.handleSizeChange"
                  @current-change="tableCate.handleCurrentChange"
              >
              </el-pagination>
            </div>
          </el-card>
        </div>
      </el-aside>
      <el-container>
        <el-card class="dialog_con">
          <el-button-group>
            <el-button :disabled="selectIndex.checked.length <= 0" size="small" @click="handleSubmit">使用选中的图片</el-button>
            <el-upload
                ref="uploadFile"
                :accept="fileType.accept"
                :auto-upload="false"
                :headers="uploadHeader"
                :on-change="onUpload"
                :on-success="tableData.fetchData"
                :show-file-list="false"
                action="/api/upload/file"
                class="avatar-uploader"
                multiple
                name="file"
            >
              <el-button size="small">上传图片</el-button>
            </el-upload>
            <el-popconfirm title="您确定删除吗?" @confirm="deletePicture">
              <template #reference>
                <el-button :disabled="selectIndex.checked.length <= 0" size="small">删除图片</el-button>
              </template>
            </el-popconfirm>

          </el-button-group>
          <div v-loading="tableData.isLoading" class="content">
            <div v-if="tableData.data.length > 0" class="content_row">
              <div v-for="(item,index) in tableData.data" :key="index" class="content_li" @click="checkedCon(index,item)">
                <el-image :src="item.url" class="li_img"/>
                <div class="li_title">{{ item.fileName }}</div>
                <div v-if="item.checked" class="checkout">
                  <SvgIcon :size="30" color="#fff" name="ele-Check"/>
                </div>
              </div>
            </div>
            <div v-else class="content_empty">
              暂无数据
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
import {onMounted, reactive, ref, toRefs} from "vue"
import usePagination from "/@/utils/usePagination"
import {ElMessage, UploadFile, UploadInstance} from "element-plus"
import {useBaseApi} from "/@/api/base"
import {Session} from "/@/utils/storage"
import SparkMD5 from 'spark-md5'
import {useUploadApi} from "/@/api/upload"

const props = defineProps({
  maxLength: {
    type: Number,
    default: () => 1,
  },
  minType: {
    type: String,
    default: () => 'image'
  }
})

const {maxLength, minType} = toRefs(props)
const fileType = reactive({
  accept: '',
  type: ''
})
const dialogVisible = ref(false)
const uploadHeader = reactive({
  Authorization: ''
})
const cate_data = reactive({
  keywords: ''
})
const cate_index = ref(0)
const selectIndex = reactive({
  checked: []
})
const whereData = reactive({
  cate_id: 0,
  type: ''
})
const deletePicture = () => {
  let ids: any[] = []
  selectIndex.checked.forEach(item => {
    ids.push(item.id)
  })
  useBaseApi().del('upload', ids.join(',')).then(res => {
    if (res.code) {
      ElMessage.success(res.msg)
      selectIndex.checked = []
      tableData.fetchData()
    }
  })
}
const emit = defineEmits(['refresh'])
const handleSubmit = () => {
  dialogVisible.value = false
  emit('refresh', selectIndex.checked)
}
const tableData = usePagination({
  path: 'upload',
  page: undefined,
  size: undefined
}, whereData)
const openDialog = () => {
  cate_index.value = 0
  whereData.cate_id = 0
  selectIndex.checked = []
  tableCate.fetchData()
  tableData.fetchData()
  dialogVisible.value = true
}
/**
 * 选择
 * @param index
 * @param row
 */
const checkedCon = (index: string | number, row: { id: any; }) => {
  let checked = tableData.data[index].checked
  if (!checked && maxLength?.value != 0) {
    if (selectIndex.checked.length >= maxLength?.value) {
      ElMessage.error("选择不能超过" + maxLength?.value + "个")
      return
    }
  }
  tableData.data[index].checked = !checked
  if (checked) {
    selectIndex.checked.forEach((item, index) => {
      if (item.id == row.id) {
        selectIndex.checked.splice(index, 1)
      }
    })
  } else {
    selectIndex.checked.push(row)
  }
}

const uploadFile = ref<UploadInstance>()
/**
 * 主方法
 * @param File
 */
const onUpload = async (File: UploadFile) => {
  const chunkSize = 2 * 1024 * 1024 // 分片大小
  const file = File.raw // 文件
  const fileSize = File.size || 0 // 文件大小
  let chunkCount = Math.ceil(fileSize / chunkSize) // 分片数量
  if (chunkSize > fileSize) { // 文件过小就一片
    chunkCount = 1
  }
  if (!file) {
    ElMessage.error("文件异常")
    return
  }
  // 文件md5，给文件一个唯一标识
  const fileMd5: any = await getFileMd5(file, chunkCount, chunkSize)
  //查询是否已经上传过
  const getFile: any = await getUploadFile(fileMd5)
  if (getFile.is_true) {
    ElMessage.error("已经上传过该文件")
    uploadFile.value!.clearFiles()
    return
  }
  // 上传分片
  for (let i = 0; i < chunkCount; i++) {
    const start = i * chunkSize //分片开始
    const end = Math.min(fileSize, start + chunkSize) // 分片结束
    const _chunkFile = file.slice(start, end) // 分片文件
    const formdata = new FormData()
    formdata.append('chunkNumber', i.toString())
    formdata.append('chunkSize', _chunkFile.size)
    formdata.append('file', _chunkFile)
    formdata.append('fileName', File.name)
    formdata.append('fileSign', fileMd5)
    formdata.append('totalChunks', chunkCount.toString())
    formdata.append('totalChunkSize', fileSize)
    //上传进度条
    //progress.value = Number(((i / chunkCount) * 100).toFixed(2)) * 1
    // 检查分片文件是否上传-没有上传则上传
    //const params = {chunkNumber: i, fileSign: fileMd5}
    await uploadChunkFile(formdata) // 上传接口-自己定义
  }
  // 合并
  const mergeData = { // 合并参数
    fileName: File.name,
    fileSign: fileMd5,
    chunkCount: chunkCount,
    type: file.type,
    cate_id: whereData.cate_id
  }
  mergeFile(mergeData)// 合并接口-自己定义
}
/**
 * 检测是否上传
 * @param fileMd5
 */
const getUploadFile = async (fileMd5: string) => {
  return new Promise((resolve, reject) => {
    useUploadApi().getUploadFile({
      fileMd5
    }).then(res => {
      if (res.code == 1) {
        resolve(res.data)
      }
    }).catch(() => {
      uploadFile.value!.clearFiles()
    })
  })
}
/**
 * 合并
 * @param mergeData
 */
const mergeFile = (mergeData: object | undefined) => {
  useUploadApi().mergeData(mergeData).then(res => {
    if (res.code == 1) {
      uploadFile.value!.clearFiles()
    }
  }).catch(() => {
    uploadFile.value!.clearFiles()
  })
}
/**
 * 上传
 * @param formdata
 */
const uploadChunkFile = (formdata: FormData) => {
  return new Promise((resolve, reject) => {
    useUploadApi().uploadFile(formdata).then(res => {
      if (res.code == 1) {
        resolve(res)
      }
    }).catch(() => {
      uploadFile.value!.clearFiles()
    })
  })
}

const getFileMd5 = (file: File, chunkCount: number, chunkSize: number) => {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice
    const chunks = chunkCount
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()

    const fileReader = new FileReader()
    fileReader.onload = e => {
      spark.append(e.target?.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        const md5 = spark.end()
        resolve(md5)
      }
    }
    fileReader.onerror = e => {
      reject(e)
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      let end = start + chunkSize
      if (end > file.size) {
        end = file.size
      }
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()
  })
}

const tableCate = usePagination({
  path: 'uploadCate',
  page: undefined,
  size: undefined
}, cate_data)
/**
 * 添加分类
 */
const submitKeywords = () => {
  if (!cate_data.keywords) {
    ElMessage.error("请输入后提交")
    return
  }
  useBaseApi().add('uploadCate', {
    title: cate_data.keywords
  }).then(res => {
    ElMessage.success(res.msg)
    tableCate.fetchData()
  })
}

const SelectCate = (id: any) => {
  cate_index.value = id
  whereData.cate_id = id
  tableData.fetchData()
}

onMounted(() => {
  //getUploadCateList()
  if (Session.get('token')) {
    uploadHeader.Authorization = `Bearer ${Session.get('token')}`
  }
  if (minType?.value == 'image') {
    fileType.type = "image"
    fileType.accept = "image/jpg,image/jpeg,image/png,image/gif"
    whereData.type = "image"
  } else {
    ElMessage.error("暂时不支持其他类型")
  }
})

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
    display: flex;
    flex-direction: column;
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
    display: flex;
    flex-direction: column;
    flex: 1;

    .bottom_con {
      height: 290px;
      overflow-y: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .bottom_con::-webkit-scrollbar {
      display: none;
    }

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
    overflow-y: scroll;
    margin-top: 10px;

    .content::-webkit-scrollbar {
      display: none;
    }

    .content_li {
      margin-top: 10px;
      margin-right: 10px;
      text-align: center;
      position: relative;
      cursor: pointer;

      .li_img {
        width: 100px;
        height: 100px;
      }

      .li_title {
        width: 100px;
        padding: 0 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .checkout {
        cursor: pointer;
        position: absolute;
        width: 100px;
        height: 100px;
        top: 0;
        background: rgba(112, 112, 112, 0.56);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.avatar-uploader {
  display: inline-block;
}

.content_empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
