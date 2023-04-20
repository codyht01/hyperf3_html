<template>
    <div class="system-user-container layout-padding">
        <el-card class="layout-padding-auto" shadow="hover">
            <div class="chat w100">
                <div class="chat_left hidden-md-and-down">
                    111
                </div>
                <div class="chat_right padding_con">
                    <div class="chat_content">

                    </div>
                    <div class="chat_input">
                        <el-input placeholder="请输入" size="default"/>
                        <el-button>

                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue"
import 'element-plus/theme-chalk/display.css'

const sendMessage = () => {

}
const messages = ref([
    {sender: 'friend', text: 'Hello', time: '09:00'},
    {sender: 'me', text: 'Hi', time: '09:01'},
    {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}
])
const reconnectTimer = ref()
const socket = ref()
const connect = () => {
    socket.value = new WebSocket("ws://192.168.0.88:9502")
    socket.value.addEventListener("open", handleOpenMessage)
    socket.value.addEventListener("message", handleMessage)
    socket.value.addEventListener("error", handleErrorMessage)
    socket.value.addEventListener("close", handleCloseMessage)
}
const reconnect = () => {
    clearTimeout(reconnectTimer.value)
    reconnectTimer.value = setTimeout(() => {
        connect()
    }, 3000)
}
const handleOpenMessage = (event: any) => {
    console.log("open", event)
}
const handleMessage = (event: { data: any; }) => {
    messages.value.push(event.data)
}
const handleErrorMessage = (event) => {
    console.log("错误")
    reconnect()
}
const handleCloseMessage = (event) => {
    console.log("关闭比")
    reconnect()
}

onMounted(() => {
    //connect()
})

onUnmounted(() => {
    if (socket.value) {
        socket.value.close()
    }
    clearTimeout(reconnectTimer.value)
})
</script>

<style lang="scss" scoped>
.chat {
  height: calc(100vh - 155px);
  display: flex;
  flex-direction: row;

  .chat_left {
    min-width: 260px;
    border-right: 1px solid #e5e7eb;
    padding-right: 20px;
  }

  .chat_right {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .chat_content {
      flex: 1;
      border: 1px solid #0000ff;
    }

    .chat_input {
      height: 80px;
    }
  }
}

.padding_con {
  padding: 0 20px;
}
</style>
