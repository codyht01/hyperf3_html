<template>
    <div class="onlineservice">
        {{ datas.text }}

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'onlineservice',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.onlineservice {
  position: relative;
}
</style>
