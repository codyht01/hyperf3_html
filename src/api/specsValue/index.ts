import request from '/@/utils/request'

export function useSpecsValueApi() {
    return {
        getSpecsByListInfo: (params?: object) => {
            return request({
                url: '/api/specsValue/getSpecsValueByListInfo',
                method: 'post',
                data: params,
            })
        },
        getSpecsValueByInfo: (params?: object) => {
            return request({
                url: '/api/specsValue/getSpecsValueByInfo',
                method: 'post',
                data: params,
            })
        },
    }
}
