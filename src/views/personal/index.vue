<template>
    <div class="personal layout-pd">
        <el-row>
            <!-- 个人信息 -->
            <el-col :sm="16" :xs="24">
                <el-card header="个人信息" shadow="hover">
                    <div class="personal-user">
                        <div class="personal-user-left">
                            <el-upload :limit="1" action="https://jsonplaceholder.typicode.com/posts/" class="h100 personal-user-left-upload" multiple>
                                <img src="https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500"/>
                            </el-upload>
                        </div>
                        <div class="personal-user-right">
                            <el-row>
                                <el-col :span="24" class="personal-title mb18">{{ currentTime }}，admin，生活变的再糟糕，也不妨碍我变得更好！</el-col>
                                <el-col :span="24">
                                    <el-row>
                                        <el-col :sm="8" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">昵称：</div>
                                            <div class="personal-item-value">小柒</div>
                                        </el-col>
                                        <el-col :sm="16" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">身份：</div>
                                            <div class="personal-item-value">超级管理</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="24">
                                    <el-row>
                                        <el-col :sm="8" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">登录IP：</div>
                                            <div class="personal-item-value">192.168.1.1</div>
                                        </el-col>
                                        <el-col :sm="16" :xs="24" class="personal-item mb6">
                                            <div class="personal-item-label">登录时间：</div>
                                            <div class="personal-item-value">2021-02-05 18:47:26</div>
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
                                    <el-input v-model="state.personalForm.userName" clearable placeholder="请输入昵称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="邮箱">
                                    <el-input v-model="state.personalForm.email" clearable placeholder="请输入邮箱"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="签名">
                                    <el-input v-model="state.personalForm.autograph" clearable placeholder="请输入签名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24" class="mb20">
                                <el-form-item label="手机">
                                    <el-input v-model="state.personalForm.phone" clearable placeholder="请输入手机"></el-input>
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
                                <el-button text type="primary">立即修改</el-button>
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
    </div>
</template>

<script lang="ts" name="personal" setup>
import {computed, onMounted, reactive} from 'vue'
import {formatAxis} from '/@/utils/formatTime'
import {newsInfoList, recommendList} from './mock'
import {useUserApi} from "/@/api/user"
import {ElMessage} from "element-plus"

// 定义变量内容
const state = reactive<PersonalState>({
    newsInfoList,
    recommendList,
    personalForm: {
        userName: '',
        email: '',
        autograph: '',
        phone: '',
        sex: '',
        id: 0
    },
})

const rules = reactive({})
// 当前时间提示语
const currentTime = computed(() => {
    return formatAxis(new Date())
})
const getUserInfo = () => {
    useUserApi().getUserListInfo({}).then(res => {
        if (res.code) {
            state.personalForm.userName = res.data.userName
            state.personalForm.email = res.data.email
            state.personalForm.autograph = res.data.autograph
            state.personalForm.phone = res.data.phone
            if (res.data.sex == 0) {
                state.personalForm.sex = ''
            } else {
                state.personalForm.sex = res.data.sex
            }
            state.personalForm.id = res.data.id
        }
    })
}
const updatePersonal = () => {
    useUserApi().updateUserInfo({
        ...state.personalForm
    }).then(res => {
        if (res.code) {
            ElMessage.success(res.msg)
            getUserInfo()
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
