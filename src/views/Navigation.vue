<template>
    <div id="navigation" :style="{position: fixed? 'relative': 'fixed'}">
        <p>FlowerShow</p>
        <div></div>
        <button v-for="value in options" @click="router.push({name: value.view})">{{ value.name }}</button>
    </div>
</template>

<script setup lang="ts">
import router from "@/router.ts";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const options = [{name: "首页", view: "Home"}, {name: "花卉", view: "Flowers"}]

const fixed = ref(true)

const route = useRoute();

watch(() => route.name, (name) => {
    switch (name) {
        case "Show":
            fixed.value = false
            return
        default:
            fixed.value = true
    }
});
</script>

<script lang="ts">
export default {
    name: "Navigation"
}
</script>

<style scoped lang="scss">
#navigation {
    height: 10vh;
    top: 0;
    width: 100%;
    display: flex;
    background-color: #388E3C;
    align-items: center;

    div {
        background-color: #BDBDBD;
        height: 80%;
        width: 2px;
    }

    p {
        color: #FFFFFF;
        font-size: 25px;
        margin: 20px;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-weight: bold;
        cursor: pointer;
    }

    button {
        color: #FFFFFF;
        background-color: #4CAF50;
        border: none;
        padding: 5px 10px;
        margin-left: 30px;
        border-radius: 10px;
        font-size: 20px;
        width: 80px;
        text-align-last: justify;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    button:hover {
        background-color: #FFFFFF;
        color: #4CAF50;
        font-weight: bold;
        transform: scale(1.1);
    }
}
</style>