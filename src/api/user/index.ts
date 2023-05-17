import request from '/@/utils/request'

export function useUserApi() {
    return {
        getUserInfo: (params?: object) => {
            return request({
                url: '/api/user/getUserInfo',
                method: 'get',
                params,
            })
        },
        getUserListInfo: (params?: object) => {
            return request({
                url: '/api/user/getUserListInfo',
                method: 'post',
                data: params,
            })
        },
        updateUserInfo: (params?: object) => {
            return request({
                url: '/api/user/updateUserInfo',
                method: 'post',
                data: params,
            })
        },
        updatePwdInfo: (params?: object) => {
            return request({
                url: '/api/user/updatePwdInfo',
                method: 'post',
                data: params,
            })
        },
        updateUserAvatar: (params?: object) => {
            return request({
                url: '/api/user/updateUserAvatar',
                method: 'post',
                data: params,
            })
        },
    }
}
