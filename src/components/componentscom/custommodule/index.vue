<template>
    <div class="custommodule">
        {{ datas.demo }}
        <img :src="datas.img" alt="">
        <!-- 删除组件 -->
        <slot name="deles"/>
    </div>
</template>

<script>
export default {
  name: 'custommodule',
  props: {
    datas: Object
  }
}
</script>

<style lang="scss" scoped>
.custommodule {
  position: relative;

  img {
    width: 100%;
  }
}
</style>
