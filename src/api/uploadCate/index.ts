import request from '/@/utils/request'

export function useUploadCateApi() {
    return {
        add: (params?: object) => {
            return request({
                url: '/api/uploadCate/add',
                method: 'post',
                data: params,
            })
        }
    }
}
