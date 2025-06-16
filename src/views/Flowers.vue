<template>
    <div id="flowers">
        <div class="head">
            <el-input
                    v-model="input"
                    class="search"
                    placeholder="输入关键字搜索"
                    clearable
                    @keyup.enter="search(input)">
                <template #append>
                    <el-button @click="search(input)">搜索(Enter)</el-button>
                </template>
            </el-input>
            <div class="select">
                <el-checkbox-group v-model="selectList" ref="selectBox">
                    <el-checkbox v-for="value in showType" :label="value" :value="value"/>
                </el-checkbox-group>
                <div class="list" @mouseenter="showAllType=true">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path d="M187.392 70.656q28.672 0 48.64 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t47.616-19.456l54.272 0zM889.856 70.656q27.648 0 47.616 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t48.64-19.456l437.248 0zM187.392 389.12q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t47.616-19.968l54.272 0zM889.856 389.12q27.648 0 47.616 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t48.64-19.968l437.248 0zM187.392 708.608q28.672 0 48.64 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t47.616-19.968l54.272 0zM889.856 708.608q27.648 0 47.616 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t48.64-19.968l437.248 0z"></path>
                    </svg>
                </div>
            </div>
            <div class="allType" v-show="showAllType" @mouseleave="showAllType=false">
                <el-checkbox-group v-model="selectList">
                    <div class="flex-container">
                        <div class="flex-item" v-for="value in allType">
                            <el-checkbox :label="value" :value="value"/>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
        </div>
        <div class="body" ref="showBox">
            <Card v-if="showResult" v-for="(value,key) in showResult" :data="value" @click="openURL('Show',key)"></Card>
        </div>
        <el-pagination class="custom-pagination"
                       layout="prev, pager, next"
                       @current-change="pageChange"
                       :page-size="pageSize"
                       :total="total"/>
    </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue";
import flowerData from '@/assets/data.json'
import Card from "@/components/flowers/Card.vue";
import {useRoute} from "vue-router";
import router from "@/router.ts";

const route = useRoute();

const input = ref()
const result = ref()
const allType = ref()
const showAllType = ref(false)
const showType = ref()

const selectList = ref()
const selectBox = ref()
const showBox = ref()

const total = ref();
const pageSize = ref()
const showResult = ref()

const flowersBox = ref();

const openURL = (name, id) => {
    const url = router.resolve({
        name: name,
        query: {
            id: id
        }
    });
    window.open(url.href, '_blank')
}

const pageChange = (page) => {
    const start = (page - 1) * pageSize.value
    const end = start + pageSize.value
    showResult.value = Object.fromEntries(Object.entries(result.value).slice(start, end))
};

watch(selectList, (newVal, oldVal) => {
    if (newVal.length === 0) result.value = flowerData;
    else result.value = Object.fromEntries(
        Object.entries(flowerData).filter(([_, value]) =>
            newVal.some(key => value['type'] === key)
        )
    )
    total.value = Object.keys(result.value).length
    pageChange(1)
})

onMounted(() => {
    window.addEventListener('resize', debounce(viewResize, 200))
    nextTick(() => {
        flowersBox.value = document.getElementById('flowers')
        allType.value = new Set(Object.values(flowerData).map(item => item.type));
        const text = String(route.query.search);
        if (text !== 'undefined') {
            input.value = text
            search(text)
        } else search()
        viewResize()
    })
})

const search = (text: string | null = null) => {
    if (text === "" || text === null) result.value = flowerData;
    else result.value = Object.fromEntries(
        Object.entries(flowerData).filter(([_, value]) =>
            value['name_cn'].includes(text)
        )
    );
    total.value = Object.keys(result.value).length
    pageChange(1)
}

function debounce(func, delay) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
}

function viewResize() {
    const selectBoxWidth = selectBox.value.$el.offsetWidth;
    const number = Math.floor(selectBoxWidth / 100);
    showType.value = Array.from(allType.value).slice(0, number)

    const showBoxHeight = showBox.value.offsetHeight;
    const showBoxWidth = showBox.value.offsetWidth;
    const heightNum = Math.floor(showBoxHeight / 150);
    const widthNum = Math.floor(showBoxWidth / 300);
    pageSize.value = heightNum * widthNum
    flowersBox.value.style.setProperty('--columns', String(widthNum));
    flowersBox.value.style.setProperty('--rows', String(heightNum));
    pageChange(1)
}
</script>

<script lang="ts">
export default {
    name: "Flowers"
}
</script>

<style scoped lang="scss">
#flowers {
    height: 87vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}

.head {
    height: 5%;
    width: 100%;
    display: flex;
    gap: 20px;
    padding-bottom: 10px;
    border-bottom: #757575 solid 1px;
    position: relative;

    .search {
        width: 50%;
    }

    .select {
        width: 50%;
        display: flex;

        .el-checkbox-group {
            display: flex;
            width: 90%;
        }

        .list {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 10%;
            padding-left: 10px;

            svg {
                width: 30px;
                height: 30px;
            }
        }
    }

    .allType {
        position: absolute;
        right: 0;
        width: 50%;
        z-index: 2;
        background-color: #FFFFFF;
        border: #BDBDBD solid 1px;

        .el-checkbox-group {
            padding: 10px;

            .flex-container {
                display: flex;
                flex-wrap: wrap;

                .flex-item {
                    width: 20%;
                }
            }
        }
    }
}

.body {
    height: 90%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(var(--columns, 4), minmax(300px, 1fr));
    grid-template-rows: repeat(var(--rows, 3), minmax(150px, 1fr));
    gap: 10px;
    margin: 10px;
}

:deep(.custom-pagination) {
    gap: 10px;

    .btn-next,
    .btn-prev,
    .el-pager li {
        background-color: #C8E6C9;
        color: black;
        margin: 0 5px;
    }

    .el-pager li.is-active {
        background-color: #4CAF50;
        color: white;
        scale: 1.1;
    }
}
</style>