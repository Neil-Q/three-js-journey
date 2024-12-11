import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/P1_cube',
        name: 'P1Cube',
        component: () => import ("@/views/P1_cube.vue")
    },
    {
        path: '/P2_materials',
        name: 'P2Materials',
        component: () => import ("@/views/P2_materials.vue")
    },
]   

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
