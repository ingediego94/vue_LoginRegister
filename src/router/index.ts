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
            meta: { requiresAuth: true }
        },
        {
            path: '/admin-home',
            name: 'admin-home',
            component: () => import('../views/AdminHomeView.vue'),
            meta: { requiresAuth: true }
        },
        { path: '/', redirect: '/login' }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    
    // Manejo seguro del parseo para evitar pantalla en blanco
    let userSession = null;
    try {
        const sessionData = localStorage.getItem('userSession');
        userSession = sessionData ? JSON.parse(sessionData) : null;
    } catch (e) {
        console.error("Error al leer la sesión, limpiando datos...");
        localStorage.clear();
    }

    // 1. Si la ruta requiere auth y no hay token -> Login
    if (to.meta.requiresAuth && !token) {
        return next('/login');
    }

    // 2. Si ya está logueado e intenta ir al Login o Register -> Redirigir según rol
    if (token && (to.path === '/login' || to.path === '/register')) {
        if (userSession?.role === 1) {
            return next('/admin-home');
        }
        return next('/dashboard');
    }

    // 3. En cualquier otro caso, permitir el paso
    next();
});

export default router;