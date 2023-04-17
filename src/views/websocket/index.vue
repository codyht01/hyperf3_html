<template>
    <div class="system-user-container layout-padding">
        <el-card class="layout-padding-auto" shadow="hover">

        </el-card>
    </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue"

const ws = ref()
onMounted(() => {
    ws.value = new WebSocket("ws://192.168.0.88:9502")
    onOpen()
})
const onOpen = () => {
    
}
</script>

<style lang="scss" scoped>

</style>
