<template>
    <div class="showBox">
        <img :src="data['img']" :alt="data['name_cn']">
        <div class="line"></div>
        <div class="context">
            <p class="cn">{{ data['name_cn'] }}</p>
            <p class="en">{{ data['name_en'] }}</p>
            <p v-if="data['name_alias'] !== ''"><span>别名: </span>{{ data['name_alias'] }}</p>
            <p><span>分类: </span>{{ data['type'] }}</p>
            <p><span>科属: </span>{{ data['genus'] }}</p>
            <p v-if="data['period'] !== ''"><span>花期: </span>{{ data['period'] }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        data: Object
    }
}
</script>

<style scoped lang="scss">
.showBox {
    display: flex;
    padding: 10px;
    border: #4CAF50 solid 1px;
    border-radius: 10px;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease;

    img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        box-shadow: 0 0 10px #757575;
    }

    .line {
        background-color: #C8E6C9;
        height: 100%;
        width: 2px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .context {
        width: 60%;

        p {
            margin: 0;
            color: #757575;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        span {
            color: #212121;
        }

        .cn {
            font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            font-weight: bold;
            color: black;
        }

        .en {
            font-size: 12px;
        }
    }
}

.showBox:hover {
    background-color: #4CAF50;
    transform: scale(1.05);

    p {
        color: #FFFFFF;
    }
}
</style>