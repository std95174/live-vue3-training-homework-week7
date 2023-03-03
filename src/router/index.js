import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {getToken} from "@/common/token";
import axios from "axios";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('../views/DashboardView.vue')
                },
                {
                    path: '/products',
                    name: 'products',
                    component: () => import('../views/ProductsView.vue')
                },
                {
                    path: '/orders',
                    name: 'orders',
                    component: () => import('../views/OrdersView.vue')
                },
            ]
        },

    ]
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // get hexToken from cookie
        const hexToken = getToken()
        if (hexToken) {
            try {
                axios.defaults.headers.common['Authorization'] = hexToken
                const { data } = await axios.post(`https://vue3-course-api.hexschool.io/v2/api/user/check`)
                if (data.success) {
                    next()
                } else {
                    next({ name: 'login' })
                }
            } catch (e) {
                console.log(e)
                next({ name: 'login' })
            }
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})

export default router
