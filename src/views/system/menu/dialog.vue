<template>
    <div class="system-menu-dialog-container">
        <el-dialog v-model="state.dialog.isShowDialog" :title="state.dialog.title" width="769px">
            <el-form ref="menuDialogFormRef" :model="state.ruleForm" label-width="80px" size="default">
                <el-row :gutter="35">
                    <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
                        <el-form-item label="上级菜单">
                            <el-cascader
                                    v-model="state.ruleForm.menuSuperior"
                                    :options="state.menuData"
                                    :props="{ checkStrictly: true, value: 'id', label: 'title' }"
                                    class="w100"
                                    clearable
                                    placeholder="请选择上级菜单"
                            >
                                <template #default="{ node, data }">
                                    <span>{{ data.title }}</span>
                                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                                </template>
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24" class="mb20">
                        <el-form-item label="菜单类型">
                            <el-radio-group v-model="state.ruleForm.menuType">
                                <el-radio label="menu">菜单</el-radio>
                                <el-radio label="btn">按钮</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                        <el-form-item label="菜单名称">
                            <el-input v-model="state.ruleForm.meta.title" clearable placeholder="格式：message.router.xxx"></el-input>
                        </el-form-item>
                    </el-col>
                    <template v-if="state.ruleForm.menuType === 'menu'">
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="路由名称">
                                <el-input v-model="state.ruleForm.name" clearable placeholder="路由中的 name 值"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="路由路径">
                                <el-input v-model="state.ruleForm.path" clearable placeholder="路由中的 path 值"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="重定向">
                                <el-input v-model="state.ruleForm.redirect" clearable placeholder="请输入路由重定向"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="菜单图标">
                                <IconSelector v-model="state.ruleForm.meta.icon" placeholder="请输入菜单图标"/>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="组件路径">
                                <el-input v-model="state.ruleForm.component" clearable placeholder="组件路径"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="链接地址">
                                <el-input
                                        v-model="state.ruleForm.meta.link_url"
                                        :disabled="!state.ruleForm.isLink"
                                        clearable
                                        placeholder="外链/内嵌时链接地址（http:xxx.com）"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </template>
                    <template v-if="state.ruleForm.menuType === 'btn'">
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="权限标识">
                                <el-input v-model="state.ruleForm.btnPower" clearable placeholder="请输入权限标识"></el-input>
                            </el-form-item>
                        </el-col>
                    </template>
                    <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                        <el-form-item label="菜单排序">
                            <el-input-number v-model="state.ruleForm.sort" class="w100" controls-position="right" placeholder="请输入排序"/>
                        </el-form-item>
                    </el-col>
                    <template v-if="state.ruleForm.menuType === 'menu'">
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="是否隐藏">
                                <el-radio-group v-model="state.ruleForm.meta.isHide">
                                    <el-radio :label="true">隐藏</el-radio>
                                    <el-radio :label="false">不隐藏</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="页面缓存">
                                <el-radio-group v-model="state.ruleForm.meta.isKeepAlive">
                                    <el-radio :label="true">缓存</el-radio>
                                    <el-radio :label="false">不缓存</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="是否固定">
                                <el-radio-group v-model="state.ruleForm.meta.isAffix">
                                    <el-radio :label="true">固定</el-radio>
                                    <el-radio :label="false">不固定</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="是否外链">
                                <el-radio-group v-model="state.ruleForm.isLink" :disabled="state.ruleForm.meta.isIframe">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24" class="mb20">
                            <el-form-item label="是否内嵌">
                                <el-radio-group v-model="state.ruleForm.meta.isIframe" @change="onSelectIframeChange">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>
            </el-form>
            <template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="onCancel">取 消</el-button>
					<el-button :loading="saveLoading" size="default" type="primary" @click="onSubmit">{{ state.dialog.submitTxt }}</el-button>
				</span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" name="systemMenuDialog" setup>
import {defineAsyncComponent, onMounted, reactive, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useRoutesList} from '/@/stores/routesList'
import {i18n} from '/@/i18n/index'
import {useMenuApi} from "/@/api/menu"
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])

// 引入组件
const IconSelector = defineAsyncComponent(() => import('/@/components/iconSelector/index.vue'))

// 定义变量内容
const menuDialogFormRef = ref()
const stores = useRoutesList()
const {routesList} = storeToRefs(stores)
const saveLoading = ref(false)
const state = reactive({
    // 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
    ruleForm: {
        id: 0,
        menuSuperior: [], // 上级菜单
        menuType: 'menu', // 菜单类型
        name: '', // 路由名称
        component: '', // 组件路径
        isLink: false, // 是否外链
        sort: 0, // 菜单排序
        path: '', // 路由路径
        redirect: '', // 路由重定向，有子集 children 时
        meta: {
            title: '', // 菜单名称
            icon: '', // 菜单图标
            isHide: false, // 是否隐藏
            isKeepAlive: true, // 是否缓存
            isAffix: false, // 是否固定
            link_url: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink: 链接地址不为空`
            isIframe: false, // 是否内嵌，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
            roles: '', // 权限标识，取角色管理
        },
        btnPower: '', // 菜单类型为按钮时，权限标识
    },
    menuData: [] as RouteItems, // 上级菜单数据
    dialog: {
        isShowDialog: false,
        type: '',
        title: '',
        submitTxt: '',
    },
})

// 获取 pinia 中的路由
const getMenuData = (routes: RouteItems) => {
    const arr: RouteItems = []
    routes.map((val: RouteItem) => {
        val['title'] = i18n.global.t(val.meta?.title as string)
        arr.push({...val})
        if (val.children) getMenuData(val.children)
    })
    return arr
}
// 打开弹窗
const openDialog = (type: string, row?: any) => {
    if (type === 'edit') {
        let menuSuperior: any = []
        if (row.pid == 0) {
            menuSuperior = []
        } else {
            menuSuperior = [row.pid]
        }
        // 模拟数据，实际请走接口
        // row.menuType = 'menu';
        // row.menuSort = Math.random();
        // row.component = `${row.component} `
        // 	.match(/\'(.+)\'/g)
        // 	?.join('')
        // 	.replace(/\'/g, '');
        state.ruleForm.menuSuperior = menuSuperior // 上级菜单
        state.ruleForm.menuType = row.menuType // 菜单类型
        state.ruleForm.name = row.name // 路由名称
        state.ruleForm.component = row.component_url // 组件路径
        state.ruleForm.isLink = row.isLink // 是否外链
        state.ruleForm.sort = row.sort // 菜单排序
        state.ruleForm.path = row.path // 路由路径
        state.ruleForm.redirect = row.redirect // 路由重定向，有子集 children 时
        state.ruleForm.meta.title = row.meta.title // 菜单名称
        state.ruleForm.meta.icon = row.meta.icon // 菜单图标
        state.ruleForm.meta.isHide = row.meta.isHide // 是否隐藏
        state.ruleForm.meta.isKeepAlive = row.meta.isKeepAlive // 是否缓存
        state.ruleForm.meta.isAffix = row.meta.isAffix // 是否固定
        state.ruleForm.meta.link_url = row.meta.link_url // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink: 链接地址不为空`
        state.ruleForm.meta.isIframe = row.meta.isIframe // 是否内嵌，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
        state.ruleForm.meta.roles = row.meta.roles // 权限标识，取角色管理
        state.ruleForm.id = row.id
        // 菜单类型为按钮时，权限标识
        state.dialog.title = '修改菜单'
        state.dialog.submitTxt = '修 改'
    } else {
        let menuSuperior: any = []
        if (row.pid == 0) {
            menuSuperior = [row.id]
        } else {
            menuSuperior = [row.pid, row.id]
        }
        state.ruleForm.menuSuperior = menuSuperior // 上级菜单
        state.ruleForm.menuType = 'menu' // 菜单类型
        state.ruleForm.name = '' // 路由名称
        state.ruleForm.component = '' // 组件路径
        state.ruleForm.isLink = false // 是否外链
        state.ruleForm.sort = 0 // 菜单排序
        state.ruleForm.path = '' // 路由路径
        state.ruleForm.redirect = '' // 路由重定向，有子集 children 时
        state.ruleForm.meta.title = '' // 菜单名称
        state.ruleForm.meta.icon = '' // 菜单图标
        state.ruleForm.meta.isHide = false // 是否隐藏
        state.ruleForm.meta.isKeepAlive = false // 是否缓存
        state.ruleForm.meta.isAffix = false // 是否固定
        state.ruleForm.meta.link_url = '' // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink: 链接地址不为空`
        state.ruleForm.meta.isIframe = false // 是否内嵌，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
        state.dialog.title = '新增菜单'
        state.dialog.submitTxt = '新 增'
        state.ruleForm.id = 0
        // 清空表单，此项需加表单验证才能使用
        // nextTick(() => {
        // 	menuDialogFormRef.value.resetFields();
        // });
    }
    state.dialog.type = type
    state.dialog.isShowDialog = true
}
// 关闭弹窗
const closeDialog = () => {
    state.dialog.isShowDialog = false
}
// 是否内嵌下拉改变
const onSelectIframeChange = () => {
    if (state.ruleForm.meta.isIframe) state.ruleForm.isLink = true
    else state.ruleForm.isLink = false
}
// 取消
const onCancel = () => {
    closeDialog()
}
// 提交
const onSubmit = () => {
    saveLoading.value = true
    let pid = 0
    if (state.ruleForm.menuSuperior.length != 0) {
        pid = state.ruleForm.menuSuperior[state.ruleForm.menuSuperior.length - 1]
    }
    useMenuApi().addMenuApi({
        ...state.ruleForm,
        pid
    }).then(res => {
        if (res.code == 1) {
            saveLoading.value = false
            closeDialog() // 关闭弹窗
            window.location.reload()
            emit('refresh')
        }
    }).catch(() => {
        saveLoading.value = false
    })

    // if (state.dialog.type === 'add') { }
    // setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
}
// 页面加载时
onMounted(() => {
    state.menuData = getMenuData(routesList.value)
})

// 暴露变量
defineExpose({
    openDialog,
})
</script>
