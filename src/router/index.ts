import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        { 
            path: '/dashboard', 
            name: 'dashboard', 
            component: () => import('../views/DashboardView.vue'),
            meta: {requiresAuth: true}     // requiere estar logueado.
        },
        {
            path: '/admin-home',
            name: 'admin-home',
            component: () => import('../views/AdminHomeView.vue'),
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
        if (userSession.role === 1) next( '/admin-home');
        else next('/dashboard');
    }
    else {
        next();
    }
});

export default router