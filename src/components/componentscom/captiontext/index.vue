<template>
    <div :style="{ background: datas.backColor }" class="captiontext">
        <div
                :style="{
        'border-bottom': datas.borderBott
          ? '1px solid #F9F9F9'
          : '1px solid #fff',
      }"
                style="padding: 6px 0"
        >
            <!-- 标题 -->
            <h2
                    v-if="datas.name"
                    :style="{
          'font-size': datas.wordSize + 'px',
          'font-weight': datas.wordWeight,
          color: datas.wordColor,
          'text-align': datas.positions,
          height: datas.wordHeight + 'px',
          'line-height': datas.wordHeight + 'px',
          'padding-right': !(datas.positions !== 'center' && datas.more.show)
            ? '0'
            : '60px',
        }"
            >
                {{ datas.name }}
            </h2>

            <!-- 描述文字 -->
            <p
                    v-if="datas.description"
                    :style="{
          'font-size': datas.descriptionSize + 'px',
          'font-weight': datas.descriptionWeight,
          color: datas.descriptionColor,
          'text-align': datas.positions,
        }"
                    style="margin-top: 8px"
            >
                {{ datas.description }}
            </p>

            <!-- 更多 -->
            <p
                    v-show="datas.more.show"
                    :class="datas.positions !== 'center' ? 'lef' : ''"
                    :style="{
          color: datas.more.type === 0 ? '#38f' : '',
          top: (datas.wordHeight - 6) / 2 + 'px',
        }"
                    class="more"
            >
                {{ datas.more.type === 2 ? '' : datas.more.text }}
                <span> {{ datas.more.type === 0 ? '' : '>' }}</span>
            </p>
        </div>

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'captiontext',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.captiontext {
  border: 2px solid #fff;
  box-sizing: border-box;
  width: 100%;
  padding: 0 14px;
  min-height: 20px;
  position: relative;

  h2,
  p {
    word-wrap: break-word;
    min-height: 10px;
  }

  /* 更多 */
  .more {
    font-size: 10px;
    color: #969799;
    text-align: center;

    &.lef {
      position: absolute;
      right: 15px;
      top: 12px;
    }
  }
}
</style>
