<template>
    <div class="entertheshop">
        <!-- 内容 -->
        <van-cell
                :icon="datas.icon"
                :title="datas.shopName"
                :to="datas.type==10?datas.http.externalLink:''"
                :url="datas.type==11?datas.http.externalLink:''"
                :value="datas.copywriting"
                class="pointer-events"
                is-link
        />

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'entertheshop',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.entertheshop {
  position: relative;

  :deep(.van-cell__left-icon) {
    display: flex;
    align-items: center;
  }
}
</style>
