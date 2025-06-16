<template>
    <div id="Show">
        <div class="head">
            <img :src="value['img']" :alt="value['name_cn']">
            <div class="context">
                <p class="cn">{{ value['name_cn'] }}<span class="en">{{ value['name_en'] }}</span></p>
                <p v-if="value['name_alias'] !== ''"><span>别名: </span>{{ value['name_alias'] }}</p>
                <p><span>分类: </span>{{ value['type'] }}</p>
                <p><span>科属: </span>{{ value['genus'] }}</p>
                <p v-if="value['period'] !== ''"><span>花期: </span>{{ value['period'] }}</p>
            </div>
        </div>
        <div class="body">
            <div v-for="value in value['info']" class="box">
                <p class="title">{{ value.type }}</p>
                <div v-html="value.value"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import flowerData from '@/assets/data.json'
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const value = ref(flowerData[String(route.query.id)])
</script>

<script lang="ts">
export default {
    name: "Show"
}
</script>

<style scoped lang="scss">
#Show {
    width: 70%;
    margin: calc(10vh + 20px) auto 20px;
    border-radius: 20px;
    background-color: #C8E6C9;
}

.head {
    padding: 50px 50px 0 50px;
    display: flex;
    align-items: center;
    gap: 40px;

    img {
        box-shadow: 0 0 10px #757575;
        width: 18%;
        aspect-ratio: 1/1;
        border-radius: 20px;
        object-fit: cover;
    }

    .context {
        width: 60%;

        p {
            margin: 0;
            font-size: 20px;
            color: #757575;
        }

        span {
            color: #212121;
        }

        .cn {
            margin-bottom: 10px;
            font-size: 30px;
            font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            font-weight: bold;
            color: black;
        }

        .en {
            color: #757575;
            font-size: 15px;
            font-style: italic;
            margin-left: 10px;
        }
    }
}

.body {
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .title {
        color: #388E3C;
        font-size: 25px;
        margin: 0;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-weight: bold;
    }

    .box {
        border: #4CAF50 solid 2px;
        border-radius: 10px;
        padding: 10px;

        > div {
            margin: 10px;
        }
    }
}
</style>