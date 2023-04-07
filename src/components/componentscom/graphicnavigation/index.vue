<template>
    <div :style="{ backgroundImage: 'url(' + datas.bgImg + ')' }" class="graphicnavigation">
        <!-- 默认导航 -->
        <section v-if="!datas.imageList[0]" :style="{background: datas.backgroundColor || '#fff',display: datas.imgStyle === 0 ? 'flex' : '-webkit-box','overflow-x': datas.imgStyle === 0 ? '' : 'scroll',}" class="defaultNavigation">
            <!-- 导航 -->
            <div v-for="index in 5" :key="index" :style="{width:datas.imgStyle === 0 ? 'auto' : 375 / datas.showSize - 1 + 'px',}" class="navigationList">
                <!-- 图片 -->
                <img v-show="datas.navigationType === 0" :style="{ 'border-radius': datas.borderRadius + '%' }" alt="默认图片" draggable="false" src="../../../assets/images/imgs.png"/>
                <!-- 文字 -->
                <p :style="{ color: datas.textColor }">导航</p>
            </div>
        </section>

        <!-- 导航列表 -->
        <section v-else :style="{display: datas.imgStyle === 0 ? 'flex' : '-webkit-box','flex-wrap': datas.imgStyle === 0 ? 'wrap' : 'nowrap','justify-content':datas.imgStyle === 0 ? 'space-evenly' : 'space-around','overflow-x': datas.imgStyle === 0 ? '' : 'scroll',}" class="defaultNavigation">
            <!-- 导航 -->
            <div v-for="(item, index) in datas.imageList" :key="index" :style="{width: datas.imgStyle === 0 ? '20%' : 375 / datas.showSize - 1 + 'px',}" class="navigationList">
                <!-- 图片 -->
                <img v-show="datas.navigationType === 0" :src="item.src" :style="{ 'border-radius': datas.borderRadius + '%' }" alt="默认图片" draggable="false"/>
                <!-- 文字 -->
                <p :style="{
            color: datas.textColor,
            'font-size': datas.textSize + 'px',
            height: datas.textHeight + 'px',
            'line-height': datas.textHeight + 'px',
          }">
                    {{ item.text }}
                </p>
            </div>
        </section>

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'graphicnavigation',
  props: {
    datas: Object
  },
  created () {
    console.log(this.datas, '--------graphicnavigation')
  }
}
</script>

<style lang="scss" scoped>
.graphicnavigation {
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* 默认导航 */
  .defaultNavigation {
    // overflow-x: scroll;
    justify-content: space-evenly;

    &::-webkit-scrollbar {
      height: 1px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #155bd4;
    }

    :deep(.el-collapse-item__header),
    :deep(.el-collapse-item__wrap) {
      border-bottom: 0 !important;
    }

    /* 导航 */
    .navigationList {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        margin-top: 5px;
        width: 45px;
        height: 45px;
      }

      p {
        font-size: 12px;
        margin-top: 5px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
}
</style>
