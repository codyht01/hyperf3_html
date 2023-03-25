import request from '/@/utils/request'

export function useSpecsApi() {
    return {
        getSpecsByListInfo: (params?: object) => {
            return request({
                url: '/api/specs/getSpecsByListInfo',
                method: 'get',
                data: params,
            })
        }
    }
}
