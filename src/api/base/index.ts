import request from '/@/utils/request'

export function useBaseApi() {
    return {
        index: (path: string, data: object) => {
            return request({
                url: '/api/' + path + '/index',
                method: 'post',
                data,
            })
        },
        add: (path: string, data: object) => {
            return request({
                url: '/api/' + path + '/add',
                method: 'post',
                data
            })
        },
        download: (path: string, data: object, header: object) => {
            return request({
                url: '/api/' + path + '/index',
                method: 'get',
                params: data,
                headers: header
            })
        }

    }
}
