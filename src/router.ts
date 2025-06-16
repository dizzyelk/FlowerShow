import {createRouter, createWebHashHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Flowers from "@/views/Flowers.vue";
import Show from "@/views/Show.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/flowers',
        name: 'Flowers',
        component: Flowers
    },
    {
        path: '/show',
        name: 'Show',
        component: Show
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;