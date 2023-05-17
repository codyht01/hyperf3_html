<template>
    <div :style="{ flex: layoutUserFlexNum }" class="layout-navbars-breadcrumb-user pr15">
        <el-dropdown :hide-timeout="50" :show-timeout="70" trigger="click" @command="onComponentSizeChange">
            <div class="layout-navbars-breadcrumb-user-icon">
                <i :title="$t('message.user.title0')" class="iconfont icon-ziti"></i>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :disabled="state.disabledSize === 'large'" command="large">{{ $t('message.user.dropdownLarge') }}</el-dropdown-item>
                    <el-dropdown-item :disabled="state.disabledSize === 'default'" command="default">{{ $t('message.user.dropdownDefault') }}</el-dropdown-item>
                    <el-dropdown-item :disabled="state.disabledSize === 'small'" command="small">{{ $t('message.user.dropdownSmall') }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-dropdown :hide-timeout="50" :show-timeout="70" trigger="click" @command="onLanguageChange">
            <div class="layout-navbars-breadcrumb-user-icon">
                <i
                        :class="state.disabledI18n === 'en' ? 'icon-fuhao-yingwen' : 'icon-fuhao-zhongwen'"
                        :title="$t('message.user.title1')"
                        class="iconfont"
                ></i>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :disabled="state.disabledI18n === 'zh-cn'" command="zh-cn">简体中文</el-dropdown-item>
                    <el-dropdown-item :disabled="state.disabledI18n === 'en'" command="en">English</el-dropdown-item>
                    <el-dropdown-item :disabled="state.disabledI18n === 'zh-tw'" command="zh-tw">繁體中文</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
            <el-icon :title="$t('message.user.title2')">
                <ele-Search/>
            </el-icon>
        </div>
        <div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
            <i :title="$t('message.user.title3')" class="icon-skin iconfont"></i>
        </div>
        <div class="layout-navbars-breadcrumb-user-icon">
            <el-popover :persistent="false" :width="300" placement="bottom" transition="el-zoom-in-top" trigger="click">
                <template #reference>
                    <el-badge :is-dot="true">
                        <el-icon :title="$t('message.user.title4')">
                            <ele-Bell/>
                        </el-icon>
                    </el-badge>
                </template>
                <template #default>
                    <UserNews/>
                </template>
            </el-popover>
        </div>
        <div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick">
            <i
                    :class="!state.isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"
                    :title="state.isScreenfull ? $t('message.user.title6') : $t('message.user.title5')"
                    class="iconfont"
            ></i>
        </div>
        <el-dropdown :hide-timeout="50" :show-timeout="70" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img :src="userInfos.avatar_url" class="layout-navbars-breadcrumb-user-link-photo mr5"/>
				{{ userInfos.userName === '' ? 'common' : userInfos.userName }}
				<el-icon class="el-icon--right">
					<ele-ArrowDown/>
				</el-icon>
			</span>
            <template #dropdown>
                <el-dropdown-menu>
                    <!--                    <el-dropdown-item command="/home">{{ $t('message.user.dropdown1') }}</el-dropdown-item>-->
                    <!--					<el-dropdown-item command="wareHouse">{{ $t('message.user.dropdown6') }}</el-dropdown-item>-->
                    <el-dropdown-item command="/personal">{{ $t('message.user.dropdown2') }}</el-dropdown-item>
                    <!--                    <el-dropdown-item command="/404">{{ $t('message.user.dropdown3') }}</el-dropdown-item>-->
                    <!--                    <el-dropdown-item command="/401">{{ $t('message.user.dropdown4') }}</el-dropdown-item>-->
                    <el-dropdown-item command="logOut" divided>{{ $t('message.user.dropdown5') }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <Search ref="searchRef"/>
    </div>
</template>

<script lang="ts" name="layoutBreadcrumbUser" setup>
import {computed, defineAsyncComponent, onMounted, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessage, ElMessageBox} from 'element-plus'
import screenfull from 'screenfull'
import {useI18n} from 'vue-i18n'
import {storeToRefs} from 'pinia'
import {useUserInfo} from '/@/stores/userInfo'
import {useThemeConfig} from '/@/stores/themeConfig'
import other from '/@/utils/other'
import mittBus from '/@/utils/mitt'
import {Local, Session} from '/@/utils/storage'

// 引入组件
const UserNews = defineAsyncComponent(() => import('/@/layout/navBars/breadcrumb/userNews.vue'))
const Search = defineAsyncComponent(() => import('/@/layout/navBars/breadcrumb/search.vue'))

// 定义变量内容
const {locale, t} = useI18n()
const router = useRouter()
const stores = useUserInfo()
const storesThemeConfig = useThemeConfig()
const {userInfos} = storeToRefs(stores)
const {themeConfig} = storeToRefs(storesThemeConfig)
const searchRef = ref()
const state = reactive({
    isScreenfull: false,
    disabledI18n: 'zh-cn',
    disabledSize: 'large',
})

// 设置分割样式
const layoutUserFlexNum = computed(() => {
    let num: string | number = ''
    const {layout, isClassicSplitMenu} = themeConfig.value
    const layoutArr: string[] = ['defaults', 'columns']
    if (layoutArr.includes(layout) || (layout === 'classic' && !isClassicSplitMenu)) num = '1'
    else num = ''
    return num
})
// 全屏点击时
const onScreenfullClick = () => {
    if (!screenfull.isEnabled) {
        ElMessage.warning('暂不不支持全屏')
        return false
    }
    screenfull.toggle()
    screenfull.on('change', () => {
        if (screenfull.isFullscreen) state.isScreenfull = true
        else state.isScreenfull = false
    })
}
// 布局配置 icon 点击时
const onLayoutSetingClick = () => {
    mittBus.emit('openSetingsDrawer')
}
// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {
    if (path === 'logOut') {
        ElMessageBox({
            closeOnClickModal: false,
            closeOnPressEscape: false,
            title: t('message.user.logOutTitle'),
            message: t('message.user.logOutMessage'),
            showCancelButton: true,
            confirmButtonText: t('message.user.logOutConfirm'),
            cancelButtonText: t('message.user.logOutCancel'),
            buttonSize: 'default',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true
                    instance.confirmButtonText = t('message.user.logOutExit')
                    setTimeout(() => {
                        done()
                        setTimeout(() => {
                            instance.confirmButtonLoading = false
                        }, 300)
                    }, 700)
                } else {
                    done()
                }
            },
        })
            .then(async () => {
                // 清除缓存/token等
                Session.clear()
                // 使用 reload 时，不需要调用 resetRoute() 重置路由
                window.location.reload()
            })
            .catch(() => {
            })
    } else if (path === 'wareHouse') {
        window.open('https://gitee.com/lyt-top/vue-next-admin')
    } else {
        router.push(path)
    }
}
// 菜单搜索点击
const onSearchClick = () => {
    searchRef.value.openSearch()
}
// 组件大小改变
const onComponentSizeChange = (size: string) => {
    Local.remove('themeConfig')
    themeConfig.value.globalComponentSize = size
    Local.set('themeConfig', themeConfig.value)
    initI18nOrSize('globalComponentSize', 'disabledSize')
    window.location.reload()
}
// 语言切换
const onLanguageChange = (lang: string) => {
    Local.remove('themeConfig')
    themeConfig.value.globalI18n = lang
    Local.set('themeConfig', themeConfig.value)
    locale.value = lang
    other.useTitle()
    initI18nOrSize('globalI18n', 'disabledI18n')
}
// 初始化组件大小/i18n
const initI18nOrSize = (value: string, attr: string) => {
    state[attr] = Local.get('themeConfig')[value]
}
// 页面加载时
onMounted(() => {
    if (Local.get('themeConfig')) {
        initI18nOrSize('globalComponentSize', 'disabledSize')
        initI18nOrSize('globalI18n', 'disabledI18n')
    }
})
</script>

<style lang="scss" scoped>
.layout-navbars-breadcrumb-user {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;

    &-photo {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }

  &-icon {
    padding: 0 10px;
    cursor: pointer;
    color: var(--next-bg-topBarColor);
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;

    &:hover {
      background: var(--next-color-user-hover);

      i {
        display: inline-block;
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }

  :deep(.el-dropdown) {
    color: var(--next-bg-topBarColor);
  }

  :deep(.el-badge) {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }

  :deep(.el-badge__content.is-fixed) {
    top: 12px;
  }
}
</style>
