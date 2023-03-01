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
        getTestMenu: (params?: object) => {
            return request({
                url: '/gitee/lyt-top/vue-next-admin-images/raw/master/menu/testMenu.json',
                method: 'get',
                params,
            })
        },
    }
}
