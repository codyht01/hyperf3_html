<template>
    <div class="notice">
        <!-- 公告 -->
        <van-notice-bar
                :background="datas.backColor"
                :color="datas.textColor"
                :text="datas.noticeText"
                left-icon="volume-o"
        />

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'notice',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.notice {
  position: relative;
}
</style>
