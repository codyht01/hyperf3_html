<template>
  <div class="system-user-container layout-padding">
    <el-card class="layout-padding-auto" shadow="hover">
      <div class="chat w100">
        <div class="chat_left hidden-md-and-down">
          <User :selectIndex="selectIndex" @handleIndex="handleIndex"/>
        </div>
        <div class="chat_right padding_con">
          <div ref="scrollable" class="chat_content w100">
            <div v-for="(item,index) in messages" :key="index">
              <div v-if="item.sender == 'friend'">
                <div class="message-time">{{ item.time }}</div>
                <div class="message">
                  <div v-if="item.sender == 'me'"></div><!-- 占位，使头像和消息内容对齐 -->
                  <div class="message-avatar"></div>
                  <div class="message_msg">
                    <div class="message-content">{{ item.text }}</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="message-time">{{ item.time }}</div>
                <div class="message right">
                  <div></div><!-- 占位，使头像和消息内容对齐 -->
                  <div class="message_msg">
                    <div class="message-content right">{{ item.text }}</div>
                  </div>
                  <div class="message-avatar"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat_input">
            <div class="input">
              <el-input v-model="keywords" placeholder="请输入" size="default"/>
              <el-button class="input-btn" size="default" type="primary" @click="sendMessage">
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
import {onBeforeMount, onMounted, ref} from "vue"
import 'element-plus/theme-chalk/display.css'
import User from "./components/User.vue"
import WebSocketService from "/@/plugins/websocket/WebSocketService"

const userList = WebSocketService.userList
const messageList = WebSocketService.messageList
console.log("***********", messageList)
const handleIndex = () => {

}
const selectIndex = ref(0)
const sendMessage = () => {
  WebSocketService.sendMessage(keywords.value)
}

const keywords = ref()
const scrollable = ref()
const messages = ref([
  {sender: 'friend', text: 'Hello', time: '09:00'},
  {sender: 'me', text: 'Hi', time: '09:01'},
  {sender: 'friend', text: 'How are you?', time: '09:02'}
])

const setContentScroll = () => {
  //滚动到底部
  scrollable.value.scrollTop = scrollable.value.scrollHeight - scrollable.value.clientHeight
}

onMounted(() => {
  WebSocketService.initWebSocket()
  setContentScroll()
})
onBeforeMount(() => {
  WebSocketService.closeWebSocket()
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
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  .chat_left::-webkit-scrollbar {
    width: 1px;
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
      padding: 0 0 20px 10px;

      .message-time {
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
        text-align: center;
      }

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

      .message_msg {
        flex: 1;
      }

      .message-content {
        background-color: #eee;
        border-radius: 4px;
        padding: 5px 10px;
        max-width: 80%;
        display: inline-block;
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
