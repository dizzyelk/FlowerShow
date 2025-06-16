<template>
    <el-carousel v-if="showData" :interval="3000" indicator-position="outside" type="card" :height="height">
        <el-carousel-item v-for="(value,key) in showData" @click="openURL('Show',key)">
            <img :src="value.img" :alt="value['name_cn']">
            <div class="context">
                <p class="cn">{{ value['name_cn'] }}<span class="en">{{ value['name_en'] }}</span></p>
                <p v-if="value['name_alias'] !== ''"><span>别名: </span>{{ value['name_alias'] }}</p>
                <p><span>分类: </span>{{ value['type'] }}</p>
                <p><span>科属: </span>{{ value['genus'] }}</p>
                <p v-if="value['period'] !== ''"><span>花期: </span>{{ value['period'] }}</p>
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import flowerData from "@/assets/data.json";
import router from "@/router.ts";

const showData = ref()
const height = ref()
const home = ref()

onMounted(() => {
    showData.value = Object.fromEntries(Object.entries(flowerData)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6));
    window.addEventListener('resize', changeHeight)
    nextTick(() => {
        home.value = document.getElementById("home")
        changeHeight()
    })
});

const openURL = (name, id) => {
    const url = router.resolve({
        name: name,
        query: {
            id: id
        }
    });
    window.open(url.href, '_blank')
}

function changeHeight() {
    const homeHeight = home.value.offsetHeight;
    height.value = Math.floor(homeHeight * 0.35) + "px"
}
</script>

<script lang="ts">
export default {
    name: "Carousel",
}
</script>

<style scoped lang="scss">
.el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #C8E6C9;
    gap: 20px;

    .context {
        width: 60%;

        p {
            margin: 0;
            color: #757575;
        }

        span {
            color: #212121;
        }

        .cn {
            font-size: 20px;
            font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            font-weight: bold;
            color: black;
        }

        .en {
            color: #757575;
            font-size: 12px;
            font-style: italic;
            margin-left: 10px;
        }
    }

    img {
        box-shadow: 0 0 10px #757575;
        width: 25%;
        aspect-ratio: 1/1;
        border-radius: 20px;
        object-fit: cover;
    }
}

.el-carousel__item.is-active {
    transform: scale(1.1);
}

.el-carousel__item:not(.is-active) {
    opacity: 0.8;
}

:deep(.el-carousel__indicators--outside button) {
    background-color: #4CAF50;
}

:deep(.el-carousel__indicators--outside button.is-active) {
    background-color: #388E3C;
}

:deep(.el-carousel__arrow) {
    background-color: #4CAF50;
    opacity: 0.6;
    font-size: 20px;
}

:deep(.el-carousel__arrow:hover) {
    background-color: #4CAF50;
    opacity: 1;
}
</style>