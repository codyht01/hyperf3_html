<template>
    <div class="storeinformation">
        <!-- 样式一 -->
        <section
                v-show="datas.rubiksCubeType === 0 || datas.rubiksCubeType === 2"
                class="type0"
        >
            <div
                    v-if="datas.rubiksCubeType === 0"
                    class="menban"
                    style="background-color: rgba(0, 0, 0, 0.3)"
            />
            <div
                    v-else
                    class="menban"
                    style="background-image: linear-gradient(to top, #000, transparent)"
            />

            <!-- 蒙版 -->
            <div class="men">
                <img
                        v-if="datas.bakcgroundImg"
                        :src="datas.bakcgroundImg"
                        alt=""
                        draggable="false"
                />
                <img
                        v-else
                        alt=""
                        draggable="false"
                        src="../../../assets/images/backimg.png"
                />
            </div>

            <!-- 店铺信息 -->
            <div class="storIinformation">
                <div>
                    <img
                            v-if="datas.headPortrait"
                            :src="datas.headPortrait"
                            alt=""
                            draggable="false"
                    />
                    <img
                            v-else
                            alt=""
                            draggable="false"
                            src="../../../assets/images/headerimg.png"
                    />
                </div>
                <div>
                    <p style="margin-top: 5px; font-weight: 700; font-size: 18px">
                        {{ datas.name }}
                    </p>
                    <p style="font-size: 12px; margin-top: 10px">{{ datas.Discount }}</p>
                </div>
            </div>
        </section>

        <!-- 样式二 -->
        <section v-show="datas.rubiksCubeType === 1" class="type1">
            <div
                    class="menban"
                    style="background-image: linear-gradient(to top, #000, transparent)"
            />
            <!-- 蒙版 -->
            <div class="men">
                <img
                        v-if="datas.bakcgroundImg"
                        :src="datas.bakcgroundImg"
                        alt=""
                        draggable="false"
                />
                <img
                        v-else
                        alt=""
                        draggable="false"
                        src="../../../assets/images/backimg.png"
                />
            </div>

            <!-- 店铺信息 -->
            <div class="storIinformation">
                <div>
                    <img
                            v-if="datas.headPortrait"
                            :src="datas.headPortrait"
                            alt=""
                            draggable="false"
                    />
                    <img
                            v-else
                            alt=""
                            draggable="false"
                            src="../../../assets/images/headerimg.png"
                    />
                </div>
                <div>
                    <p style="margin-top: 5px; font-weight: 700; font-size: 18px">
                        {{ datas.name }}
                    </p>
                    <p style="font-size: 12px; margin-top: 10px">{{ datas.Discount }}</p>
                </div>
            </div>
        </section>

        <!-- 样式四 -->
        <section v-show="datas.rubiksCubeType === 3" class="type3">
            <div
                    class="menban"
                    style="background-image: linear-gradient(to top, #000, transparent)"
            />
            <!-- 蒙版 -->
            <div class="men">
                <img
                        v-if="datas.bakcgroundImg"
                        :src="datas.bakcgroundImg"
                        alt=""
                        draggable="false"
                />
                <img
                        v-else
                        alt=""
                        draggable="false"
                        src="../../../assets/images/backimg.png"
                />
            </div>

            <!-- 店铺信息 -->
            <div class="storIinformation">
                <div>
                    <img
                            v-if="datas.headPortrait"
                            :src="datas.headPortrait"
                            alt=""
                            draggable="false"
                    />
                    <img
                            v-else
                            alt=""
                            draggable="false"
                            src="../../../assets/images/headerimg.png"
                    />
                </div>
                <div>
                    <p style="margin-top: 5px; font-weight: 700; font-size: 18px">
                        {{ datas.name }}
                    </p>
                    <p style="font-size: 12px; margin-top: 10px">{{ datas.Discount }}</p>
                </div>
            </div>
        </section>

        <!-- 样式五 -->
        <section v-show="datas.rubiksCubeType === 4" class="type4">
            <div
                    class="menban"
                    style="background-image: linear-gradient(to top, #000, transparent)"
            />
            <!-- 蒙版 -->
            <div class="men">
                <img
                        v-if="datas.bakcgroundImg"
                        :src="datas.bakcgroundImg"
                        alt=""
                        draggable="false"
                />
                <img
                        v-else
                        alt=""
                        draggable="false"
                        src="../../../assets/images/backimg.png"
                />
            </div>

            <!-- 店铺信息 -->
            <div class="storIinformation">
                <div>
                    <img
                            v-if="datas.headPortrait"
                            :src="datas.headPortrait"
                            alt=""
                            draggable="false"
                    />
                    <img
                            v-else
                            alt=""
                            draggable="false"
                            src="../../../assets/images/headerimg.png"
                    />
                </div>
                <div>
                    <p
                            style="
              margin-top: 5px;
              font-weight: 700;
              font-size: 18px;
              line-height: 40px;
              border-bottom: 1px solid #fff;
            "
                    >
                        {{ datas.name }}
                    </p>
                    <p style="font-size: 12px; margin-top: 10px">{{ datas.Discount }}</p>
                </div>
            </div>
        </section>

        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'storeinformation',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.storeinformation {
  position: relative;

  /* 类型一 */
  .type0 {
    width: 100%;
    background-repeat: round;
    position: relative;
    height: 185px;
    /* 蒙版 */
    .men {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    /* 店铺信息 */
    .storIinformation {
      width: 100%;
      height: 60px;
      position: absolute;
      left: 0;
      top: 110px;
      display: flex;
      z-index: 3;

      img {
        width: 60px;
        height: 60px;
        margin-left: 15px;
        margin-right: 10px;
        border-radius: 5px;
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      }
    }
  }

  .menban {
    position: absolute;
    left: 0 p;
    top: 0px;
    width: 100%;
    z-index: 2;
    height: 100%;
  }

  /* 类型二 */
  .type1 {
    width: 100%;
    background-repeat: round;
    position: relative;
    height: 238px;
    /* 蒙版 */
    .men {
      width: 100%;
      height: 185px;
      position: absolute;
      left: 0;
      top: 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    /* 店铺信息 */
    .storIinformation {
      width: 100%;
      height: 60px;
      position: absolute;
      left: 0;
      top: 150px;
      display: flex;
      z-index: 3;

      img {
        width: 72px;
        height: 72px;
        margin-left: 15px;
        margin-right: 10px;
        border-radius: 50%;
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      }
    }
  }

  /* 类型四 */
  .type3 {
    width: 100%;
    background-repeat: round;
    position: relative;
    height: 238px;
    /* 蒙版 */
    .men {
      width: 100%;
      height: 140px;
      position: absolute;
      left: 0;
      top: 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    /* 店铺信息 */
    .storIinformation {
      width: 100%;
      position: absolute;
      left: 0;
      top: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 3;

      img {
        width: 72px;
        height: 72px;
        margin-left: 15px;
        margin-right: 10px;
        border-radius: 50%;
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        text-align: center;
      }
    }
  }

  /* 类型五 */
  .type4 {
    width: 100%;
    background-repeat: round;
    position: relative;
    height: 250px;
    /* 蒙版 */
    .men {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    /* 店铺信息 */
    .storIinformation {
      width: 100%;
      position: absolute;
      left: 0;
      top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 3;

      img {
        width: 72px;
        height: 72px;
        margin-left: 15px;
        margin-right: 10px;
        border-radius: 50%;
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
