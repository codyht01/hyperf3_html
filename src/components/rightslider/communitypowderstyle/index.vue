<template>
    <div class="communitypowderstyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
        <div style="height: 20px"/>
        <!-- 表单 -->
        <el-form :model="datas" :rules="rules" label-position="top" label-width="80px" size="small">
            <div style="height: 10px"/>

            <!-- 描述 -->
            <el-form-item :hide-required-asterisk="true" label="入口图片">
                <div class="backgroundImg" @click="showImg('mainImg')">
                    <img v-if="!datas.mainImg" alt="" draggable="false" src="../../../assets/images/powder.png"/>
                    <img v-else :src="datas.mainImg" alt="" draggable="false"/>
                    <p>更换图片</p>
                </div>
            </el-form-item>

            <!-- 二维码 -->
            <el-form-item :hide-required-asterisk="true" label="二维码">
                <div class="backgroundImg" @click="showImg('qrcodeImg')">
                    <i v-if="!datas.qrcodeImg" class="el-icon-plus" size="30">+</i>
                    <img v-else :src="datas.qrcodeImg" alt="" draggable="false"/>
                    <p>更换图片</p>
                </div>
            </el-form-item>

            <!-- 标题 -->
            <el-form-item :hide-required-asterisk="true" label="标题" prop="title">
                <el-input v-model="datas.title" placeholder="个人微信号, 群名称或活动标题" show-word-limit/>
            </el-form-item>

            <div style="height: 10px"/>

            <!-- 描述 -->
            <el-form-item :hide-required-asterisk="true" label="描述" prop="describe">
                <el-input v-model="datas.describe" placeholder="请添加描述" show-word-limit/>
            </el-form-item>

            <div style="height: 10px"/>

            <!-- 按钮名称 -->
            <el-form-item :hide-required-asterisk="true" label="按钮名称" prop="buttonName">
                <el-input v-model="datas.buttonName" maxlength="8" placeholder="请输入按钮名称" show-word-limit/>
            </el-form-item>

            <div style="height: 10px"/>

            <!-- 背景颜色 -->
            <el-form-item class="color-select" label="背景颜色">
                <!-- 颜色选择器 -->
                <el-color-picker v-model="datas.backColor" :predefine="predefineColors" class="picke" show-alpha></el-color-picker>
            </el-form-item>
        </el-form>

        <!-- 上传图片 -->
        <PictureDialog ref="pictureRef" :maxLength="0" :minType="'image'" @refresh="pictureRefresh"/>
    </div>
</template>

<script>
import PictureDialog from '/@/components/picture/index.vue'

export default {
  name: 'communitypowderstyle',
  props: {
    datas: Object
  },
  data () {
    return {
      rules: {
        title: [
          //页面名称
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        describe: [
          // 描述
          {required: true, message: '请输入描述', trigger: 'blur'}
        ],
        buttonName: [
          // 按钮名称
          {required: true, message: '请输入按钮名称', trigger: 'blur'}
        ]
      },
      predefineColors: [
        // 颜色选择器预设
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#409EFF',
        '#909399',
        '#C0C4CC',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      imgText: '' //哪一个图片
    }
  },
  methods: {
    // 提交
    pictureRefresh (res) {
      this.datas[this.imgText] = res[0].url
    },
    showImg (res) {
      this.imgText = res
      this.$refs.pictureRef.openDialog()
    }
  },
  components: {PictureDialog}
}
</script>

<style lang="scss" scoped>
.communitypowderstyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px 20px;
  box-sizing: border-box;
  /* 标题 */
  h2 {
    padding: 24px 16px 24px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }

  /* 颜色选择器 */
  .picke {
    margin-left: 15px;
    vertical-align: top;
  }

  /* 背景图 */
  .backgroundImg {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 60px;
    height: 60px;
    position: relative;
    background: #f2f4f6;

    img {
      width: 100%;
      height: auto;
    }

    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      line-height: 20px;
    }
  }

  .color-select {
    :deep(.el-form-item__content) {
      float: right;
    }
  }
}
</style>
