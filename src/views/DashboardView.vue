<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { currentUser, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<template>
  <div class="dashboard-container">
    <div class="card" v-if="currentUser">
      <h1>Bienvenido, {{ currentUser.name }}</h1>
      <p>Has iniciado sesión con el correo: <strong>{{ currentUser.email }}</strong></p>
      <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
    </div>
    
    <div v-else class="card error-card">
      <h2>Acceso Denegado</h2>
      <p>No tienes permiso para estar aquí. Por favor inicia sesión.</p>
      <router-link to="/login" class="login-link">Ir al Login</router-link>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-family: sans-serif;
}
.card {
  padding: 2.5rem;
  border: 2px solid blueviolet;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background: white;
}
.error-card {
  border-color: #ff4757;
}
.logout-btn {
  margin-top: 20px;
  padding: 12px 25px;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}
.logout-btn:hover {
  background-color: #ff2e44;
}
.login-link {
  display: inline-block;
  margin-top: 15px;
  color: blueviolet;
  text-decoration: none;
  font-weight: bold;
}
</style>