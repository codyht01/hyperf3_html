<template>
    <div
            :style="{
      'padding-left': datas.pageMargin + 'px',
      'padding-right': datas.pageMargin + 'px',
    }"
            class="magiccube"
    >
        <img
                v-show="!showimageList"
                alt=""
                draggable="false"
                src="../../../assets/images/mor.png"
                style="width: 100%"
        />

        <!-- 一行二个 -->
        <section
                v-show="datas.rubiksCubeType === 0 && showimageList"
                class="buju buju0"
        >
            <div
                    v-for="index in 2"
                    :key="index"
                    class="rubiksCubeType0 rubiksCubeType"
            >
                <img
                        :src="datas.imageList[index - 1].src"
                        :style="{ padding: datas.imgMargin / 2 + 'px' }"
                        alt=""
                        draggable="false"
                />
            </div>
        </section>

        <!-- 一行三个 -->
        <section
                v-show="datas.rubiksCubeType === 1 && showimageList"
                class="buju buju0"
        >
            <div
                    v-for="index in 3"
                    :key="index"
                    :style="{
          margin: datas.imgMargin / 10 + '%',
          width: 33.33 + '%',
        }"
                    class="rubiksCubeType1 rubiksCubeType"
            >
                <!--    width: 33 - datas.imgMargin / 10 + '%', -->
                <img :src="datas.imageList[index - 1].src" alt="" draggable="false"/>
            </div>
        </section>

        <!-- 一行四个 -->
        <section
                v-show="datas.rubiksCubeType === 2 && showimageList"
                class="buju buju0"
        >
            <div
                    v-for="index in 4"
                    :key="index"
                    :style="{
          margin: datas.imgMargin / 10 + '%',
          width: 25 - datas.imgMargin / 10 + '%',
        }"
                    class="rubiksCubeType2 rubiksCubeType"
            >
                <img :src="datas.imageList[index - 1].src" alt="" draggable="false"/>
            </div>
        </section>

        <!-- 二左二右 -->
        <section
                v-show="datas.rubiksCubeType === 3 && showimageList"
                class="buju buju0"
        >
            <div
                    v-for="index in 4"
                    :key="index"
                    class="rubiksCubeType3 rubiksCubeType"
            >
                <img
                        :src="datas.imageList[index - 1].src"
                        :style="{ padding: datas.imgMargin + 'px' }"
                        alt=""
                        draggable="false"
                />
            </div>
        </section>

        <!-- 一左二右 -->
        <section
                v-show="datas.rubiksCubeType === 4 && showimageList"
                class="buju buju4"
        >
            <div class="rubiksCubeType hw" style="padding-top: 100%">
                <img
                        :src="datas.imageList[0].src"
                        :style="{ 'padding-right': datas.imgMargin + 'px' }"
                        alt=""
                        draggable="false"
                        style="height:300px"
                />
            </div>
            <div style="display: inline-flex; flex-direction: column; width: 100%">
                <div
                        v-for="index in 2"
                        :key="index"
                        class=" hw imgone"
                        style="padding-top: 150px;height:150px"
                >
                    <img
                            :src="datas.imageList[index].src"
                            :style="{ padding: datas.imgMargin + 'px'}"
                            alt=""
                            draggable="false"
                            style="height:150px"
                    />
                </div>
            </div>
        </section>

        <!-- 一上二下 -->
        <section
                v-show="datas.rubiksCubeType === 5 && showimageList"
                class="buju buju5"
        >
            <div class="rubiksCubeType hw" style="display: block; padding-top: 50%">
                <img
                        :src="datas.imageList[0].src"
                        :style="{ 'padding-bottom': datas.imgMargin + 'px' }"
                        alt=""
                        draggable="false"
                />
            </div>
            <div style="display: flex; width: 100%">
                <div
                        v-for="index in 2"
                        :key="index"
                        class="rubiksCubeType hw imgtow"
                        style="padding-top: 50%"
                >
                    <img
                            :src="datas.imageList[index].src"
                            :style="{ padding: datas.imgMargin + 'px' }"
                            alt=""
                            draggable="false"
                    />
                </div>
            </div>
        </section>

        <!-- 一左三右 -->
        <section
                v-show="datas.rubiksCubeType === 6 && showimageList"
                class="buju buju4"
        >
            <!-- 第一张图片 -->
            <div class="rubiksCubeType hw" style="padding-top: 100%">
                <img
                        :src="datas.imageList[0].src"
                        :style="{ 'padding-right': datas.imgMargin + 'px' }"
                        alt=""
                        draggable="false"
                        style="height:300px"
                />
            </div>
            <div style="display: inline-flex; flex-direction: column; width: 100%">
                <!-- 第二张图片 -->
                <div class="rubiksCubeType hw" style="padding-top: 150px">
                    <img
                            :src="datas.imageList[1].src"
                            :style="{
              'padding-bottom': datas.imgMargin + 'px',
              'padding-left': datas.imgMargin + 'px',
            }"
                            alt=""
                            draggable="false"
                    />
                </div>
                <div class="rubiksCubeType">
                    <div
                            v-for="index in 2"
                            :key="index"
                            class="hw"
                            style="
              display: inline-flex;
              justify-content: center;
              align-items: center;
              padding-top: 150px;
            "
                    >
                        <img
                                :src="datas.imageList[index + 1].src"
                                :style="{
                'padding-left': datas.imgMargin + 'px',
                'padding-top': datas.imgMargin + 'px',
              }"
                                alt=""
                                draggable="false"
                                style="height:150px"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'magiccube',
  props: {
    datas: Object
  },
  computed: {
    showimageList () {
      if (
          this.datas.rubiksCubeType === 0 &&
          !this.datas.imageList[0].src &&
          !this.datas.imageList[1].src
      )
        return false

      if (
          (this.datas.rubiksCubeType === 1 ||
              this.datas.rubiksCubeType === 4 ||
              this.datas.rubiksCubeType === 5) &&
          !this.datas.imageList[0].src &&
          !this.datas.imageList[1].src &&
          !this.datas.imageList[2].src
      )
        return false

      if (
          (this.datas.rubiksCubeType === 2 ||
              this.datas.rubiksCubeType === 6 ||
              this.datas.rubiksCubeType === 3) &&
          !this.datas.imageList[0].src &&
          !this.datas.imageList[1].src &&
          !this.datas.imageList[2].src &&
          !this.datas.imageList[3].src
      )
        return false

      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.magiccube {
  position: relative;
  /* 布局 */
  .imgone {
    &:last-of-type {
      img {
        padding-bottom: 0 !important;
        padding-right: 0 !important;
      }
    }

    &:first-of-type {
      img {
        padding-top: 0 !important;
        padding-right: 0 !important;
      }
    }
  }

  .imgtow {
    &:first-of-type {
      img {
        padding-bottom: 0 !important;
        padding-left: 0 !important;
      }
    }

    &:last-of-type {
      img {
        padding-bottom: 0 !important;
        padding-right: 0 !important;
      }
    }
  }

  .hw {
    width: 100%;
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .buju {
    &.buju0 {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    &.buju4 {
      display: flex;
      width: 100%;
      height: 300px;
      flex-direction: row;
      justify-content: space-around;
    }

    .active {
      background: #e0edff;
      border: 1px solid #155bd4;
      color: #155bd4;
      z-index: 2;
    }

    .rubiksCubeType {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &.rubiksCubeType0 {
        width: 50%;
        // height: 200px;
        &:first-of-type {
          img {
            padding-left: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }

        &:last-of-type {
          img {
            padding-right: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }

        img {
          width: 100%;
          // height: 200px;
          display: block;
        }
      }

      &.rubiksCubeType1 {
        width: 33.333%;

        &:nth-of-type(1) {
          margin-left: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }

        &:nth-of-type(2) {
          margin-top: 0 !important;
          margin-left: 0 !important;
          margin-bottom: 0 !important;
        }

        &:nth-of-type(3) {
          margin-top: 0 !important;
          margin-right: 0 !important;
          margin-bottom: 0 !important;
        }

        img {
          width: 100%;
          height: 150px;
          display: block;
        }
      }

      &.rubiksCubeType2 {
        width: 25%;

        &:nth-of-type(1) {
          margin-left: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }

        &:nth-of-type(2) {
          margin-top: 0 !important;
          margin-left: 0 !important;
          margin-bottom: 0 !important;
        }

        &:nth-of-type(3) {
          margin-top: 0 !important;
          margin-left: 0 !important;
          margin-bottom: 0 !important;
        }

        &:nth-of-type(4) {
          margin-top: 0 !important;
          margin-right: 0 !important;
          margin-bottom: 0 !important;
        }

        img {
          width: 100%;
          height: 150px;
          display: block;
        }
      }

      &.rubiksCubeType3 {
        width: 50%;
        padding-top: 50%;
        position: relative;

        &:nth-of-type(1) {
          img {
            padding-top: 0 !important;
            padding-left: 0 !important;
          }
        }

        &:nth-of-type(2) {
          img {
            padding-top: 0 !important;
            padding-right: 0 !important;
          }
        }

        &:nth-of-type(3) {
          img {
            padding-bottom: 0 !important;
            padding-left: 0 !important;
          }
        }

        &:nth-of-type(4) {
          img {
            padding-bottom: 0 !important;
            padding-right: 0 !important;
          }
        }

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      &.rubiksCubeType4 {
        width: 187px;
        height: 187px;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
