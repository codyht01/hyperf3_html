<template>
    <div class="RealTimeView">
        
        <el-dialog v-model="datas.show" top="8vh" width="414px">
            <img src="../../assets/images/phoneTop.png" style="width: 375px"/>
            <iframe
                    v-if="datas.show"
                    ref="iframe"
                    :scrolling="false"
                    :src="'http://was666.gitee.io/as-editor-h5/#/?type=iframe'"
                    class="screen"
                    @load="load"
            ></iframe>
            <van-loading v-if="loading" size="24px" vertical>加载中</van-loading>
        </el-dialog>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'RealTimeView',
  props: {
    datas: {
      show: false
    },
    val: Object
  },
  setup (props) {
    // 是否在加载中
    const loading = ref(true)

    // 加载完成事件
    const load = () => {
      loading.value = false
      document.querySelector('iframe').contentWindow.postMessage(props.val, 'http://was666.gitee.io')
    }

    return {
      loading,
      load
    }
  }
}
</script>

<style lang="scss" scoped>
.RealTimeView {
  .screen {
    width: 375px /*no*/
  ;
    height: 667px /*no*/
  ;
    border: 0;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
