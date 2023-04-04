<template>
    <div
            :style="{
      background: datas.backgroundColor,
      border: `1px solid ${datas.backgroundColor}`,
    }"
            class="commoditysearch"
    >
        <!-- 搜索框 -->
        <section
                :style="{
        height: datas.heights + 'px',
        'justify-content': datas.textPosition === 0 ? 'left' : 'center',
        background: datas.borderColor,
        'border-radius': datas.borderRadius === 0 ? '0px' : '10px',
      }"
                class="searchs"
        >
            <div class="search-left">
                <van-icon :style="{ color: datas.textColor }" name="search" size="16"/>
                <span :style="{ color: datas.textColor }">搜索商品</span>
            </div>
            <!-- 扫一扫 -->
            <div
                    v-show="datas.sweep"
                    :style="{ color: datas.textColor }"
                    class="sweep"
            >
                <span>扫一扫</span>
            </div>
        </section>

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'commoditysearch',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.commoditysearch {
  position: relative;
  /* 搜索框 */
  .searchs {
    position: relative;
    width: 345px;
    min-height: 28px;
    margin: 5px auto;
    display: flex;
    align-items: center;
    font-size: 14px;

    .search-left {
      display: flex;
      align-items: center;
    }

    .sweep {
      position: absolute;
      right: 10px;
    }

    i {
      margin: 0 5px;
    }
  }
}
</style>
