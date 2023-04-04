<template>
    <div :style="{ background: datas.backColor }" class="richtext">
        <img
                v-if="!datas.myValue.length"
                alt=""
                draggable="false"
                src="../../../assets/images/fwb.png"
        />
        <section v-else v-html="datas.myValue"/>

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'richtext',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.richtext {
  position: relative;
}

:deep(img) {
  max-width: 100% !important;
  display: block;
}

.richtext {
  position: relative;

  :deep(pre) {
    white-space: break-spaces;
  }

  :deep(p) {
    word-break: break-all;
  }
}
</style>
