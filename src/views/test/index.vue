<template>
    <div>2222222222</div>
    <button @click="writeToFile">ssss</button>
</template>

<script lang="ts" setup>

import {useTestApi} from "/@/api/test"


const arr = [
    "203ebb50",
    "2045ede8",
    "20ec3b78",
    "20458848",
    "1f7a4960",
    "1f7a5e58",
    "210dfd20",
    "210df580",
    "210e04c0",
    "210e06a8",
    "210dea10",
    "214d7d30",
    "214d7f18",
    "214d8c70",
    "214d8100",
    "214d7778",
    "214d82e8",
    "214d7590",
    "214d86b8",
    "214d8e58",
    "214d88a0",
    "214d84d0",
    "214d8a88",
    "214d7b48",
    "214d9040",
    "214d73a8",
    "214d7960",
    "218d6190",
    "218d72b8",
    "218d6560",
    "218d6ee8",
    "218d70d0",
    "218d7688",
    "218d6748",
    "218d6d00",
    "1f77d618",
    "1f77c8c0",
    "1f77caa8",
    "1f77d430",
    "1f7a5e58",
    "1f7a4960",
    "25dc8b60",
    "25dc7a38",
    "25dc7c20",
    "25dc8790",
    "265b5750",
]
const new_arr = arr.filter(function (item, index) {
    return arr.indexOf(item) === index  // 因为indexOf 只能查找到第一个
})
new_arr.forEach(item => {
    const json = {
        "action": "query_db",
        "data": {
            "handle": item,
            "sql": "select name from sqlite_master where type='table'"
        }
    }
    useTestApi().setTestApi(json).then(res => {
        if (res) {
            res.forEach(async (value: { name: string; }, index: string) => {
                //
                const json1 = {
                    "action": "query_db",
                    "data": {
                        "handle": item,
                        "sql": "select * from " + value.name + " limit 30"
                    }
                }
                await useTestApi().setTestApi(json1).then(async rr => {
                    if (rr === 'sys error') {
                        console.log("-------------" + item + "     " + value.name + "        --------------")
                        await writeToFile(JSON.stringify(rr), value.name + index)
                    } else {
                        console.log("-------------" + item + "     " + value.name, rr)
                        await writeToFile(JSON.stringify(json1), value.name + index)
                    }
                })

            })
        }
    })
})
const writeToFile = (data: BlobPart, fileName: string) => {
    //const data = "Hello, world!" // 要写入文件的内容
    const blob = new Blob([data], {type: 'text/plain'})
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName + '.txt')
    document.body.appendChild(link)
    link.click()
    return
}
</script>

<style scoped>

</style>
