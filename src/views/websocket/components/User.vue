<template>
    <div class="content">
        <div class="item">
            <div v-for="(item,index) in 20" :key="index" :class="{'active':item == 2}" class="list">
                <div class="logo">
                    <el-image class="image" src="https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics7.baidu.com%2Ffeed%2F0b7b02087bf40ad1a8855b79dac235d3abeccec6.jpeg%40f_auto%3Ftoken%3D93d71f58594250e3c411c67aa8dad6f2&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1683910800&t=4cf641748f18eb0358c6d0d58783c235"/>
                </div>
                <div class="con">
                    <div class="top">
                        <div class="left">
                            title
                        </div>
                        <div class="right">
                            14:00
                        </div>
                    </div>
                    <div class="bottom">
                        这是什么🔞类型这是什么类型这是什么类型这是什么类型这是什么类型这是什么类型这是什么类型这是什么类型 🔞
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, toRefs} from "vue"

const props = defineProps({
    selectIndex: {
        type: Number,
        default: () => 0
    }
})
const {selectIndex} = toRefs(props)
const emit = defineEmits(['handleIndex'])

onMounted(() => {

})
</script>
<style lang="scss" scoped>
.item {
  .list:hover {
    background: rgba(204, 204, 204, 0.2);
  }

  .list {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    cursor: pointer;

    .logo {
      width: 40px;
      height: 40px;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .con {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      height: 40px;
      justify-content: space-between;

      .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .right {
          color: #ccc;
          font-size: 12px;
        }
      }

      .bottom {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 170px;
        color: #ccc;
        font-size: 12px;
      }
    }
  }

  .active {
    background: #eee;
  }
}
</style>
