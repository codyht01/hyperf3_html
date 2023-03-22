import request from '/@/utils/request'

export function useUploadApi() {
    return {
        getUploadFile: (params?: object) => {
            return request({
                url: '/api/upload/getUploadFile',
                method: 'post',
                data: params
            })
        },
        uploadFile: (formdata?: object) => {
            return request({
                url: '/api/upload/file',
                method: 'post',
                data: formdata,
                headers: {"Content-Type": "multipart/form-data"}
            })
        },
        getCheckChunkFile: (params?: object) => {
            return request({
                url: '/api/upload/getCheckChunkFile',
                method: 'post',
                data: {
                    ...params
                },
            })
        },
        mergeData: (params?: object) => {
            return request({
                url: '/api/upload/mergeData',
                method: 'post',
                data: params
            })
        },
    }
}
