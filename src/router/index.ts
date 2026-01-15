import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import UsersListView from '../views/UsersListView.vue'
import { nextTick } from 'vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        { 
            path: '/dashboard', 
            name: 'dashboard', 
            component: DashboardView,
            meta: {requiresAuth: true}     // requiere estar logueado.
        },
        {
            path: '/users-list',
            name: 'users-list',
            component: UsersListView,
            meta: {requiresAuth: true}
        },
        { path: '/', redirect: '/login'}
    ]
})


// GUARDIA DE SEGURIDAD (Navigation Guard)
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const userSession = JSON.parse(localStorage.getItem('userSession') || 'null');

    // 1. Si la ruta requiere estar logueado y no hay token, al login
    if(to.meta.requiresAuth && !token) {
        next('/login');
    }
    // 2. Si ya esta logueado y trata de ir al login, lo mandamos su sitio.
    else if (to.path === '/login' && token) {
        if (userSession.role === 1) next( '/users-list');
        else next('/dashboard');
    }
    else {
        next();
    }
});

export default router