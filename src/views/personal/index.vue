<template>
    <div class="personal layout-pd">
        <el-row>
            <!-- 个人信息 -->
            <el-col :sm="16" :xs="24">
                <el-card header="个人信息" shadow="hover">
                    <div class="personal-user">
                        <div class="personal-user-left">
                            <div class="h100 personal-user-left-upload" @click="clickPicture">
                                <img :src="state.personalForm.avatar_url || 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'"/>
                            </div>
                        </div>
                        <div class="personal-user-right">
                            <el-row>
                                <el-col :span="24" class="personal-title mb18">{{ currentTime }}，{{ state.personalForm.userName }}，{{ state.personalForm.autograph }}</el-col>
                                <el-col :span="24">
                                    <el-row>
                                        <el-col :sm="8" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">昵称：</div>
                                            <div class="personal-item-value">{{ state.personalForm.userName }}</div>
                                        </el-col>
                                        <el-col :sm="16" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">性别：</div>
                                            <div v-if="state.personalForm.sex == 1" class="personal-item-value">男</div>
                                            <div v-else-if="state.personalForm.sex == 2" class="personal-item-value">女</div>
                                            <div v-else class="personal-item-value">保密</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="24">
                                    <el-row>
                                        <el-col :sm="8" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">登录IP：</div>
                                            <div class="personal-item-value">{{ state.personalForm.last_login_ip }}</div>
                                        </el-col>
                                        <el-col :sm="16" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">登录时间：</div>
                                            <div class="personal-item-value">{{ formatDate(new Date(state.personalForm.last_login_time * 1000), 'YYYY-mm-dd HH:MM:SS') }}</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <!-- 消息通知 -->
            <el-col :sm="8" :xs="24" class="pl15 personal-info">
                <el-card shadow="hover">
                    <template #header>
                        <span>消息通知</span>
                        <span class="personal-info-more">更多</span>
                    </template>
                    <div class="personal-info-box">
                        <ul class="personal-info-ul">
                            <li v-for="(v, k) in state.newsInfoList" :key="k" class="personal-info-li">
                                <a :href="v.link" class="personal-info-li-title" target="_block">{{ v.title }}</a>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>

            <!-- 营销推荐 -->
            <el-col :span="24">
                <el-card class="mt15" header="营销推荐" shadow="hover">
                    <el-row :gutter="15" class="personal-recommend-row">
                        <el-col v-for="(v, k) in state.recommendList" :key="k" :sm="6" class="personal-recommend-col">
                            <div :style="{ 'background-color': v.bg }" class="personal-recommend">
                                <SvgIcon :name="v.icon" :size="70" :style="{ color: v.iconColor }"/>
                                <div class="personal-recommend-auto">
                                    <div>{{ v.title }}</div>
                                    <div class="personal-recommend-msg">{{ v.msg }}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>

            <!-- 更新信息 -->
            <el-col :span="24">
                <el-card class="mt15 personal-edit" header="更新信息" shadow="hover">
                    <div class="personal-edit-title">基本信息</div>
                    <el-form :model="state.personalForm" :rules="rules" autocapitalize="off" class="mt35 mb35" label-width="40px" size="default">
                        <el-row :gutter="35">
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="昵称" prop="name">
                                    <el-input v-model="state.personalForm.userName" clearable disabled placeholder="请输入昵称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="邮箱">
                                    <el-input v-model="state.personalForm.email" clearable disabled placeholder="请输入邮箱"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="手机">
                                    <el-input v-model="state.personalForm.phone" clearable disabled placeholder="请输入手机"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="签名">
                                    <el-input v-model="state.personalForm.autograph" clearable placeholder="请输入签名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="性别">
                                    <el-select v-model="state.personalForm.sex" class="w100" clearable placeholder="请选择性别">
                                        <el-option :value="2" label="女"></el-option>
                                        <el-option :value="1" label="男"></el-option>
                                        <el-option :value="3" label="保密"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
                                <el-form-item>
                                    <el-button type="primary" @click="updatePersonal">
                                        <el-icon>
                                            <ele-Position/>
                                        </el-icon>
                                        更新个人信息
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="personal-edit-title mb15">账号安全</div>
                    <div class="personal-edit-safe-box">
                        <div class="personal-edit-safe-item">
                            <div class="personal-edit-safe-item-left">
                                <div class="personal-edit-safe-item-left-label">账户密码</div>
                                <div class="personal-edit-safe-item-left-value">当前密码强度：强</div>
                            </div>
                            <div class="personal-edit-safe-item-right">
                                <el-button text type="primary" @click="updatePwd()">立即修改</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="personal-edit-safe-box" style="display: none">
                        <div class="personal-edit-safe-item">
                            <div class="personal-edit-safe-item-left">
                                <div class="personal-edit-safe-item-left-label">密保手机</div>
                                <div class="personal-edit-safe-item-left-value">已绑定手机：132****4108</div>
                            </div>
                            <div class="personal-edit-safe-item-right">
                                <el-button text type="primary">立即修改</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="personal-edit-safe-box" style="display: none">
                        <div class="personal-edit-safe-item">
                            <div class="personal-edit-safe-item-left">
                                <div class="personal-edit-safe-item-left-label">密保问题</div>
                                <div class="personal-edit-safe-item-left-value">已设置密保问题，账号安全大幅度提升</div>
                            </div>
                            <div class="personal-edit-safe-item-right">
                                <el-button text type="primary">立即设置</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="personal-edit-safe-box" style="display: none">
                        <div class="personal-edit-safe-item">
                            <div class="personal-edit-safe-item-left">
                                <div class="personal-edit-safe-item-left-label">绑定QQ</div>
                                <div class="personal-edit-safe-item-left-value">已绑定QQ：110****566</div>
                            </div>
                            <div class="personal-edit-safe-item-right">
                                <el-button text type="primary">立即设置</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog v-model="dialogState.dialogVisible" title="修改密码">
            <el-form ref="ruleFormRef" :model="dialogState.dialogForm" :rules="dialogState.rules" autocapitalize="off" label-width="80px" status-icon>
                <el-form-item label="原密码" prop="pwd">
                    <el-input v-model="dialogState.dialogForm.pwd" placeholder="请输入原密码" show-password type="password"/>
                </el-form-item>
                <el-form-item label="新密码" prop="new_pwd">
                    <el-input v-model="dialogState.dialogForm.new_pwd" placeholder="请输入新密码" show-password type="password"/>
                </el-form-item>
                <el-form-item label="确认密码" prop="com_pwd">
                    <el-input v-model="dialogState.dialogForm.com_pwd" placeholder="确认密码" show-password type="password"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button size="default" @click="dialogState.dialogVisible = false">取 消</el-button>
                    <el-button size="default" type="primary" @click="dialogSubmit(ruleFormRef)">修 改</el-button>
                </div>
            </template>
        </el-dialog>
        <PictureDialog ref="pictureRef" :maxLength="0" :minType="dialogPicture.minType" @refresh="pictureRefresh"/>
    </div>
</template>

<script lang="ts" name="personal" setup>
import {computed, nextTick, onMounted, reactive, ref} from 'vue'
import {formatAxis, formatDate} from '/@/utils/formatTime'
import {newsInfoList, recommendList} from './mock'
import {useUserApi} from "/@/api/user"
import {ElMessage} from "element-plus"
import {Session} from "/@/utils/storage"
import PictureDialog from "/@/components/picture/index.vue"
import {useUserInfo} from "/@/stores/userInfo"

const pictureRef = ref()
const dialogPicture = reactive({
    minType: 'image'
})
const pictureRefresh = (e: { url: string; }[]) => {
    useUserApi().updateUserAvatar({
        url: e[0].url
    }).then(res => {
        if (res) {
            state.personalForm.avatar_url = e[0].url
            ElMessage.success(res.msg)
        }
    })

}
const clickPicture = () => {
    nextTick(() => {
        pictureRef.value.openDialog()
    })
}
const ruleFormRef = ref()
// 定义变量内容
const state = reactive({
    newsInfoList,
    recommendList,
    personalForm: {
        userName: '',
        email: '',
        autograph: '',
        phone: '',
        sex: '',
        id: 0,
        last_login_ip: '',
        last_login_time: '',
        avatar_url: ''
    },
})
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (value !== dialogState.dialogForm.new_pwd) {
        callback(new Error("两次密码不一致"))
    } else {
        callback()
    }
}
const dialogState = reactive({
    dialogVisible: false,
    dialogForm: {
        pwd: '',
        new_pwd: '',
        com_pwd: ''
    },
    rules: {
        pwd: [{
            required: true,
            message: '请输入原密码',
            trigger: 'blur',
        }],
        new_pwd: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur',
        }],
        com_pwd: [{
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
        }, {validator: validatePass2, trigger: 'blur'}]
    }
})

const dialogSubmit = (formEl: { validate: (arg0: (valid: any) => false | undefined) => void; }) => {
    if (!formEl) {
        return
    }
    formEl.validate((valid) => {
        if (valid) {
            useUserApi().updatePwdInfo({
                ...dialogState.dialogForm
            }).then(res => {
                if (res) {
                    Session.set('token', res.data.token)
                    ElMessage.success(res.msg)
                }
            })
        } else {
            ElMessage.warning("请先处理错误！")
            return false
        }
    })
}
const updatePwd = () => {
    dialogState.dialogVisible = true
}
const rules = reactive({})
// 当前时间提示语
const currentTime = computed(() => {
    return formatAxis(new Date())
})
const stores = useUserInfo()
const getUserInfo = () => {
    const userInfos = stores.userInfos
    state.personalForm.userName = userInfos.userName
    state.personalForm.email = userInfos.email
    state.personalForm.autograph = userInfos.autograph
    state.personalForm.phone = userInfos.phone
    state.personalForm.last_login_ip = userInfos.last_login_ip
    state.personalForm.last_login_time = userInfos.last_login_time
    state.personalForm.avatar_url = userInfos.avatar_url
    if (userInfos.sex == 0) {
        state.personalForm.sex = ''
    } else {
        state.personalForm.sex = userInfos.sex
    }
    state.personalForm.id = Number(userInfos.id)
}

const updatePersonal = () => {
    useUserApi().updateUserInfo({
        ...state.personalForm
    }).then(res => {
        if (res.code) {
            ElMessage.success(res.msg)
        }
    })
}

onMounted(() => {
    getUserInfo()
})
</script>

<style lang="scss" scoped>
@import '../../theme/mixins/index.scss';

.personal {
  .personal-user {
    height: 130px;
    display: flex;
    align-items: center;

    .personal-user-left {
      width: 100px;
      height: 130px;
      border-radius: 3px;

      :deep(.el-upload) {
        height: 100%;
      }

      .personal-user-left-upload {
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }

        &:hover {
          img {
            animation: logoAnimation 0.3s ease-in-out;
          }
        }
      }
    }

    .personal-user-right {
      flex: 1;
      padding: 0 15px;

      .personal-title {
        font-size: 18px;
        @include text-ellipsis(1);
      }

      .personal-item {
        display: flex;
        align-items: center;
        font-size: 13px;

        .personal-item-label {
          color: var(--el-text-color-secondary);
          @include text-ellipsis(1);
        }

        .personal-item-value {
          @include text-ellipsis(1);
        }
      }
    }
  }

  .personal-info {
    .personal-info-more {
      float: right;
      color: var(--el-text-color-secondary);
      font-size: 13px;

      &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }

    .personal-info-box {
      height: 130px;
      overflow: hidden;

      .personal-info-ul {
        list-style: none;

        .personal-info-li {
          font-size: 13px;
          padding-bottom: 10px;

          .personal-info-li-title {
            display: inline-block;
            @include text-ellipsis(1);
            color: var(--el-text-color-secondary);
            text-decoration: none;
          }

          & a:hover {
            color: var(--el-color-primary);
            cursor: pointer;
          }
        }
      }
    }
  }

  .personal-recommend-row {
    .personal-recommend-col {
      .personal-recommend {
        position: relative;
        height: 100px;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;

        &:hover {
          i {
            right: 0 !important;
            bottom: 0 !important;
            transition: all ease 0.3s;
          }
        }

        i {
          position: absolute;
          right: -10px;
          bottom: -10px;
          font-size: 70px;
          transform: rotate(-30deg);
          transition: all ease 0.3s;
        }

        .personal-recommend-auto {
          padding: 15px;
          position: absolute;
          left: 0;
          top: 5%;
          color: var(--next-color-white);

          .personal-recommend-msg {
            font-size: 12px;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .personal-edit {
    .personal-edit-title {
      position: relative;
      padding-left: 10px;
      color: var(--el-text-color-regular);

      &::after {
        content: '';
        width: 2px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: var(--el-color-primary);
      }
    }

    .personal-edit-safe-box {
      border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
      padding: 15px 0;

      .personal-edit-safe-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .personal-edit-safe-item-left {
          flex: 1;
          overflow: hidden;

          .personal-edit-safe-item-left-label {
            color: var(--el-text-color-regular);
            margin-bottom: 5px;
          }

          .personal-edit-safe-item-left-value {
            color: var(--el-text-color-secondary);
            @include text-ellipsis(1);
            margin-right: 15px;
          }
        }
      }

      &:last-of-type {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
}
</style>
