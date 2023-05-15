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
                params,
            })
        },
        updateUserInfo: (params?: object) => {
            return request({
                url: '/api/user/updateUserInfo',
                method: 'post',
                params,
            })
        },
    }
}
