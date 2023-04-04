<template>
    <div class="auxiliarysegmentation">
        <section
                :style="{
        height: datas.blankHeight + 'px',
        padding: datas.paddType === 0 ? '0px' : '0px 15px',
      }"
                class="contan"
        >
            <div
                    v-show="datas.segmentationtype === 1"
                    :style="{
          'border-top-style': datas.bordertp,
          'border-top-color': datas.auxliarColor,
        }"
                    style="height: 1px; width: 100%; border-top-width: 1px"
            />
        </section>

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'auxiliarysegmentation',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.auxiliarysegmentation {
  position: relative;

  .contan {
    display: flex;
    align-items: center;
  }
}
</style>
