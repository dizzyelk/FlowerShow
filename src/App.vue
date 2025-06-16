<template>
    <Navigation />
    <router-view />
</template>

<script setup lang="ts">
import Navigation from "@/views/Navigation.vue";
import Home from "@/views/Home.vue";
import Flowers from "@/views/Flowers.vue";
import Show from "@/views/Show.vue";

</script>

<style lang="scss">
body {
    user-select: none;
    margin: 0;
}
</style>
