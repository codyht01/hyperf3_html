import request from '/@/utils/request'

export function useSocket() {
    return {
        getSocketUserList: (params?: object) => {
            return request({
                url: '/api/user/getSocketUserList',
                method: 'get',
                params,
            })
        }
    }
}
