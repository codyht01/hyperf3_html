<template>
    <div class="sku">
        <el-form :model="formData" label-width="0">
            <el-checkbox-group v-model="formData.checkboxGroup1" class="mb15" size="default">
                <el-form-item v-for="(item,index) in specData" :key="index" :label="item.title" class="mb15">
                    <el-checkbox v-for="(it,idx) in item.child" :key="idx" :checked="it.checked" :label="it.id" border @change="handleChange($event,index,idx)">{{ it.title }}</el-checkbox>
                </el-form-item>
            </el-checkbox-group>
            <el-form-item v-if="tableData">
                <el-button-group v-if="tableData.length > 0">
                    <el-button size="small" type="primary" @click="openDialog('price')">一键设置销售价格</el-button>
                    <el-button size="small" type="primary" @click="openDialog('cost_price')">一键设置市场价格</el-button>
                    <el-button size="small" type="primary" @click="openDialog('market_price')">一键设置成本</el-button>
                    <el-button size="small" type="primary" @click="openDialog('stock')">一键设置库存</el-button>
                    <el-button size="small" type="primary" @click="openPicture('')">一键设置图片</el-button>
                </el-button-group>
            </el-form-item>
            <!-- 动态sku表 -->
            <el-form-item v-if="tableData">
                <el-table v-if="tableData.length > 0" :data="tableData" border style="width:100%">
                    <el-table-column v-for="(item,index) in tableTitle" :key="index" :label="item" align="center" prop="id" width="80">
                        <template #default="scope">
                            {{ scope['row']['data_title'][index]['title'] }}
                        </template>
                    </el-table-column>
                    <el-table-column label="图片" prop="price">
                        <template #default="scope">
                            <el-image :src="scope.row.image" style="width:40px;height: 40px;" @click="openPicture(scope.row.specs_id)">
                                <template #error>
                                    <div class="image-slot">
                                        <SvgIcon :size="30" name="ele-Picture"/>
                                    </div>
                                </template>
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="销售价格" prop="price">
                        <template #default="scope">
                            <el-input-number v-model="scope.row.price" :min="0" :precision="2" placeholder="价格" size="small"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="市场价格">
                        <template #default="scope">
                            <el-input-number v-model="scope.row.cost_price" :min="0" :precision="2" placeholder="市场价" size="small"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="成本价格">
                        <template #default="scope">
                            <el-input-number v-model="scope.row.market_price" :min="0" :precision="2" placeholder="成本价" size="small"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存">
                        <template #default="scope">
                            <el-input-number v-model="scope.row.stock" :min="0" :precision="0" placeholder="库存" size="small"/>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible" :title="visible_title" width="30%">
            <el-input-number v-if="visible_type == 'stock'" v-model="visible_number" :min="0" :precision="0"/>
            <el-input-number v-else v-model="visible_number" :min="0" :precision="2"/>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="btnVisible">确定</el-button>
      </span>
            </template>
        </el-dialog>
        <PictureDialog ref="pictureRef" :maxLength="0" :minType="minType" @refresh="pictureRefresh"/>
    </div>
</template>
<script lang="ts" setup>
import {defineAsyncComponent, nextTick, onMounted, reactive, ref, toRefs} from "vue"

const PictureDialog = defineAsyncComponent(() => import('/@/components/picture/index.vue'))
const dialogVisible = ref(false)
const visible_title = ref('')
const visible_number = ref(1)
const visible_type = ref('')
const props = defineProps({
    specData: {
        type: Array,
        default: () => []
    },
    data: {
        type: Array,
        default: () => []
    }
})

const {specData, data} = toRefs(props)
const minType = ref('image')
const formData = reactive({
    checkboxGroup1: [],
})
const pictureRef = ref()
const tableIndex = ref('')
const openPicture = (specs_id: string) => {
    tableIndex.value = specs_id
    minType.value = 'image'
    nextTick(() => {
        pictureRef.value.openDialog()
    })
}
const pictureRefresh = (row: { url: any; }[]) => {

    if (tableIndex.value == '') {
        tableData.value.forEach((item: { image: any; }) => {
            item.image = row[0].url
        })
    } else {
        tableData.value.forEach((item: {
            specs_id: string; id: number;
        }, index: string | number) => {
            if (item.specs_id == tableIndex.value) {
                tableData.value[index].image = row[0].url
            }
        })
    }
}
//一键设置
const openDialog = (type: any) => {
    if (type == 'price') {
        visible_title.value = "一键设置价格"
    } else if (type == 'cost_price') {
        visible_title.value = "一键设置市场价格"
    } else if (type == 'market_price') {
        visible_title.value = "一键设置成本价格"
    } else if (type == 'stock') {
        visible_title.value = "一键设置库存"
    }
    dialogVisible.value = true
    visible_type.value = type
}
const btnVisible = () => {
    tableData.value.forEach((item?: any) => {
        item[visible_type.value] = visible_number.value
    })
    dialogVisible.value = false
}
const tableTitle = ref([])
const tableData = ref([])
const handleChange = (e: any, index: string | number, idx: string | number) => {
    tableData.value = []
    props.specData[index]["child"][idx]['checked'] = e

    //修改状态
    // let checked = specData?.value[index]["child"][idx]["checked"]
    // console.log(checked)
    //specData?.value[index]["child"][idx]["checked"] = !checked
    //specData?.value[index]["child"][idx]["checked"] = e
    //获取显示表
    asyncCheckbox(true)
}

const asyncCheckbox = (is_click = false) => {

    let list_data: any[] = []
    const data_list_title: never[] = []
    specData?.value.forEach((item) => {
        if (item.child.length !== 0) {
            let it_data: { id: any; title: any; }[] = []
            item.child.forEach((it: { checked: any; id: any; title: any; }) => {
                if (it.checked) {
                    it_data.push({
                        id: it.id,
                        title: it.title
                    })
                }
            })
            if (it_data.length !== 0) {
                list_data.push(it_data)
                data_list_title.push(item.title)
            }
        }
    })

    let data_list: any[] = []
    let res_data: { data_title: any; specs_id: string; price: number; stock: number; cost_price: number; image: string; market_price: number; }[] = []
    list_data.forEach((arrayItem) => {
        if (data_list.length === 0) {
            arrayItem.forEach((item: any) => {
                data_list.push([item])
            })
        } else {
            const emptyArray: any[] = []
            data_list.forEach((item) => {
                arrayItem.forEach((value: any) => {
                    emptyArray.push([...item, value])
                })
            })
            data_list = emptyArray
        }
    })
    tableTitle.value = data_list_title
    if (data?.value?.length == 0 || is_click) {
        data_list.forEach(item => {
            let ids: any[] = []
            item.forEach((value: { id: any; }) => {
                ids.push(value.id)
            })
            res_data.push({
                data_title: {
                    ...item
                },
                specs_id: ids.join(','),
                price: 0,
                stock: 0,
                cost_price: 0,
                image: "",
                market_price: 0,
            })
        })
        tableData.value = res_data
    } else {
        tableData.value = data?.value
    }

}
onMounted(() => {
    asyncCheckbox()
})

defineExpose({
    tableData: tableData
})
</script>

<style lang="scss">
.sku {
  width: 100%;
}
</style>
