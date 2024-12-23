import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/P1_basicMeshScene',
        name: 'P1_basicMeshScene',
        component: () => import ("@/views/P1_basicMeshScene.vue")
    },
    // {
    //     path: '/P2_materials',
    //     name: 'P2Materials',
    //     component: () => import ("@/views/P2_materials.vue")
    // },
]   

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
