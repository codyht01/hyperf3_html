<template>
    <div class="system-user-container layout-padding">
        <el-card :body-style="{'display':'flex'}" class="mb10" shadow="hover">
            <el-button :icon="ArrowLeft" size="small" type="text" @click="onClickBack">返回</el-button>
            <div class="title">添加商品</div>
        </el-card>
        <el-card :body-style="{'overflow':'auto'}" class="layout-padding-auto mb15" shadow="hover">
            <el-steps :active="indexActive" align-center class="mb15">
                <el-step title="商品信息"/>
                <el-step title="规格库存"/>
                <el-step title="商品详情"/>
                <el-step title="物流设置"/>
                <el-step title="营销设置"/>
                <el-step title="其他设置"/>
            </el-steps>
            <el-form ref="userDialogFormRef" :model="dialogForm" :rules="dialogRules" autocomplete="off" label-width="90px" size="default">
                <el-row :gutter="35">
                    <div v-if="indexActive === 0" class="row_con">
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="商品类型" prop="title">
                                <el-radio-group v-model="dialogForm.type">
                                    <el-radio :label="1" border size="large">普通商品</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item :rules="[
                                { required: true, message: '请选择商品分类' },
                                { type: 'number', message: 'age must be a number' },
                              ]" label="商品分类" prop="category_id">
                                <el-select v-model="dialogForm.category_id" filterable placeholder="选择商品分类">
                                    <el-option v-for="item in seleCategory" :key="item.id" :label="item.title" :value="item.id"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item :rules="[
                                { required: true, message: '请输入商品名称' },
                              ]" label="商品名称" prop="title">
                                <el-input v-model="dialogForm.title" clearable placeholder="请输入商品名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item :rules="[
                                { required: true, message: '请输入单位' },
                              ]" label="单位" prop="title">
                                <el-input v-model="dialogForm.unit" clearable placeholder="请输入单位"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="商品轮播图" prop="title">
                                <div v-if="pictureList.length > 0" class="banner_list">
                                    <div v-for="(item,index) in pictureList" :key="index" class="li">
                                        <el-image :src="item.url" class="pic_li_img"/>
                                    </div>
                                </div>
                                <div v-if="pictureList.length < 10" class="banner_icon">
                                    <div class="picture_img" @click="btnClickPicture">
                                        <SvgIcon :size="30" name="ele-Plus"/>
                                    </div>
                                    <span class="banner_span">建议9：16比例图片 ,最多选择10张图片</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="添加视频" prop="title">
                                <el-switch v-model="dialogForm.is_video" :active-value="1" :inactive-value="0" active-text="开启" class="ml-2" inactive-text="关闭" inline-prompt style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/>
                            </el-form-item>
                        </el-col>
                        <div v-if="dialogForm.is_video === 1" class="row_con">
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="添加视频" prop="title">
                                    <el-radio-group v-model="dialogForm.video_type">
                                        <el-radio :label="1">本地视频</el-radio>
                                        <el-radio :label="2">链接视频</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="dialogForm.video_type == 1" :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="选择视频" prop="title">
                                    <div v-if="videoList.url" class="banner_list">
                                        <video :src="videoList.url" controls style="width:300px">
                                            <source :src="videoList.url" type="video/mp4">
                                        </video>
                                        <el-button @click="btnClickVideo">重选</el-button>
                                    </div>
                                    <div v-else class="banner_icon">
                                        <div class="picture_img" @click="btnClickVideo">
                                            <SvgIcon :size="30" name="ele-Plus"/>
                                        </div>
                                        <span class="banner_span">建议9：16比例图片 ,最多选择10张图片</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="dialogForm.video_type == 2" :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="视频地址" prop="title">
                                    <el-input v-model="dialogForm.video_url" placeholder="请输入视频地址"/>
                                </el-form-item>
                            </el-col>
                        </div>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="商品状态" prop="status">
                                <el-radio-group v-model="dialogForm.status">
                                    <el-radio :label="1">上架</el-radio>
                                    <el-radio :label="0">下架</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </div>

                    <div v-if="indexActive === 1" class="row_con">
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="规格类型" prop="status">
                                <el-radio-group v-model="dialogForm.specification">
                                    <el-radio :label="1">单规格</el-radio>
                                    <el-radio :label="2">多规格</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <div v-if="dialogForm.specification === 1" class="row_con">
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="商品图片" prop="status">
                                    <div v-if="goodsImgs.url" class="banner_list" @click="btnClickGoodsImg">
                                        <el-image :src="goodsImgs.url" class="pic_li_img"/>
                                    </div>
                                    <div v-else class="banner_icon">
                                        <div class="picture_img" @click="btnClickGoodsImg">
                                            <SvgIcon :size="30" name="ele-Plus"/>
                                        </div>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="售价" prop="status">
                                    <el-input-number v-model="dialogForm.price" :min="0" :precision="2" placeholder="请输入售价"/>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="成本价" prop="status">
                                    <el-input-number v-model="dialogForm.market_price" :min="0" :precision="2" placeholder="请输入成本价"/>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="原价" prop="status">
                                    <el-input-number v-model="dialogForm.cost_price" :min="0" :precision="2" placeholder="请输入原价"/>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="库存" prop="status">
                                    <el-input-number v-model="dialogForm.stock" :min="0" :precision="0" placeholder="请输入库存"/>
                                </el-form-item>
                            </el-col>
                            <!--                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">-->
                            <!--                                <el-form-item label="商品编号" prop="status">-->
                            <!--                                    <el-input  v-model="dialogForm.product_id" placeholder="请输入商品编号"/>-->
                            <!--                                </el-form-item>-->
                            <!--                            </el-col>-->
                            <el-col v-if="false" :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="重量(KG)" prop="status">
                                    <el-input-number v-model="dialogForm.weight" :min="0" :precision="2" placeholder="请输入重量"/>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="false" :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="体积(m³)" prop="status">
                                    <el-input-number v-model="dialogForm.volume" :min="0" :precision="2" placeholder="请输入体积"/>
                                </el-form-item>
                            </el-col>
                        </div>
                        <div v-else class="row_con">
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="" prop="status">
                                    <el-button type="primary" @click="btnDialogSpecs([])">添加规格</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
                                <el-form-item label="" prop="status">
                                    <TableSku ref="getSpecsTableData" :data="dialogForm.sku_data" :specData="specData"></TableSku>
                                </el-form-item>
                            </el-col>
                        </div>
                    </div>
                    <div v-if="indexActive === 2" class="row_con">
                        <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
                            <el-form-item label="商品详情" prop="status">
                                <Editor v-model:get-html="dialogForm.description"/>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div v-if="indexActive === 3" class="row_con">
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="物流方式" prop="logistics_type">
                                <el-checkbox-group v-model="dialogForm.logistics_type">
                                    <el-checkbox label="1">快递发货</el-checkbox>
                                    <el-checkbox :disabled="true" label="2">到店核销</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="运费设置" prop="logistics_cate">
                                <el-radio-group v-model="dialogForm.logistics_cate">
                                    <el-radio :label="1">固定运费</el-radio>
                                    <el-radio :disabled="false" :label="2">运费模板</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <div v-if="dialogForm.logistics_cate === 1" class="row_con">
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="固定金额" prop="logistics_cate">
                                    <el-input v-model="dialogForm.logistics_price" placeholder="请输入固定金额"/>
                                </el-form-item>
                            </el-col>
                        </div>
                        <div v-if="dialogForm.logistics_cate === 2" class="row_con">
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="运费模板" prop="logistics_cate">
                                    <el-select v-model="dialogForm.logistics_formwork" clearable placeholder="Select">
                                        <!--                    <el-option-->
                                        <!--                        v-for="item in options"-->
                                        <!--                        :key="item.value"-->
                                        <!--                        :disabled="item.disabled"-->
                                        <!--                        :label="item.label"-->
                                        <!--                        :value="item.value"-->
                                        <!--                    />-->
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </div>
                    </div>
                    <div v-if="indexActive === 4" class="row_con">
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="已购数量" prop="logistics_cate">
                                <el-input-number v-model="dialogForm.number" :min="0" :precision="0" placeholder="请输入已购数量"/>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="排序" prop="logistics_cate">
                                <el-input-number v-model="dialogForm.sort" :min="0" :precision="0" placeholder="请输入已购数量"/>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="购买送积分" prop="logistics_cate">
                                <el-input-number v-model="dialogForm.integral" :min="0" :precision="0"/>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="是否限购" prop="logistics_cate">
                                <el-switch v-model="dialogForm.is_purchase" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" inline-prompt/>
                            </el-form-item>
                        </el-col>
                        <div v-if="dialogForm.is_purchase === 1" class="row_con">
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="限购类型" prop="logistics_cate">
                                    <el-radio-group v-model="dialogForm.purchase_type">
                                        <el-radio :label="1">单次限购</el-radio>
                                        <el-radio :label="2">永久限购</el-radio>
                                    </el-radio-group>
                                    <el-alert :closable="false" type="info">
                                        <p><span v-if="dialogForm.purchase_type === 1">单次限购是限制每次下单最多购买的数量</span><span v-else>永久限购是限制一个用户总共可以购买的数量</span></p>
                                    </el-alert>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="限购数量" prop="logistics_cate">
                                    <el-input-number v-model="dialogForm.purchase_number" :min="0" :precision="0"/>
                                    <span style="margin-left: 10px">件</span>
                                </el-form-item>
                            </el-col>
                        </div>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="预售商品" prop="logistics_cate">
                                <el-switch v-model="dialogForm.is_booking" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" inline-prompt/>
                            </el-form-item>
                        </el-col>
                        <div v-if="dialogForm.is_booking === 1" class="row_con">
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="预售时间" prop="logistics_cate">
                                    <el-date-picker v-model="dialogForm.booking_time" end-placeholder="结束时间" range-separator="到" start-placeholder="开始时间" type="datetimerange"/>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                                <el-form-item label="发货时间" prop="logistics_cate">
                                    <span style="margin-right: 10px">预售活动结束后</span>
                                    <el-input-number v-model="dialogForm.booking_send_time" :min="0" :precision="0"/>
                                    <span style="margin-left: 10px">天之内</span>
                                </el-form-item>
                            </el-col>
                        </div>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="商品推荐" prop="logistics_cate">
                                <el-checkbox-group v-model="dialogForm.recommend">
                                    <el-checkbox :label="1">热卖</el-checkbox>
                                    <el-checkbox :label="2">促销单品</el-checkbox>
                                    <el-checkbox :label="3">精品推荐</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div v-if="indexActive === 5" class="row_con">
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="商品关键词" prop="logistics_cate">
                                <el-input v-model="dialogForm.title_keywords" placeholder="请输入关键词"/>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="16" :md="16" :sm="16" :xl="16" :xs="24" class="mb20">
                            <el-form-item label="商品描述" prop="logistics_cate">
                                <el-input v-model="dialogForm.title_description" :rows="6" maxlength="500" placeholder="请输入描述" show-word-limit type="textarea"/>
                            </el-form-item>
                        </el-col>
                    </div>
                    <el-form-item>
                        <el-button v-if="indexActive > 0" type="primary" @click="onLeft">上一步</el-button>
                        <el-button type="primary" @click="onNext">下一步</el-button>
                        <el-button type="primary" @click="submitData">保 存</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-card>
        <PictureDialog ref="pictureRef" :maxLength="0" :minType="minType" @refresh="pictureRefresh"/>
        <SpecsDialog ref="specsRef" @isSpecsRefresh="specsRefresh"/>
    </div>
</template>

<script lang="ts" setup>
import {ArrowLeft} from "@element-plus/icons-vue"
import {defineAsyncComponent, nextTick, onMounted, reactive, ref} from "vue"
import {FormRules} from "element-plus"
import {useGoodsCategoryApi} from "/@/api/goodsCategory"
import SpecsDialog from '/@/views/goods/list/specs.vue'
import {useBaseApi} from "/@/api/base"
import mittBus from "/@/utils/mitt"
import {useRoute, useRouter} from "vue-router"

const PictureDialog = defineAsyncComponent(() => import('/@/components/picture/index.vue'))
const Editor = defineAsyncComponent(() => import('/@/components/editor/index.vue'))
const TableSku = defineAsyncComponent(() => import("/@/components/tableSku/index.vue"))

const specsRef = ref()

const skuFormData = ref([])
const btnDialogSpecs = (row: any) => {
    specsRef.value.openDialog(row)
}
const specsRefresh = (specs_list: any, index: any) => {
    specData.value.push(specs_list)
}

const specData = ref([])
const indexActive = ref(0)
const dialogForm = reactive({
    id: 0,
    type: 1,
    title: '',
    category_id: '',
    unit: '',
    is_video: 0, //是否上传视频
    video_type: 1, //1本地视频 2网络视频
    video_url: '',//视频地址
    status: 1,
    specification: 1,
    price: 0,//售价
    market_price: 0,//成本
    cost_price: 0, //原价
    stock: 0,//库存
    product_id: 0,//编号
    weight: 0,//重量
    volume: 0,//体积
    description: '',
    logistics_type: [],//物流方式
    logistics_cate: 1,//运费设置
    logistics_price: 0,//运费固定金额
    logistics_formwork: 0,//运费模板
    number: 0,
    sort: 0,
    integral: 0,
    is_purchase: 0,//是否限购 0不限购 1限购
    purchase_type: 1,//1单次限购 2永久限购
    purchase_number: 0, //限购数量
    is_booking: 0, //是否预售 0 1
    booking_time: 0,//预售时间
    booking_send_time: 0,//预售发货时间
    recommend: [],//商品推荐
    title_keywords: '',
    title_description: '',
    sku_data: []
})
const route = useRoute()
const router = useRouter()
const submitData = () => {
    if (indexActive.value == 1) {
        if (dialogForm.specification === 2) {
            dialogForm.sku_data = getSpecsTableData.value.tableData
        }
    }
    useBaseApi().add('goods', {
        ...dialogForm,
        banner: pictureList.value,
        goods_img: goodsImgs.value.url,
        video_url: videoList.value.url
    }).then(res => {
        if (res.code) {
            onClickBack()
        }
    }).catch(() => {

    })
}
const onClickBack = () => {
    mittBus.emit('onCurrentContextmenuClick', Object.assign({}, {contextMenuClickId: 1, ...route}))
    router.push({
        name: 'goodsList'
    })
}
const getSpecsTableData = ref()
const minKey = ref(0)
const minType = ref('image')
const lImg = ref(true)
const dialogRules = reactive<FormRules>({})
const seleCategory = ref([])
const onNext = () => {
    if (indexActive.value == 1) {
        if (dialogForm.specification === 2) {
            dialogForm.sku_data = getSpecsTableData.value.tableData
        }
    }
    indexActive.value++
}
const onLeft = () => {
    indexActive.value--
}
const getGoodsCategory = () => {
    useGoodsCategoryApi().getGoodsCategoryByList({}).then(res => {
        if (res.code) {
            seleCategory.value = res.data
        }
    })
}
const btnClickGoodsImg = () => {
    lImg.value = true
    minKey.value = Math.random()
    minType.value = "image"
    nextTick(() => {
        pictureRef.value.openDialog()
    })
}
// 选择图片开始
const pictureList = ref([])
const pictureRef = ref()
const goodsImgs = ref({
    url: ''
})
const btnClickPicture = () => {
    minKey.value = Math.random()
    minType.value = 'image'
    lImg.value = false
    nextTick(() => {
        pictureRef.value.openDialog()
    })
}
const btnClickVideo = () => {
    minKey.value = Math.random()
    minType.value = 'video'
    lImg.value = false
    nextTick(() => {
        pictureRef.value.openDialog()
    })
}
const pictureRefresh = (pic_list: any[]) => {
    if (!lImg.value) {
        if (minType.value == 'image') {
            pic_list.forEach(item => {
                if (pictureList.value.length <= 10) {
                    pictureList.value.push(item)
                }
            })
        } else if (minType.value == 'video') {
            videoList.value = pic_list[0]
        }
    } else {
        goodsImgs.value = pic_list[0]
    }
}
const videoList = ref({
    url: ''
})
const getInfo = () => {
    
}
onMounted(() => {
    let id = route.query.id
    if (id) {
        dialogForm.id = id
        getInfo()
    }
    getGoodsCategory()
})
</script>

<style lang="scss" scoped>
.row_con {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.picture_img {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.picture_icon {
  .icon_img {
    width: 80px;
    height: 80px;
  }
}

.pic_li_img {
  width: 80px;
  height: 80px;
}

.banner_icon {
  margin-left: 10px;
}

.banner_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .li {
    margin-right: 5px;
  }
}

.banner_span {
  color: var(--el-text-color-regular);
  font-size: 12px;
}
</style>
