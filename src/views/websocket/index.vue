<template>
    <div class="system-user-container layout-padding">
        <el-card class="layout-padding-auto" shadow="hover">
            <div class="chat w100">
                <div class="chat_left hidden-md-and-down">
                    111
                </div>
                <div class="chat_right padding_con">
                    <div ref="scrollable" class="chat_content w100">
                        <div class="message">
                            <div class="message-avatar"></div>
                            <div class="message_msg">
                                <div class="message-time">2023-04-20 09:50:00</div>
                                <div class="message-content">你好，请问有什么需要帮助的吗？</div>
                            </div>
                        </div>
                        <div class="message right">
                            <div></div><!-- 占位，使头像和消息内容对齐 -->
                            <div class="message_msg">
                                <div class="message-time">2023-04-20 09:52:00</div>
                                <div class="message-content right">您好，我想了解一下产品的价格。</div>
                            </div>
                            <div class="message-avatar"></div>
                        </div>
                    </div>
                    <div class="chat_input">
                        <div class="input">
                            <el-input placeholder="请输入" size="default"/>
                            <el-button class="input-btn" size="default" type="primary">
                                <SvgIcon :size="30" name="ele-Position"/>
                            </el-button>
                        </div>
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
const scrollable = ref()
const messages = ref([
    {sender: 'friend', text: 'Hello', time: '09:00'},
    {sender: 'me', text: 'Hi', time: '09:01'},
    {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'}, {sender: 'friend', text: 'How are you?', time: '09:02'},
    {sender: 'me', text: "I'm good, thanks. What about you?", time: '09:03'},
    {sender: 'friend', text: 'I am fine too', time: '09:04'},
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
const setContentScroll = () => {
    //滚动到底部
    scrollable.value.scrollTop = scrollable.value.scrollHeight - scrollable.value.clientHeight
}
onMounted(() => {
    connect()
    setContentScroll()
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
      overflow-y: auto;
      scroll-behavior: smooth;

      .message {
        margin-bottom: 10px;
        display: flex;
        align-items: flex-start;
        flex: 1;
      }

      .message-avatar {
        width: 40px;
        height: 40px;
        background-color: #eee;
        border-radius: 50%;
        margin-right: 10px;
        flex-shrink: 0;
      }

      .message-time {
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
        text-align: center;
      }

      .message-content {
        background-color: #eee;
        border-radius: 4px;
        padding: 5px 10px;
        max-width: 80%;
      }

      .message-content.right {
        background-color: #d4eefc;
        float: right;
        margin-right: 10px;
      }
    }

    .chat_input {
      height: 50px;

      .input {
        display: flex;
        flex-direction: row;
        margin-top: 20px;

        .input-btn {
          margin-left: 10px;
        }
      }
    }
  }
}

.padding_con {
  padding: 0 20px;
}
</style>
