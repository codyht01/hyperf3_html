<template>
    <div>2222222222</div>
    <button @click="writeToFile">ssss</button>
</template>

<script lang="ts" setup>

import {useTestApi} from "/@/api/test"


const arr = [
    "1fb3ed80",
    "1fde1790",
    "1fe136a8",
    "1fe6c1d8",
    "1fe81e08",
    "1fe2fa28",
    "242e1858",
    "24231e70",
    "2435f8c8",
    "1fccb408",
    "1fccb5f0",
    "1fccc160",
    "24569570",
    "24569d10",
    "24569758",
    "2456ac50",
    "24569940",
    "24569ef8",
    "2456a0e0",
    "2456a2c8",
    "24569b28",
    "2456a698",
    "2456a4b0",
    "2456ae38",
    "2456b020",
    "2456a880",
    "2456aa68",
    "24569388",
    "24963f78",
    "24964160",
    "24964900",
    "24964ae8",
    "24963408",
    "249637d8",
    "249639c0",
    "24bba698",
    "24bb9570",
    "24bb9570",
    "24ffd8b0",
    "24ffd8b0",
    "24ffde68",
    "24ffe238",
    "24ffcb58",
    "297d8980",
    "297d7488",
    "297d7488",
    "2c956860",
]
const new_arr = arr.filter(function (item, index) {
    return arr.indexOf(item) === index  // 因为indexOf 只能查找到第一个
})
new_arr.forEach(async item => {
    const json = {
        "action": "query_db",
        "data": {
            "handle": item,
            "sql": "select name from sqlite_master where type='table'"
        }
    }
    await useTestApi().setTestApi(json).then(res => {
        if (res) {
            res.forEach(async (value: { name: string; }, index: string) => {

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
                        await writeToFile(JSON.stringify(rr), value.name + index)
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
