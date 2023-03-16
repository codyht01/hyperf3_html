import {computed, onMounted, onUnmounted, reactive, ref} from 'vue'
import {useBaseApi} from '../api/base'

function usePagination(option: { page: any; size: any; path: string }, formData: any | undefined) {
    const resData = ref({})
    const data = ref([])
    const pageIndex = ref(option.page || 1)
    const pageSize = ref(option.size || 10)
    const totalCount = ref(0)
    const isLoading = ref(false)
    const searchLoading = ref(false)
    const downloadLoading = ref(false)
    const scroll = reactive({
        x: 800,
        y: 300,
    })

    const sorterData = reactive({
        order_field: '',
        order_type: '',
    })
    const dateArrayList = reactive({})
    /**
     * 排序
     * @param prop
     * @param order
     */
    const sortList = (prop: string, order: string) => {
        pageIndex.value = 1
        sorterData.order_field = prop
        sorterData.order_type = order === 'descending' ? 'desc' : 'asc'
        fetchData()
    }
    /**
     * 获取数据
     */
    const fetchData = () => {
        if (option.path) {
            searchLoading.value = true
            isLoading.value = true
            useBaseApi().index(option.path, {
                ...formData,
                ...sorterData,
                ...dateArrayList,
                limit: pageSize.value,
                page: pageIndex.value,
            }).then((res) => {
                totalCount.value = res.data.total
                data.value = res.data.data
                resData.value = res.data
            }).finally(() => {
                searchLoading.value = false
                isLoading.value = false
            })
        }
    }
    /**
     * 搜索
     */
    const search = () => {
        pageIndex.value = 1
        fetchData()
    }
    /**
     * 导出
     * @param filename
     */
    const exportData = (filename = '') => {
        if (option.path) {
            downloadLoading.value = true
            useBaseApi().download(option.path, {
                ...formData,
                ...sorterData,
                ...dateArrayList,
                is_down: 1,
                limit: pageSize.value,
                page: pageIndex.value,
            }, {
                responseType: 'blob',
            }).then((res) => {
                if (res.code == 1) {
                    let name = res.data.headers['content-disposition'].split('filename=')[1]
                    let blob = new Blob([res.data], {type: 'text/html'})
                    let url = URL.createObjectURL(blob)
                    let a = document.createElement('a')
                    // @ts-ignore
                    a.download = filename || decodeURI(name, 'utf-8')
                    a.href = url
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                }
            }).finally(() => {
                downloadLoading.value = false
            })
        }
    }
    /**
     * 时间
     * @param val
     * @param field
     */
    const dateArrayChange = (val: any[], field: string | number) => {
        if (val) {
            dateArrayList[field] = JSON.stringify([`${val[0]} 00:00:00`, `${val[1]} 23:59:59`])
        } else {
            dateArrayList[field] = ''
        }
        search()
    }
    /**
     * 分页改变
     * @param val
     */
    const handleCurrentChange = (val: any) => {
        pageIndex.value = val
        fetchData()
    }
    /**
     * 每页数量改变
     * @param val
     */
    const handleSizeChange = (val: any) => {
        pageIndex.value = 1
        pageSize.value = val
        fetchData()
    }

    const pagination = computed(() => ({
        total: totalCount.value,
        current: pageIndex.value,
        pageSize: pageSize.value,
        showSizeChanger: true,
        pageList: [10, 20, 30, 50, 100, 200],
    }))
    const pageData = reactive({
        data,
        resData,
        pagination,
        isLoading,
        fetchData,
        search,
        exportData,
        dateArrayChange,
        handleCurrentChange,
        handleSizeChange,
        scroll,
        size: 'small',
        downloadLoading,
        searchLoading,
        sortList,
    })
    //   const setTableHeight = debounce(function() {
    //     let container = document.querySelector('.ant-layout-content')
    //     let padding = 40
    //     let filterHeight = container.querySelector('.table-header') ? container.querySelector('.table-header').clientHeight : 0
    //     let tableHeight = container.clientHeight - padding - filterHeight - 115
    //     scroll.y = tableHeight
    //   }, 300)
    onUnmounted(() => {
        // window.removeEventListener('resize', setTableHeight)
    })
    onMounted(() => {
        // setTableHeight()
        // window.addEventListener('resize', setTableHeight)
    })
    return pageData
}

export default usePagination
