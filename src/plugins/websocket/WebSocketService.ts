import {ElMessage} from 'element-plus'
import {Session} from "/@/utils/storage"

const WS_URL = 'ws://192.168.0.88:9502'
const RECONNECT_TIMEOUT = 5000

const MessageType = {
    USER_LIST: 'user_list',
    CHAT_MESSAGE: 'chat_message',
    CHAT_CLOSE: 'chat_close'
}

class WebSocketService {
    private static instance: WebSocketService
    public userList: string[] = []
    public messageList: { sender: string, content: string }[] = []
    private socket: WebSocket | null = null
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null

    private constructor() {
        this.initWebSocket()
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService()
        }
        return WebSocketService.instance
    }

    public sendMessage(message: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            ElMessage.warning('WebSocket connection is not ready.')
            return
        }
        const content = message.trim()
        if (content) {
            this.socket.send(JSON.stringify({
                type: MessageType.CHAT_MESSAGE,
                content: content,
                token: Session.get('token'),
            }))
        }
    }

    public closeWebSocket() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.close()
        }
        if (this.reconnectTimer) {
            clearInterval(this.reconnectTimer)
            this.reconnectTimer = null
        }
    }

    public initWebSocket() {
        this.socket = new WebSocket(WS_URL)
        this.socket.onopen = () => {
            console.log('Connected to server:', WS_URL)
            if (this.reconnectTimer) {
                clearInterval(this.reconnectTimer)
                this.reconnectTimer = null
            }
        }
        this.socket.onmessage = event => {
            const res = JSON.parse(event.data)
            console.log("------------", res.data)
            switch (res.data.type) {
                case MessageType.USER_LIST:
                    this.userList = res.data.list
                    break
                case MessageType.CHAT_MESSAGE:
                    this.messageList.push(res.data)
                    break
                default:
                    console.warn('Unknown message type:', res.data.type)
                    break
            }
        }
        this.socket.onclose = event => {
            console.log('Connection closed:', event.code, event.reason)
            if (!this.reconnectTimer) {
                this.reconnectTimer = setTimeout(() => {
                    console.log('Reconnecting to server...')
                    this.initWebSocket()
                }, RECONNECT_TIMEOUT)
            }
        }
        this.socket.onerror = error => {
            console.error('WebSocket error:', error)
            ElMessage.error('WebSocket error occurred.')
        }
    }
}

export default WebSocketService.getInstance()
