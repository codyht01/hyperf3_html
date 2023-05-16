import {createApp} from 'vue'
import pinia from '/@/stores/index'
import App from './App.vue'
import router from './router'
import {directive} from '/@/directive'
import {i18n} from '/@/i18n'
import other from '/@/utils/other'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/@/theme/index.scss'
import VueGridLayout from 'vue-grid-layout'

import 'vant/lib/index.css'
import Vant from 'vant'

const app = createApp(App)

const modules = import.meta.globEager('./components/**/*.vue')

Object.keys(modules).forEach((path) => {
    const name = path.match(/\.\/components\/(.*)\.vue$/)?.[1]
    if (name) {
        // @ts-ignore
        app.component(modules[path].default.name, modules[path].default)
    }
})

directive(app)
other.elSvg(app)

// app.provide('$webSocket', webSocket)

// @ts-ignore
app.use(pinia).use(router).use(ElementPlus, {i18n: i18n.global.t}).use(i18n).use(VueGridLayout).use(Vant).mount('#app')
